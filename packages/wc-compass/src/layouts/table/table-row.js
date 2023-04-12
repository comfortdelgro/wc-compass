export class CdgTableRow extends HTMLElement {
  get checkable() {
    return this.hasAttribute('checkable')
  }

  set checkable(value) {
    if (value) {
      this.createCheckboxCell()
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
  }

  connectedCallback() {
    this.classList.add('cdg-table-row')
    this.setAttribute('role', 'tr')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }

  createCheckboxCell() {
    if (
      !this.checkboxCellElement &&
      !this.querySelector('cdg-table-cell.cdg-table-cell-checkbox')
    ) {
      const checkboxCellElement = document.createElement('cdg-table-cell')
      checkboxCellElement.classList.add(
        'cdg-table-cell',
        'cdg-table-cell-checkbox',
      )
      const container = document.createElement('div')
      container.classList.add('cdg-table-checkbox-contaner')
      const checkboxContainer = document.createElement('label')
      checkboxContainer.classList.add('cdg-checkbox')
      const checkboxElement = document.createElement('input')
      checkboxElement.type = 'checkbox'
      checkboxElement.classList.add('cdg-cell-checkbox')
      checkboxContainer.appendChild(checkboxElement)
      checkboxElement.addEventListener(
        'change',
        this.handleCheckboxChange.bind(this),
      )
      container.appendChild(checkboxContainer)
      checkboxCellElement.appendChild(container)
      this.prepend(checkboxCellElement)
    }
  }

  handleCheckboxChange(event) {
    this.dispatchEvent(
      new CustomEvent('onCheckAll', {
        detail: {checked: event.target.checked},
      }),
    )
  }
}
