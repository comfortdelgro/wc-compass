export class CdgImageAbout extends HTMLElement {
  container
  static get observedAttributes() {
    return ['src']
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(src) {
    this.setAttribute('src', src)
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.container = document.createElement('div')
    this.container.classList.add('cdg-about-left')
    this.container.style.backgroundImage = `url('${this.src}')`
    this.container.style.minHeight = '400px'

    const containerBackdrop = document.createElement('div')
    containerBackdrop.classList.add('cdg-about-backdrop')

    const image = document.createElement('img')
    image.setAttribute('src', this.src)

    image.onload = function handleImageLoaded() {
      image.style.top = `calc(50% - ${image.clientHeight / 2}px)`
      this.container.style.height = `${image.clientHeight + 40}px)`
    }
    image.classList.add('cdg-about-image')
    containerBackdrop.appendChild(image)

    this.container.appendChild(containerBackdrop)

    this.replaceWith(this.container)
  }
}
