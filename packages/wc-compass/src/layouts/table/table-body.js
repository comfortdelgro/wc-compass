export class CdgTableBody extends HTMLElement {
  get checkable() {
    return this.hasAttribute('checkable')
  }

  set checkable(value) {
    if (value) {
      const rows = this.querySelectorAll('cdg-table-row')
      for (let index = 0; index < rows.length; index++) {
        const row = rows.item(index)
        row.setAttribute('checkable', '')
      }
      this.setAttribute('checkable', '')
    } else {
      this.removeAttribute('checkable')
    }
  }

  static get observedAttributes() {
    return ['checkable']
  }

  constructor() {
    super()
    this.setAttribute('role', 'tbody')
  }

  connectedCallback() {
    this.classList.add('cdg-table-body')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }

  handleCheckboxChange(row, event) {
    const checked = !!event.target.checked
    if (checked) {
      row.setAttribute('checked', '')
    } else {
      row.removeAttribute('checked')
    }
    if (event.bubbles) {
      this.dispatchEvent(
        new CustomEvent('onRowCheck', {detail: {checked: checked}}),
      )
    }
  }
}
