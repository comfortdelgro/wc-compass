import {CdgBaseComponent} from '../../shared/base-component'

export class CdgWizardStep extends CdgBaseComponent {
  static get observedAttributes() {
    return ['status', 'index', 'name']
  }

  get status() {
    return this.getAttribute('status')
  }

  set status(status) {
    this.setAttribute('status', status)
  }

  get index() {
    return this.getAttribute('index')
  }

  set index(index) {
    this.setAttribute('index', index)
  }

  get name() {
    return this.getAttribute('name')
  }

  set name(name) {
    this.setAttribute('name', name)
  }

  point

  nameElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-wizard-step')
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'index':
        this.addStepPoint()
        break

      case 'status':
        if (this.status === 'completed') {
          this.useIcon()
        } else {
          this.point.textContent = this.index
        }
        break

      case 'name':
        this.nameElement = document.createElement('span')
        this.nameElement.classList.add('cdg-wizard-step-name')
        this.nameElement.textContent = this.name.trim()
        this.appendChild(this.nameElement)
        break

      default:
        break
    }
  }

  addStepPoint() {
    if (this.point) {
      this.removeChild(this.point)
    }

    this.point = document.createElement('button')
    this.point.setAttribute('aria-label', 'Step ' + this.index)
    this.point.classList.add('cdg-wizard-step-text')
    if (this.status !== 'completed') {
      this.point.textContent = this.index
    } else {
      this.useIcon()
    }

    this.appendChild(this.point)
  }

  useIcon() {
    const icon = document.createElement('cdg-icon')
    icon.setAttribute('name', 'tick')
    this.point.textContent = ''
    this.point.appendChild(icon)
  }
}
