export class CdgGroupImageViewer extends HTMLElement {
  get currentIndex() {
    return this.activeIndex
  }

  set currentIndex(currentIndex) {
    this.activeIndex = currentIndex
  }

  get images() {
    return this.imageList
  }

  set images(images) {
    this.imageList = images
  }

  activeIndex
  closeButton
  viewer
  controls
  imageList

  keyboardListenerf
  lastFocus

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-group-image-viewer')
    this.lastFocus = document.activeElement

    this.controls = document.createElement('div')
    this.controls.classList.add('cdg-image-viewer-controls')
    this.appendChild(this.controls)
    this.attachZoomInButton()
    this.attachZoomOutButton()
    this.attachCloseButton()

    this.viewer = document.createElement('cdg-image-viewer')
    this.viewer.addEventListener('swipeClose', () => {
      this.close()
    })

    this.viewer.addEventListener('enlarged', (event) => {
      if (event.detail) {
        this.controls.classList.add('visible')

        if (this.imageList.length > 1) {
          this.attachThumbnailBar()
        }
      } else {
        this.controls.classList.remove('visible')
      }
    })

    this.appendChild(this.viewer)
    if (this.imageList && this.imageList.length) {
      if (this.activeIndex) {
        this.viewer.setImage(this.imageList[this.activeIndex].image)
      } else {
        this.viewer.setImage(this.imageList[0].image)
      }
    }

    this.keyboardListener = this.handleKeyboard.bind(this)
    window.addEventListener('keydown', this.keyboardListener)
  }

  attachCloseButton() {
    this.closeButton = document.createElement('button')
    this.closeButton.classList.add('cdg-button', 'icon', 'ghost')
    const closeIcon = document.createElement('cdg-icon')
    closeIcon.setAttribute('name', 'close')
    this.closeButton.appendChild(closeIcon)
    this.closeButton.addEventListener('click', this.handleClose.bind(this))

    this.controls.appendChild(this.closeButton)
  }

  attachZoomInButton() {
    this.zoomInButton = document.createElement('button')
    this.zoomInButton.classList.add('cdg-button', 'icon', 'ghost')
    const zoomIn = document.createElement('cdg-icon')
    zoomIn.setAttribute('name', 'zoomPlus')
    this.zoomInButton.appendChild(zoomIn)
    this.zoomInButton.addEventListener('click', this.handleZoomIn.bind(this))

    this.controls.appendChild(this.zoomInButton)
  }

  attachZoomOutButton() {
    this.zoomInButton = document.createElement('button')
    this.zoomInButton.classList.add('cdg-button', 'icon', 'ghost')
    const zoomMinus = document.createElement('cdg-icon')
    zoomMinus.setAttribute('name', 'zoomMinus')
    this.zoomInButton.appendChild(zoomMinus)
    this.zoomInButton.addEventListener('click', this.handleZoomOut.bind(this))

    this.controls.appendChild(this.zoomInButton)
  }

  handleZoomIn() {
    this.viewer.zoomIn()
  }

  handleZoomOut() {
    this.viewer.zoomOut()
  }

  attachThumbnailBar() {
    const thumbnailBar = document.createElement('cdg-thumbnail-bar')
    thumbnailBar.currentIndex = this.currentIndex
    thumbnailBar.images = this.imageList
    thumbnailBar.addEventListener('activeItem', (event) => {
      this.currentIndex = event.detail
      this.viewer.setImageUrl(
        this.imageList[this.activeIndex].src,
        this.imageList[this.activeIndex].image,
      )
    })

    this.appendChild(thumbnailBar)
  }

  // To prevent double click on close button
  handleClose() {
    this.removeChild(this.controls)
    this.viewer.close()
  }

  close() {
    if (this.lastFocus) {
      this.lastFocus.focus()
    }

    if (this && this.parentElement && this.parentElement.hasChildNodes(this)) {
      this.parentElement.removeChild(this)
    }
  }

  handleKeyboard(event) {
    switch (event.key) {
      case 'Escape':
        this.handleClose()
        break

      default:
        break
    }
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.keyboardListener)
  }
}
