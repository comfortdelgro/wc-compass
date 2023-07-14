import {CdgBaseComponent} from '../../shared/base-component'

export class CdgPopoverContent extends CdgBaseComponent {
  static get observedAttributes() {
    return []
  }

  constructor() {
    super()
  }

  connectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue
  }
}
