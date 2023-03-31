export class CDGServiceCard extends HTMLElement {
  static get observedAttributes() {
    return ['imageLink', 'serviceName', 'description', 'serviceLink']
  }

  get imageLink() {
    return this.getAttribute('imageLink')
  }

  get serviceName() {
    return this.getAttribute('serviceName')
  }
  get description() {
    return this.getAttribute('description')
  }

  get serviceLink() {
    return this.getAttribute('serviceLink')
  }

  constructor() {
    super()

    this.classList.add('service-card')
    const imageSection = document.createElement('div')
    imageSection.classList.add('service-card__image-container')
    const innerImage = document.createElement('img')
    innerImage.setAttribute('src', this.imageLink)
    imageSection.appendChild(innerImage)

    const serviceName = document.createElement('div')
    serviceName.classList.add('service-card__serviceName')
    serviceName.innerHTML = this.serviceName

    const description = document.createElement('div')
    description.classList.add('service-card__description')
    description.innerHTML = this.description

    const contentSection = document.createElement('div')
    contentSection.classList.add('service-card__contentSection')
    contentSection.appendChild(serviceName)
    contentSection.appendChild(description)

    const linkIcon = document.createElement('cdg-icon')
    linkIcon.setAttribute('name', 'arrowRight')
    linkIcon.setAttribute('source', 'host') //TODO
    linkIcon.addEventListener('click', () => {
      window.open(this.serviceLink, '_blank')
    })
    this.appendChild(imageSection)
    this.appendChild(contentSection)
    this.appendChild(linkIcon)
  }

  connectedCallback() {}
}
