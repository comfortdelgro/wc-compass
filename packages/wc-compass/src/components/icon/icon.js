import {CdgIconSize} from '../../shared/core.js'
import {downloadSVGContent, toLowerCaseAndDash} from '../../shared/utilities'

export class CdgIcon extends CdgIconSize {
  static get observedAttributes() {
    return ['name', 'size']
  }

  get name() {
    return this.getAttribute('name')
  }

  set name(name) {
    this.setAttribute('name', name)
  }

  iconSource =
    'https://cdn.jsdelivr.net/gh/comfortdelgro/wc-compass-design@main/dist/images/'

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-icon')
  }

  fetchAndShowIcon() {
    // if (this.getAttribute('source') === 'host') {
    this.iconSource = './images/'
    // }

    if (this.name) {
      this.download(this.iconSource + toLowerCaseAndDash(this.name) + '.svg')
    }
  }

  download(url) {
    downloadSVGContent(url).then((data) => {
      this.textContent = ''
      this.appendChild(data)
    })
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue)
    switch (attr) {
      case 'name':
        this.fetchAndShowIcon()
        break

      default:
        break
    }
  }
}
