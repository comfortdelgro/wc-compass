export class CdgTableBody extends HTMLElement {
  get checkable() {
    return this.hasAttribute('checkable')
  }

  set checkable(value) {
    if (value) {
      const rows = this.querySelectorAll('cdg-table-row')
      for (let index = 0; index < rows.length; index++) {
        const row = rows.item(index)
        this.createCheckboxCell(row)
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

  createCheckboxCell(tableHeadRowElement) {
    if (!this.checkboxCellElement) {
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
      checkboxElement.addEventListener('change', (event) =>
        this.handleCheckboxChange(tableHeadRowElement, event),
      )
      container.appendChild(checkboxContainer)
      checkboxCellElement.appendChild(container)
      tableHeadRowElement.prepend(checkboxCellElement)
    }
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
