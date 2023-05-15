const checkboxTemplate = document.createElement('template')
checkboxTemplate.innerHTML = `
<label is="cdg-checkbox">
  <input type="checkbox" />
</label>
`

export class CdgTableRow extends HTMLTableRowElement {
  checkboxElement
  checkboxContainer
  index = -1
  isBelongToTableHead = false

  constructor() {
    super()
    this.attachMouseEvents()
  }

  attachMouseEvents() {
    this.addEventListener('mouseenter', () => {
      this.toggleSiblingRows(true)
    })
    this.addEventListener('mouseleave', () => {
      this.toggleSiblingRows(false)
    })
  }

  toggleSiblingRows(checked) {
    if (!this.isBelongToTableHead) {
      const siblingRows = this.getSiblingRows()
      siblingRows.forEach((row) => {
        if (checked) {
          row.classList.add('cdg-table-row-active')
        } else {
          row.classList.remove('cdg-table-row-active')
        }
      })
    }
  }

  connectedCallback() {
    this.classList.add('cdg-table-row')
    if (
      this.parentElement.classList.contains('cdg-table-body') &&
      this.parentElement.registerRow
    ) {
      this.index = Array.from(this.parentElement.children).indexOf(this)
      this.parentElement.registerRow(this, this.index)
    }
    this.isBelongToTableHead =
      this.parentElement.classList.contains('cdg-table-head')
    this.attachCheckbox()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }

  getSiblingRows() {
    return this.parentElement.querySelectorAll(
      `.cdg-table-row[cdg-data-key="${this.getAttribute('cdg-data-key')}"]`,
    )
  }

  attachCheckbox() {
    // If multiple row in thead and existed cell contains checkbox
    if (
      this.isBelongToTableHead &&
      this.parentElement.querySelector('.cdg-table-cell-checkbox')
    ) {
      const checkbox = this.parentElement.querySelector(
        '.cdg-table-cell-checkbox',
      )
      // increase rowspan for cell contains checkbox
      checkbox.setAttribute(
        'rowspan',
        `${Number(checkbox.getAttribute('rowspan')) + 1}`,
      )
      return
    }

    const siblingRows = this.getSiblingRows()
    if (siblingRows.length > 1) {
      const checkbox = siblingRows
        .item(0)
        .querySelector('.cdg-table-cell-checkbox')
      // increase rowspan for cell contains checkbox
      checkbox.setAttribute(
        'rowspan',
        `${Number(checkbox.getAttribute('rowspan')) + 1}`,
      )
      return
    }

    // Create checkbox cell and set default rowspan is 1
    const checkboxCellElement = document.createElement('td', {
      is: 'cdg-table-cell',
    })
    checkboxCellElement.classList.add(
      'cdg-table-cell',
      'cdg-table-cell-checkbox',
    )
    checkboxCellElement.setAttribute('rowspan', '1')

    const container = document.createElement('div')
    container.classList.add('cdg-table-checkbox-contaner')
    container.appendChild(checkboxTemplate.content.cloneNode(true))
    this.checkboxContainer = container.querySelector('label[is="cdg-checkbox"]')
    this.checkboxElement = this.checkboxContainer.querySelector(
      'input[type="checkbox"]',
    )
    this.checkboxElement.addEventListener(
      'change',
      this.handleCheckboxChange.bind(this),
    )
    checkboxCellElement.appendChild(container)
    this.prepend(checkboxCellElement)
  }

  check(checked) {
    if (checked) {
      this.checkboxContainer.setAttribute('checked', '')
    } else {
      this.checkboxContainer.removeAttribute('checked')
    }
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
