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
    this.coverImage = document.createElement('cdg-lazy-img')
    this.coverImage.classList.add('cdg-card-cover-image')
    this.coverImage.setAttribute('src', this.src)

    this.prepend(this.coverImage)
  }
}
