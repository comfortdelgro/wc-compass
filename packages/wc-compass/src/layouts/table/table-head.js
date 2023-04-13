export class CdgTableHead extends HTMLElement {
  get options() {
    return this.configurations
  }

  set options(options) {
    this.configurations = options
    this.attachColumns()
  }

  checkboxElement
  headerRow

  configurations

  constructor() {
    super()
  }

  attachColumns() {
    const row = document.createElement('cdg-table-row')
    row.classList.add('cdg-table-head-row')
    if (this.options && this.options.columns) {
      this.options.columns.forEach((column) => {
        const cell = this.createHeaderCell(column)
        row.appendChild(cell)
      })
    }
    this.appendChild(row)
  }

  connectedCallback() {
    this.classList.add('cdg-table-head')
    this.setAttribute('role', 'thead')
    this.headerRow = this.querySelector('.cdg-table-head-row')
    this.headerRow.addEventListener(
      'toggleRow',
      this.handleCheckboxChange.bind(this),
    )
    if (this.parentElement.classList.contains('cdg-table')) {
      this.parentElement.registerHeader(this)
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    this[attr] = this.hasAttribute(attr)
  }

  createHeaderCell(data) {
    const cell = document.createElement('cdg-table-head-cell')

    if (data.width) {
      cell.setAttribute('width', data.width)
    }

    if (data.sortable) {
      cell.setAttribute('sortable', '')
      const sortParent = document.createElement('button')
      sortParent.classList.add('cdg-button', 'cdg-table-header-button')

      const label = document.createElement('span')
      label.textContent = data.name

      sortParent.appendChild(label)

      const arrow = document.createElement('div')
      arrow.classList.add('cdg-table-sort-arrows')
      arrow.innerHTML = `<cdg-icon
        class="cdg-table-sort-arrow asc"
        name="filledArrowUp"
        size="16"
        ></cdg-icon>
        <cdg-icon
        class="cdg-table-sort-arrow desc"
        name="filledArrowDown"
        size="16"
      ></cdg-icon>`

      sortParent.appendChild(arrow)
      cell.appendChild(sortParent)
    } else {
      cell.textContent = data.name
    }

    return cell
  }

  updateCheckboxElement() {
    if (!this.checkboxElement) {
      this.checkboxElement = this.querySelector(
        'input[type="checkbox"].cdg-cell-checkbox',
      )
    }
  }

  check(checked) {
    this.updateCheckboxElement()
    this.checkboxElement.indeterminate = false
    this.checkboxElement.checked = checked
  }

  handleRowCheck(detail) {
    this.updateCheckboxElement()
    if (detail.isCheckAll) {
      this.checkboxElement.indeterminate = false
      this.checkboxElement.checked = true
    } else if (detail.hasCheckedRow) {
      this.checkboxElement.checked = false
      this.checkboxElement.indeterminate = true
    } else {
      this.checkboxElement.indeterminate = false
      this.checkboxElement.checked = false
    }
  }

  handleCheckboxChange(event) {
    this.dispatchEvent(
      new CustomEvent('toggleAll', {
        detail: {checked: event.detail.checked},
      }),
    )
  }
}
