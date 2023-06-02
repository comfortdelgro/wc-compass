export class CdgCardCover extends HTMLElement {
  get src() {
    return this.getAttribute('src')
  }

  set src(src) {
    this.setAttribute('src', src)
  }

  coverImage
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-card-cover')
    if (!this.coverImage) {
      this.coverImage = document.createElement('cdg-lazy-img')
      const ariaLabel = this.getAttribute('alt') || 'Card cover image'
      this.coverImage.setAttribute('alt', ariaLabel)

      this.coverImage.classList.add('cdg-card-cover-image')
      this.coverImage.setAttribute('src', this.src)

      this.prepend(this.coverImage)
    }
  }
}
