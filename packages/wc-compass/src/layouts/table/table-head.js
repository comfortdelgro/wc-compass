export class CdgTableHead extends HTMLElement {
  tableHeadRowElement
  checkboxCellElement
  checkboxElement

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
    this.classList.add('cdg-table-head')
    this.setAttribute('role', 'thead')
    this.tableHeadRowElement = this.querySelector('cdg-table-row')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }

  createCheckboxCell() {
    if (!this.checkboxCellElement) {
      this.checkboxCellElement = document.createElement('cdg-table-head-cell')
      this.checkboxCellElement.classList.add('cdg-table-head-cell-checkbox')

      const container = document.createElement('div')
      container.classList.add('cdg-table-checkbox-contaner')
      const checkboxContainer = document.createElement('label')
      checkboxContainer.classList.add('cdg-checkbox')
      this.checkboxElement = document.createElement('input')
      this.checkboxElement.type = 'checkbox'
      this.checkboxElement.classList.add('cdg-head-checkbox')
      this.checkboxElement.addEventListener(
        'change',
        this.handleCheckboxChange.bind(this),
      )
      checkboxContainer.appendChild(this.checkboxElement)
      container.appendChild(checkboxContainer)
      this.checkboxCellElement.appendChild(container)
      this.tableHeadRowElement.prepend(this.checkboxCellElement)
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
