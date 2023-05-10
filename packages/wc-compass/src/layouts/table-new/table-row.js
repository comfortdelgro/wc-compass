export class CdgTableRow extends HTMLElement {
  checkboxElement
  index = -1

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-table-row')
    this.setAttribute('role', 'tr')
    this.attachCheckbox()
    if (
      this.parentElement.classList.contains('cdg-table-body') &&
      this.parentElement.registerRow
    ) {
      this.index = Array.from(this.parentElement.children).indexOf(this)
      this.parentElement.registerRow(this, this.index)
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }

  attachCheckbox() {
    const checkboxCellElement = document.createElement('cdg-table-cell')
    checkboxCellElement.classList.add(
      'cdg-table-cell',
      'cdg-table-cell-checkbox',
    )
    const container = document.createElement('div')
    container.classList.add('cdg-table-checkbox-contaner')
    const checkboxContainer = document.createElement('label')
    checkboxContainer.classList.add('cdg-checkbox')
    this.checkboxElement = document.createElement('input')
    this.checkboxElement.setAttribute('type', 'checkbox')
    this.checkboxElement.classList.add('cdg-cell-checkbox')
    checkboxContainer.appendChild(this.checkboxElement)
    this.checkboxElement.addEventListener(
      'change',
      this.handleCheckboxChange.bind(this),
    )
    container.appendChild(checkboxContainer)
    checkboxCellElement.appendChild(container)
    this.prepend(checkboxCellElement)
  }

  check(checked) {
    this.checkboxElement.checked = checked
  }

  handleCheckboxChange(event) {
    this.dispatchEvent(
      new CustomEvent('toggleRow', {
        detail: {checked: event.target.checked},
      }),
    )
  }
}
