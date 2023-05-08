export class CdgThumbnailBar extends HTMLElement {
  get currentIndex() {
    return this.activeIndex
  }

  set currentIndex(currentIndex) {
    this.activeIndex = currentIndex
  }

  get images() {
    return imageUrls
  }

  set images(images) {
    this.imageList = images
  }

  activeIndex
  imageList = []
  thumbs = []

  keyboardListener

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-thumbnail-bar')
    if (this.imageList.length) {
      this.imageList.forEach((image, index) => {
        const thumbWrapper = document.createElement('button')
        thumbWrapper.classList.add('cdg-thumbnail-wrapper')
        const thumb = this.createThumbItem(image.src)
        thumbWrapper.appendChild(thumb)
        thumbWrapper.addEventListener(
          'click',
          this.setActiveItem.bind(this, index),
        )

        this.thumbs.push(thumbWrapper)
        this.appendChild(thumbWrapper)
      })
    }

    this.thumbs[this.currentIndex].classList.add('active')
    this.thumbs[this.currentIndex].focus()

    this.keyboardListener = this.handleKeyboard.bind(this)
    window.addEventListener('keydown', this.keyboardListener)
  }

  createThumbItem(src) {
    const thumb = document.createElement('img')
    thumb.classList.add('cdg-thumbnail-bar-item')
    thumb.setAttribute('src', src)

    return thumb
  }

  setActiveItem(index) {
    if (index === this.currentIndex) {
      return
    }
    this.thumbs[this.currentIndex].classList.remove('active')
    this.currentIndex = index
    this.thumbs[this.currentIndex].focus()
    this.thumbs[this.currentIndex].classList.add('active')
    this.dispatchEvent(new CustomEvent('activeItem', {detail: index}))
  }

  handleKeyboard(event) {
    const length = this.imageList.length
    switch (event.key) {
      case 'ArrowRight':
        this.setActiveItem((this.currentIndex + 1) % length)
        break

      case 'ArrowLeft':
        this.setActiveItem((length + (this.currentIndex - 1)) % length)
        break

      default:
        break
    }
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.keyboardListener)
  }
}
