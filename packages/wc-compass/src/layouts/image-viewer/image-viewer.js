import {Pointer, Position} from '../../shared/pointer'

const ANIMATION_TIME = 200
const ZOOM_STEP = 0.5
const FORCE_CLOSE_DISTANCE = 100
const TRANSPARENT_DISTANCE = 400

export class CdgImageViewer extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'zoom']
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(src) {
    this.setAttribute('src', src)
  }

  get zoom() {
    return Number(this.getAttribute('zoom')) || 1
  }

  set zoom(zoom) {
    this.setAttribute('zoom', zoom)
  }

  img
  currentViewMode = 'landscape'

  capturedPosition = new Position()
  currentPosition = new Position()
  pointer = new Pointer()
  recentralizeTimer
  thumbnail
  transformAnimationTimer
  loading = false
  useAnimation = true

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-image-viewer')
    this.addEventListener('dblclick', this.handleDoubleClick.bind(this))
    this.addEventListener('pointerdown', this.handlePointerDown.bind(this))
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'src':
        this.attachImage()
        break

      case 'zoom':
        this.updateZoom()
        break

      default:
        return
    }
  }

  attachImage() {
    if (!this.src) {
      return
    }
    if (!this.img) {
      this.img = document.createElement('img')
      this.img.addEventListener('load', this.handleImageLoad.bind(this))
      this.img.addEventListener('error', this.handleImageError.bind(this))
      this.appendChild(this.img)
    }
    this.img.setAttribute('src', this.src)
  }

  handleImageError() {
    if (this.isClosableMode() && this.useAnimation) {
      if (this.src === this.thumbnail.getAttribute('src')) {
        this.handleThumbnailLoad()
      } else if (this.src === this.thumbnail.getAttribute('largeSrc')) {
        this.handleEnlargeImageLoad()
      }
    }
  }

  handleImageLoad() {
    this.updateImageSize()
    this.updateZoom()
    if (this.isClosableMode() && this.useAnimation) {
      if (this.src === this.thumbnail.getAttribute('src')) {
        this.handleThumbnailLoad()
      } else if (this.src === this.thumbnail.getAttribute('largeSrc')) {
        this.handleEnlargeImageLoad()
      }
    } else {
      this.useAnimation = true
    }
  }

  removeClonedThumbnail() {
    if (this.clonedThumbnail) {
      this.img.style.transition = 'none'
      this.img.style.opacity = '1'
      document.body.removeChild(this.clonedThumbnail)
      this.clonedThumbnail = null
    }
  }

  handleEnlargeImageLoad() {
    this.loading = false
    if (!this.transformAnimationTimer) {
      this.removeClonedThumbnail()
    }
    this.dispatchEvent(new CustomEvent('enlarged', {detail: true}))
  }

  handleThumbnailLoad() {
    const imgBound = this.img.getBoundingClientRect()
    this.clonedThumbnail.style.width = imgBound.width + 'px'
    this.clonedThumbnail.style.height = imgBound.height + 'px'
    this.clonedThumbnail.style.top = imgBound.top + 'px'
    this.clonedThumbnail.style.left = imgBound.left + 'px'
    this.clonedThumbnail.style.zIndex = 50
    this.loading = true
    this.dispatchEvent(new CustomEvent('enlarged', {detail: false}))
    const src = this.thumbnail.getAttribute('largeSrc')
    if (src) {
      this.src = src
    } else {
      this.loading = false
    }

    this.transformAnimationTimer = setTimeout(() => {
      this.transformAnimationTimer = null
      // If no enlarge image src, we're going to display controls
      if (!src) {
        this.handleEnlargeImageLoad()
      }
      if (!this.loading) {
        this.removeClonedThumbnail()
      }
    }, ANIMATION_TIME)
  }

  setImageUrl(src, thumbnail) {
    this.useAnimation = false
    this.src = src

    if (thumbnail) {
      this.thumbnail = thumbnail
    }
  }

  /**
   * To animate image from thumbnail to large image
   * @param {HTMLImageElement} element thumbnail image that need to transform
   */
  setImage(element) {
    this.thumbnail = element

    this.clonedThumbnail = document.createElement('img')
    this.clonedThumbnail.setAttribute('src', this.thumbnail.getAttribute('src'))

    const bounding = this.thumbnail.getBoundingClientRect()
    this.clonedThumbnail.style.position = 'fixed'
    this.clonedThumbnail.style.top = bounding.top + 'px'
    this.clonedThumbnail.style.left = bounding.left + 'px'
    this.clonedThumbnail.style.width = bounding.width + 'px'
    this.clonedThumbnail.style.height = bounding.height + 'px'
    this.clonedThumbnail.style.transition = `all ${ANIMATION_TIME}ms ease-in-out`

    this.src = this.thumbnail.getAttribute('src')
    this.img.style.opacity = '0'

    document.body.appendChild(this.clonedThumbnail)
  }

  updateImageSize() {
    let viewRatio = this.clientHeight / this.clientWidth
    let imageRatio = this.img.naturalHeight / this.img.naturalWidth
    let scaledHeight =
      viewRatio <= imageRatio
        ? this.clientHeight
        : this.clientWidth * imageRatio
    let scaledWidth =
      viewRatio <= imageRatio
        ? this.clientHeight / imageRatio
        : this.clientWidth

    this.img.style.width = scaledWidth + 'px'
    this.img.style.height = scaledHeight + 'px'
  }

  /**
   * To automatically zoom in the image on double click
   * And zoom out to normal when user double click on it again
   */
  handleDoubleClick() {
    this.zoom = this.zoom < 2 ? 2 : 1
  }

  zoomIn() {
    if (this.zoom < 3) {
      this.zoom = this.zoom + ZOOM_STEP
    }
  }

  zoomOut() {
    if (this.zoom > 1) {
      this.zoom = this.zoom - ZOOM_STEP
    }
  }

  handlePointerDown(event) {
    this.style.transition = 'none'

    this.setPointerCapture(event.pointerId)

    this.pointer = new Pointer()
    this.pointer.start({x: event.pageX, y: event.pageY})

    this.addEventListener('pointermove', this.handlePointerMove)
    this.addEventListener('touchmove', this.handleTouchMove)
    this.addEventListener('pointerup', this.handlePointerUp, {
      once: true,
    })
    this.addEventListener('pointercancel', this.handlePointerUp, {
      once: true,
    })
  }
  /**
   * To prevent page scroll on mobile when user is dragging
   * @param {TouchEvent} event
   */
  handleTouchMove(event) {
    event.preventDefault()
  }

  handlePointerMove(event) {
    this.pointer.update({x: event.pageX, y: event.pageY})
    this.updateView()
    const viewerBounding = this.getBoundingClientRect()
    const imageBounding = this.img.getBoundingClientRect()
    if (this.isClosableMode() && imageBounding.top > viewerBounding.top) {
      let opacity = 1 - this.pointer.distance.y / TRANSPARENT_DISTANCE
      opacity = opacity < 0 ? 0 : opacity
      opacity = opacity > 1 ? 1 : opacity
      this.style.backgroundColor = `rgba(0,0,0,${opacity})`
    }
  }

  handlePointerUp() {
    this.removeEventListener('pointermove', this.handlePointerMove)

    if (!this.pointer.distance.x || !this.pointer.distance.y) {
      return
    }

    if (this.isClosableMode()) {
      this.style.backgroundColor = `rgba(0,0,0,1)`
    }
    const x = this.capturedPosition.x + this.pointer.distance.x
    const y = this.capturedPosition.y + this.pointer.distance.y
    this.capturedPosition = new Position(x, y)
    this.recentralize()
    this.updateZoom()
  }

  recentralize() {
    let x = this.capturedPosition.x
    let y = this.capturedPosition.y

    const viewerBounding = this.getBoundingClientRect()
    const imageBounding = this.img.getBoundingClientRect()

    // For horizontal
    if (imageBounding.width < viewerBounding.width) {
      x = 0
    } else if (imageBounding.left > viewerBounding.left) {
      x = (imageBounding.width - viewerBounding.width) / 2
    } else if (
      imageBounding.left + imageBounding.width <
      viewerBounding.left + viewerBounding.width
    ) {
      x = -(imageBounding.width - viewerBounding.width) / 2
    }

    // For vertical
    if (imageBounding.height < viewerBounding.height) {
      y = 0
      this.checkForForceClose()
    } else if (imageBounding.top > viewerBounding.top) {
      y = (imageBounding.height - viewerBounding.height) / 2
      this.checkForForceClose()
    } else if (
      imageBounding.top + imageBounding.height <
      viewerBounding.top + viewerBounding.height
    ) {
      y = -(imageBounding.height - viewerBounding.height) / 2
    }

    this.capturedPosition = new Position(x, y)
  }

  updateZoom() {
    if (this.img) {
      this.img.style.transition = `all ${ANIMATION_TIME}ms ease-in-out`
      this.img.style.transform = `scale(${this.zoom}) translate3d(${
        this.capturedPosition.x / this.zoom
      }px, ${this.capturedPosition.y / this.zoom}px, 0px)`

      if (this.recentralizeTimer) {
        clearTimeout(this.recentralizeTimer)
      }

      this.recentralizeTimer = setTimeout(() => {
        this.recentralize()
        this.updateImagePosition()
      }, ANIMATION_TIME + 10)
    }
  }

  updateImagePosition() {
    if (this.img) {
      this.img.style.transition = `all ${ANIMATION_TIME}ms ease-in-out`
      this.img.style.transform = `scale(${this.zoom}) translate3d(${
        this.capturedPosition.x / this.zoom
      }px, ${this.capturedPosition.y / this.zoom}px, 0px)`
    }
  }

  updateView() {
    if (this.img) {
      this.img.style.transition = `none`
      const x = this.capturedPosition.x + this.pointer.distance.x
      const y = this.capturedPosition.y + this.pointer.distance.y
      this.img.style.transform = `scale(${this.zoom}) translate3d(${
        x / this.zoom
      }px, ${y / this.zoom}px, 0px)`
    }
  }

  isClosableMode() {
    return !!this.thumbnail
  }

  checkForForceClose() {
    // For swiping down to close
    if (this.pointer.down && this.pointer.distance.y > FORCE_CLOSE_DISTANCE) {
      this.close()
    }
  }

  close() {
    if (!this.thumbnail) {
      return
    }
    const cloneThumbnail = document.createElement('img')
    cloneThumbnail.setAttribute('src', this.thumbnail.getAttribute('src'))

    const imageBounding = this.img.getBoundingClientRect()
    cloneThumbnail.style.position = 'fixed'
    cloneThumbnail.style.width = imageBounding.width + 'px'
    cloneThumbnail.style.height = imageBounding.height + 'px'
    cloneThumbnail.style.top = imageBounding.top + 'px'
    cloneThumbnail.style.left = imageBounding.left + 'px'
    cloneThumbnail.style.transition = `all ${ANIMATION_TIME}ms ease-in-out`

    const bounding = this.thumbnail.getBoundingClientRect()
    this.style.opacity = '0'
    document.body.appendChild(cloneThumbnail)
    setTimeout(() => {
      cloneThumbnail.style.top = bounding.top + 'px'
      cloneThumbnail.style.left = bounding.left + 'px'
      cloneThumbnail.style.width = bounding.width + 'px'
      cloneThumbnail.style.height = bounding.height + 'px'
    })

    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('swipeClose'))
      document.body.removeChild(cloneThumbnail)
    }, ANIMATION_TIME)
  }
}
