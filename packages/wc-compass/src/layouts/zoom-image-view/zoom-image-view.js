import {Pointer} from '../../shared/pointer'

function createModalTemplate(imgSrc) {
  const template = document.createElement('template')
  template.setAttribute('for', 'defaultModal')
  template.innerHTML = `
  <cdg-modal size="auto" class="cdg-zoom-image-view-modal">
    <cdg-modal-header useCloseButton="true">
      <button class="cdg-button icon ghost" id="cdg-zoom-image-view-zoom-in">
        <cdg-icon name="zoomPlus" size="14"></cdg-icon>
      </button>
      <button class="cdg-button icon ghost" id="cdg-zoom-image-view-zoom-out">
        <cdg-icon name="zoomMinus" size="14"></cdg-icon>
      </button>
    </cdg-modal-header>
    <cdg-modal-body>
      <div class="cdg-zoom-image-view-body">
        <div class="cdg-zoom-image-view-transform">
          <img src="${imgSrc}" id="cdg-zoom-image-view-img" />
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
  currentPosition = DEFAULT_POINT
  pointer = new Pointer()
  zoomValue = 1
  transformViewEl
  imgContentEl

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
      this.zoomImageViewItemEls.forEach((imageItem) => {
        imageItem.addEventListener('click', () => {
          this.handleImageItemThumbnailClick(imageItem)
        })
      })
    }
  }

  handleImageItemThumbnailClick(imageItem) {
    this.zoomValue = 1
    this.appendChild(
      createModalTemplate(imageItem.getAttribute('src')).cloneNode(true),
    )
    this.bindingEventsOnModal()
  }

  bindingEventsOnModal() {
    const modal = this.querySelector(
      '[for="defaultModal"]',
    ).content.firstElementChild.cloneNode(true)
    cdgDialogService.show('sampleDefaultModal', modal)

    this.transformViewEl = modal.querySelector('.cdg-zoom-image-view-transform')
    this.imgContentEl = modal.querySelector('#cdg-zoom-image-view-img')
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

  handleZoomInClick() {
    if (this.zoomValue < MAX_ZOOM) {
      this.imgContentEl.style.transition = 'all 0.3s linear'
      this.zoomValue = this.zoomValue + 0.5
      const {x, y} = this.getNewPointer(0.5, this.imgContentEl)
      this.pointer.update({x, y})
      this.currentPosition = {x, y}
      this.imgContentEl.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomValue})`
    }
  }

  handleZoomOutClick() {
    if (this.zoomValue > MIN_ZOOM) {
      this.imgContentEl.style.transition = 'all 0.3s linear'
      this.zoomValue = this.zoomValue - 0.5
      // Set to center when zoom to min value
      if (this.zoomValue === MIN_ZOOM) {
        this.pointer.update(DEFAULT_POINT)
        this.currentPosition = DEFAULT_POINT
        this.imgContentEl.style.transform = `translate(0px, 0px) scale(${this.zoomValue})`
        return
      }

      let {x, y} = this.getNewPointer(-0.5, this.imgContentEl)
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

  getNewPointer(calZoomValue, translateElement) {
    const oldWidth = this.zoomValue * this.imgContentEl.clientWidth
    const oldHeight = this.zoomValue * this.imgContentEl.clientHeight
    const newWidth =
      (this.zoomValue + calZoomValue) * this.imgContentEl.clientWidth
    const newHeight =
      (this.zoomValue + calZoomValue) * this.imgContentEl.clientHeight

    const {translateX, translateY} = this.getTranslateValue(translateElement)
    const x = (translateX / oldWidth) * newWidth
    const y = (translateY / oldHeight) * newHeight
    return {x, y}
  }

  handleModalClose() {
    this.pointer.update(DEFAULT_POINT)
    this.currentPosition = DEFAULT_POINT
    this.zoomValue = 1
    this.overPointerTop = false
    this.overPointerBottom = false
    this.overPointerLeft = false
    this.overPointerRight = false
    this.removeChild(this.querySelector('[for="defaultModal"]'))
  }

  handlePointerDown(event) {
    event.preventDefault()
    if (this.zoomValue === 1) {
      return
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
      if (bound.top > boundTransformView.top) {
        this.overPointerTop = true
      }
      if (bound.bottom < boundTransformView.bottom) {
        this.overPointerBottom = true
      }
    }
    if (
      this.imgContentEl.clientWidth * this.zoomValue >
      this.transformViewEl.clientWidth
    ) {
      if (bound.left > boundTransformView.left) {
        this.overPointerLeft = true
      }
      if (bound.right < boundTransformView.right) {
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
