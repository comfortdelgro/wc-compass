import {Pointer} from '../../shared/pointer'

function createModalTemplate(imgSrcs, multiple, activeIndex) {
  const template = document.createElement('template')
  template.setAttribute('for', 'defaultModal')
  let zoomContent = ''
  let thumbnailsContent = ''
  if (multiple) {
    zoomContent = `<cdg-carousel use-arrow="true" current="${activeIndex}" id="cdg-zoom-image-carousel">`
    imgSrcs.forEach((imgSrc, index) => {
      zoomContent += `
        <cdg-slide>
          <img src="${imgSrc}" class="cdg-zoom-image-view-img" />
        </cdg-slide>`
      thumbnailsContent += `<img src="${imgSrc}" class="cdg-zoom-image-view-thumbnail ${
        activeIndex === index ? 'thumbnail-active' : ''
      }" />`
    })
    zoomContent += '</cdg-carousel>'
  } else {
    zoomContent = `<img src="${imgSrcs}" class="cdg-zoom-image-view-img" id="cdg-zoom-image-view-img" />`
  }
  template.innerHTML = `
  <cdg-modal size="auto" class="cdg-zoom-image-view-modal">
    <cdg-modal-header useCloseButton="true">
      <button is="cdg-button" class="icon ghost" id="cdg-zoom-image-view-zoom-in">
        <cdg-icon name="zoomPlus" size="14"></cdg-icon>
      </button>
      <button is="cdg-button" class="icon ghost" id="cdg-zoom-image-view-zoom-out">
        <cdg-icon name="zoomMinus" size="14"></cdg-icon>
      </button>
    </cdg-modal-header>
    <cdg-modal-body>
      <div class="cdg-zoom-image-view-body">
        <div class="cdg-zoom-image-view-transform">
        ${zoomContent}
        </div>
        <div class="cdg-zoom-image-view-thumbnails-container">
          ${thumbnailsContent}
        </div>
      </div>
    </cdg-modal-body>
  </cdg-modal>
  `
  return template
}
const MAX_ZOOM = 7
const MIN_ZOOM = 1
const DEFAULT_POINT = {x: 0, y: 0}

export class CdgZoomImageView extends HTMLElement {
  zoomImageViewItemEls
  transformViewEl
  carouselEl
  imgContentEls
  imgContentEl
  imgThumbnailEls

  currentPosition = DEFAULT_POINT
  pointer = new Pointer()
  zoomValue = 1
  ratioPointer = DEFAULT_POINT

  get multiple() {
    return this.hasAttribute('multiple')
  }

  set multiple(value) {
    if (value) {
      this.setAttribute('multiple', '')
    } else {
      this.removeAttribute('multiple', '')
    }
  }

  static get observedAttributes() {
    return []
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-zoom-image-view')
    this.bindEventForImage()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
  }

  bindEventForImage() {
    this.zoomImageViewItemEls = this.querySelectorAll('[zoomImageViewItem]')
    if (this.zoomImageViewItemEls && this.zoomImageViewItemEls.length) {
      this.imageSrcs = []
      for (let index = 0; index < this.zoomImageViewItemEls.length; index++) {
        const element = this.zoomImageViewItemEls[index]
        this.imageSrcs.push(element.getAttribute('src'))
      }
      this.zoomImageViewItemEls.forEach((imageItem, index) => {
        imageItem.addEventListener('click', () => {
          this.handleImageItemThumbnailClick(imageItem, index)
        })
      })
    }
  }

  handleImageItemThumbnailClick(imageItem, index) {
    this.zoomValue = 1
    this.appendChild(
      createModalTemplate(
        this.hasAttribute('multiple')
          ? this.imageSrcs
          : imageItem.getAttribute('src'),
        this.hasAttribute('multiple'),
        index,
      ).cloneNode(true),
    )
    this.bindingEventsOnModal(index)
  }

  bindingEventsOnModal(index) {
    const modal = this.querySelector(
      '[for="defaultModal"]',
    ).content.firstElementChild.cloneNode(true)
    cdgDialogService.show('sampleDefaultModal', modal)

    this.transformViewEl = modal.querySelector('.cdg-zoom-image-view-transform')
    this.imgContentEls = modal.querySelectorAll('.cdg-zoom-image-view-img')
    this.carouselEl = modal.querySelector(
      'cdg-carousel#cdg-zoom-image-carousel',
    )
    this.imgThumbnailEls = modal.querySelectorAll(
      '.cdg-zoom-image-view-thumbnail',
    )

    if (this.carouselEl) {
      this.carouselEl.addEventListener(
        'onCurrentChange',
        this.handleCarouselIndexChange.bind(this),
      )
    }
    if (this.multiple && this.imgThumbnailEls && this.imgThumbnailEls.length) {
      this.imgThumbnailEls.forEach((imgThumbnail, index) => {
        imgThumbnail.addEventListener('click', (event) =>
          this.handleThumbnailModalClick(event, index),
        )
      })
    }
    this.imgContentEl = this.imgContentEls.item(index)
    const buttonZoomIn = modal.querySelector('#cdg-zoom-image-view-zoom-in')
    const buttonZoomOut = modal.querySelector('#cdg-zoom-image-view-zoom-out')

    buttonZoomIn.addEventListener('click', this.handleZoomInClick.bind(this))
    buttonZoomOut.addEventListener('click', this.handleZoomOutClick.bind(this))

    this.imgContentEl.addEventListener(
      'pointerdown',
      this.handlePointerDown.bind(this),
    )

    modal.addEventListener('close', this.handleModalClose.bind(this))
  }

  handleCarouselIndexChange(event) {
    this.changeImageActiveIndex(event.detail)
    this.imgThumbnailEls.forEach((imgThumbnail, index) => {
      imgThumbnail.classList.remove('thumbnail-active')
      if (index === event.detail) {
        imgThumbnail.classList.add('thumbnail-active')
      }
    })
  }

  handleThumbnailModalClick(event, index) {
    if (!event.target.classList.contains('thumbnail-active')) {
      const preActiveThumbnail = document.querySelector(
        '.cdg-zoom-image-view-thumbnail.thumbnail-active',
      )
      if (preActiveThumbnail) {
        preActiveThumbnail.classList.remove('thumbnail-active')
      }
      this.changeImageActiveIndex(index)
      this.carouselEl.setAttribute('current', index)
      event.target.classList.add('thumbnail-active')
    }
  }

  changeImageActiveIndex(index) {
    this.imgContentEl.removeEventListener(
      'pointerdown',
      this.handlePointerDown.bind(this),
    )
    this.imgContentEl.style.transform = `translate(0px, 0px) scale(1)`
    this.imgContentEl = this.imgContentEls.item(index)
    this.resetPosition()
    this.imgContentEl.addEventListener(
      'pointerdown',
      this.handlePointerDown.bind(this),
    )
  }

  handleZoomInClick() {
    if (this.zoomValue < MAX_ZOOM) {
      this.imgContentEl.style.transition = 'all 0.3s linear'
      const {x, y} = this.getNewPointer(0.5)
      this.zoomValue = this.zoomValue + 0.5
      this.pointer.update({x, y})
      this.currentPosition = {x, y}
      this.imgContentEl.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomValue})`
    }
  }

  handleZoomOutClick() {
    if (this.zoomValue > MIN_ZOOM) {
      this.imgContentEl.style.transition = 'all 0.3s linear'
      let {x, y} = this.getNewPointer(-0.5)
      this.zoomValue = this.zoomValue - 0.5
      // Set to center when zoom to min value
      if (this.zoomValue === MIN_ZOOM) {
        this.pointer.update(DEFAULT_POINT)
        this.currentPosition = DEFAULT_POINT
        this.ratioPointer = DEFAULT_POINT
        this.imgContentEl.style.transform = `translate(0px, 0px) scale(${this.zoomValue})`
        return
      }

      this.imgContentEl.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomValue})`
      const bound = this.imgContentEl.getBoundingClientRect()
      const boundTransformView = this.transformViewEl.getBoundingClientRect()

      const pointerScaled = this.getImageContentPointer()
      if (Math.floor(bound.right) <= Math.round(boundTransformView.right)) {
        x = -pointerScaled.x
      } else if (
        Math.round(bound.left) >= Math.floor(boundTransformView.left)
      ) {
        x = pointerScaled.x
      }
      if (Math.round(bound.top) >= Math.floor(boundTransformView.top)) {
        y = pointerScaled.y
      } else if (
        Math.round(bound.bottom) <= Math.floor(boundTransformView.bottom)
      ) {
        y = -pointerScaled.y
      }
      this.pointer.update({x, y})
      this.currentPosition = {x, y}
      this.imgContentEl.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomValue})`
    }
  }

  getNewPointer(calZoomValue) {
    const newWidth =
      (this.zoomValue + calZoomValue) * this.imgContentEl.clientWidth
    const newHeight =
      (this.zoomValue + calZoomValue) * this.imgContentEl.clientHeight
    return {
      x: newWidth * this.ratioPointer.x,
      y: newHeight * this.ratioPointer.y,
    }
  }

  handleModalClose() {
    this.resetPosition()
    this.removeChild(this.querySelector('[for="defaultModal"]'))
  }

  resetPosition() {
    this.pointer.update(DEFAULT_POINT)
    this.currentPosition = DEFAULT_POINT
    this.ratioPointer = DEFAULT_POINT
    this.zoomValue = 1
    this.overPointerTop = false
    this.overPointerBottom = false
    this.overPointerLeft = false
    this.overPointerRight = false
  }

  handlePointerDown(event) {
    if (this.zoomValue === 1) {
      return
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
    this.imgContentEl.style.transition = 'unset'
    this.overPointerTop = false
    this.overPointerBottom = false
    this.overPointerLeft = false
    this.overPointerRight = false
    this.setPointerCapture(event.pointerId)

    this.pointer = new Pointer()
    this.pointer.start({x: event.pageX, y: event.pageY})

    if (!this.handlePointerMoveFn) {
      this.handlePointerMoveFn = (event) => {
        this.handlePointerMove(event)
      }
    }

    if (!this.handlePointerUpFn) {
      this.handlePointerUpFn = this.handlePointerUp.bind(this)
    }

    this.addEventListener('pointermove', this.handlePointerMoveFn)
    this.addEventListener('pointerout', this.handlePointerUpFn, {
      once: true,
    })
  }

  handlePointerMove(event) {
    event.preventDefault()
    this.pointer.update({x: event.pageX, y: event.pageY})
    const bound = this.imgContentEl.getBoundingClientRect()
    const boundTransformView = this.transformViewEl.getBoundingClientRect()
    if (
      this.imgContentEl.clientHeight * this.zoomValue >
      this.transformViewEl.clientHeight
    ) {
      if (Math.round(bound.top) > Math.floor(boundTransformView.top)) {
        this.overPointerTop = true
      }
      if (Math.round(bound.bottom) < Math.floor(boundTransformView.bottom)) {
        this.overPointerBottom = true
      }
    }
    if (
      this.imgContentEl.clientWidth * this.zoomValue >
      this.transformViewEl.clientWidth
    ) {
      if (Math.round(bound.left) > Math.floor(boundTransformView.left)) {
        this.overPointerLeft = true
      }
      if (Math.floor(bound.right) < Math.round(boundTransformView.right)) {
        this.overPointerRight = true
      }
    }

    const x = this.pointer.distance.x + this.currentPosition.x
    const y = this.pointer.distance.y + this.currentPosition.y
    this.imgContentEl.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomValue})`
  }

  handlePointerUp() {
    this.removeEventListener('pointermove', this.handlePointerMoveFn)
    this.handlePointerMoveFn = null
    this.imgContentEl.style.transition = 'all 0.3s linear'
    const nextCurrentPointer = {
      x: this.toNumber(this.pointer.distance.x) + this.currentPosition.x,
      y: this.toNumber(this.pointer.distance.y) + this.currentPosition.y,
    }
    if (
      this.overPointerTop ||
      this.overPointerBottom ||
      this.overPointerLeft ||
      this.overPointerRight
    ) {
      const nextPointer = {
        x: this.pointer.currentPoint.x,
        y: this.pointer.currentPoint.y,
      }

      let x = this.toNumber(this.pointer.distance.x) + this.currentPosition.x
      const pointerScale = this.getImageContentPointer()
      if (this.overPointerRight || this.overPointerLeft) {
        x = this.overPointerRight ? -pointerScale.x : pointerScale.x
        nextPointer.x = x
        nextCurrentPointer.x = x
      }

      let y = this.toNumber(this.pointer.distance.y) + this.currentPosition.y
      if (this.overPointerTop || this.overPointerBottom) {
        y = this.overPointerBottom ? -pointerScale.y : pointerScale.y
        nextPointer.y = y
        nextCurrentPointer.y = y
      }

      this.imgContentEl.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomValue})`

      this.pointer.update(nextPointer)
    }
    this.currentPosition = nextCurrentPointer
    const newWidth = this.zoomValue * this.imgContentEl.clientWidth
    const newHeight = this.zoomValue * this.imgContentEl.clientHeight
    const {translateX, translateY} = this.getTranslateValue(this.imgContentEl)
    const ratioX = translateX / newWidth
    const ratioY = translateY / newHeight
    this.ratioPointer = {x: ratioX, y: ratioY}
  }

  getImageContentPointer() {
    return {
      x:
        (this.imgContentEl.clientWidth * this.zoomValue -
          this.transformViewEl.clientWidth) /
        2,
      y:
        (this.imgContentEl.clientHeight * this.zoomValue -
          this.transformViewEl.clientHeight) /
        2,
    }
  }

  toNumber(value) {
    if (isNaN(value) || isNaN(Number(value))) {
      return 0
    }
    return Number(value)
  }

  getTranslateValue(element) {
    // get the computed styles of the element
    const styles = window.getComputedStyle(element)
    const transformValue = styles.getPropertyValue('transform').split(',')

    if (transformValue.length < 4) {
      return {translateX: 0, translateY: 0}
    }

    // get the translateX and translateY values
    const translateX = transformValue[4].trim()
    const translateY = transformValue[5].replace(')', '').trim()

    return {translateX: Number(translateX), translateY: Number(translateY)}
  }
}
