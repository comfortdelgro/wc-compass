export class CdgPopoverContent extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
  }

  connectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[attr] = newValue;
  }
}
