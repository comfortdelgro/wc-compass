import {CdgBaseComponent} from '../../shared/base-component'

export class CdgGallery extends CdgBaseComponent {
  get images() {
    return this.imageList || []
  }

  set images(images) {
    this.imageList = images
    this.attachImages()
  }

  imageList = []

  imageElements = []
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-gallery')
    this.attachImages()
  }

  attachImages() {
    this.textContent = ''
    if (this.images && this.images.length) {
      this.images.forEach((image) => {
        const imageWrapper = document.createElement('button')
        imageWrapper.classList.add('cdg-gallery-image-wrapper')
        const imageElement = document.createElement('img')
        imageElement.classList.add('cdg-gallery-image')
        imageElement.setAttribute('src', image.thumbnail)
        imageElement.setAttribute('largeSrc', image.large)
        imageElement.setAttribute('alt', image.alt || '')

        imageWrapper.addEventListener('click', this.zoomIn.bind(this))
        imageWrapper.appendChild(imageElement)
        this.imageElements.push(imageElement)
        this.appendChild(imageWrapper)
      })
    }
  }

  zoomIn(event) {
    const image = event.target.querySelector('img')
    if (image) {
      cdgImageViewerService.showGroup(image, this.imageElements)
    }
  }
}
