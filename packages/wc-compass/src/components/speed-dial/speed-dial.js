import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSpeedDial extends CdgBaseComponent {
  static get observedAttributes() {
    return ['open']
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(open) {
    if (open) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-speed-dial')
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'open':
        // console.log(this.open)
        break

      default:
        break
    }
  }

  toggle() {
    this.open = !this.open
  }

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }
}
