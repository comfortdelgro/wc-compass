import {CdgBaseComponent} from '../../shared/base-component'

export class CdgImageAbout extends CdgBaseComponent {
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
    this.classList.add('cdg-section-about-cover')

    const backgroundImage = document.createElement('img')
    backgroundImage.setAttribute('src', this.src)
    backgroundImage.classList.add('cdg-about-blur-image')
    this.appendChild(backgroundImage)

    const blurCover = document.createElement('div')
    blurCover.classList.add('cdg-blur-cover')
    this.appendChild(blurCover)

    const image = document.createElement('img')
    image.setAttribute('src', this.src)
    image.classList.add('cdg-about-image')
    this.appendChild(image)
  }
}
