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

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-thumbnail-bar')
    if (this.imageList.length) {
      this.imageList.forEach((image, index) => {
        const thumb = this.createThumbItem(image.src)
        thumb.addEventListener('click', this.setActiveItem.bind(this, index))

        this.thumbs.push(thumb)
        this.appendChild(thumb)
      })
    }

    this.thumbs[this.currentIndex].classList.add('active')
  }

  createThumbItem(src) {
    const thumb = document.createElement('img')
    thumb.classList.add('cdg-thumbnail-bar-item')
    thumb.setAttribute('src', src)

    return thumb
  }

  setActiveItem(index) {
    this.thumbs[this.currentIndex].classList.remove('active')
    this.currentIndex = index
    this.thumbs[this.currentIndex].classList.add('active')
    this.dispatchEvent(new CustomEvent('activeItem', {detail: index}))
  }
}
