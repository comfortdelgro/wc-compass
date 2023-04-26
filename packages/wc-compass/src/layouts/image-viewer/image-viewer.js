import {Pointer, Position} from '../../shared/pointer'

const ORIENTATION_LANDSCAPE = 'landscape'
const ORIENTATION_PORTRAIT = 'portrait'
const ANIMATION_TIME = 200
const ZOOM_STEP = 0.5

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

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-image-viewer')
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
    if (this.img) {
      this.textContent = ''
      this.removeEventListener('load', this.handleImageLoad.bind(this))
    }
    this.img = document.createElement('img')
    this.img.setAttribute('src', this.src)
    this.img.addEventListener('load', this.handleImageLoad.bind(this))

    this.appendChild(this.img)
  }

  handleImageLoad() {
    this.updateImageSize()
    this.updateZoom()
    this.addEventListener('dblclick', this.handleDoubleClick.bind(this))
    this.addEventListener('pointerdown', this.handlePointerDown.bind(this))
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
    setTimeout(() => {
      this.recentralize()
    }, ANIMATION_TIME + 10)
  }

  updateZoom() {
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
  }

  handlePointerUp() {
    this.removeEventListener('pointermove', this.handlePointerMove)

    if (!this.pointer.distance.x || !this.pointer.distance.y) {
      return
    }
    const x = this.capturedPosition.x + this.pointer.distance.x
    const y = this.capturedPosition.y + this.pointer.distance.y
    this.capturedPosition = new Position(x, y)
    this.recentralize()
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
    } else if (imageBounding.top > viewerBounding.top) {
      y = (imageBounding.height - viewerBounding.height) / 2
    } else if (
      imageBounding.top + imageBounding.height <
      viewerBounding.top + viewerBounding.height
    ) {
      y = -(imageBounding.height - viewerBounding.height) / 2
    }

    this.capturedPosition = new Position(x, y)

    this.updateZoom()
  }
}
