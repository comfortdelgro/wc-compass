import {getClosestElement} from '../../shared/dom'
import {TableSortEvent} from './model'

export class CdgTableHead extends HTMLTableSectionElement {
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
  currentSortedColumn

  constructor() {
    super()
  }

  attachColumns() {
    const row = document.createElement('tr', {is: 'cdg-table-row'})
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
    this.updateCheckboxElement()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    this[attr] = this.hasAttribute(attr)
  }

  createHeaderCell(data) {
    const cell = document.createElement('th', {is: 'cdg-table-head-cell'})

    if (data.width) {
      cell.setAttribute('width', data.width)
    }

    if (data.align) {
      cell.setAttribute('align', data.align)
    }

    if (data.colspan) {
      cell.setAttribute('colspan', data.colspan)
    }

    if (data.rowspan) {
      cell.setAttribute('rowspan', data.rowspan)
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

      const sortClassName =
        data.sortDirection === 1
          ? 'desc'
          : data.sortDirection === -1
          ? 'asc'
          : ''
      if (sortClassName) {
        cell.classList.add(sortClassName)
        this.currentSortedColumn = cell
      }
      cell.addEventListener('click', this.handleSortField.bind(this, data))
    } else {
      cell.textContent = data.name
    }

    return cell
  }

  handleSortField(data, event) {
    if (this.currentSortedColumn) {
      this.currentSortedColumn.classList.remove('asc')
      this.currentSortedColumn.classList.remove('desc')
    }

    const headCell = getClosestElement(event.target, '.cdg-table-head-cell')
    data.sortDirection =
      !data.sortDirection || data.sortDirection === -1 ? 1 : -1
    const sortClassName = data.sortDirection === 1 ? 'desc' : 'asc'
    headCell.classList.add(sortClassName)
    this.currentSortedColumn = headCell

    this.dispatchEvent(
      new CustomEvent('sort', {
        detail: new TableSortEvent(data.fieldName, data.sortDirection),
      }),
    )
  }

  updateCheckboxElement() {
    if (!this.labelCheckbox) {
      this.labelCheckbox = this.querySelector('label[is="cdg-checkbox"]')
      if (this.labelCheckbox) {
        this.checkboxElement = this.labelCheckbox.querySelector(
          'input[type="checkbox"]',
        )
      }
    }
  }

  check(checked) {
    this.updateCheckboxElement()
    this.checkboxElement.indeterminate = false
    this.checkboxElement.checked = checked
    this.labelCheckbox.removeAttribute('indeterminate')
    this.labelCheckbox.setAttribute('checked', '')
  }

  handleRowCheck(detail) {
    this.updateCheckboxElement()
    if (detail.isCheckAll) {
      this.labelCheckbox.removeAttribute('indeterminate')
      this.labelCheckbox.setAttribute('checked', '')
      this.checkboxElement.indeterminate = false
      this.checkboxElement.checked = true
    } else if (detail.hasCheckedRow) {
      this.labelCheckbox.setAttribute('indeterminate', '')
      this.labelCheckbox.removeAttribute('checked')
      this.checkboxElement.checked = false
      this.checkboxElement.indeterminate = true
    } else {
      this.labelCheckbox.removeAttribute('indeterminate')
      this.labelCheckbox.removeAttribute('checked')
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
