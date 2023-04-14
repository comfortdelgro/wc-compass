import {TableSelectionChangeEvent, TableSelectionRow} from './model'

export class CdgTableBody extends HTMLElement {
  get data() {
    return this.dataSource
  }

  set data(data) {
    this.dataSource = data
    if (data && data.length) {
      this.displayData()
    }
  }

  get options() {
    return this.configurations
  }

  set options(options) {
    this.configurations = options
  }

  configurations
  dataSource
  rows = []

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-table-body')
    this.setAttribute('role', 'tbody')
    if (this.parentElement.classList.contains('cdg-table')) {
      this.parentElement.registerBody(this)
    }
  }

  registerRow(row, at) {
    row.addEventListener('toggleRow', this.handleCheckboxChange.bind(this))
    this.rows[at] = row
  }

  unregisterRow(index) {
    this.rows.splice(index, 1)
  }

  displayData() {
    this.data.forEach((row) => {
      this.appendChild(this.createRow(row))
    })
  }

  toggleAll(checked) {
    const selectedRows = []
    this.rows.forEach((row, index) => {
      if (checked) {
        selectedRows.push(
          new TableSelectionRow(
            index,
            row,
            (this.data && this.data[index]) || null,
          ),
        )
      }
      row.checkboxElement.checked = checked
    })

    this.dispatchEvent(
      new CustomEvent('onRowCheck', {
        detail: new TableSelectionChangeEvent(checked, checked, selectedRows),
      }),
    )
  }

  createRow(rowData) {
    const row = document.createElement('cdg-table-row')

    // Add row click callback
    if (this.options && this.options.onRowClick) {
      row.addEventListener('click', (event) => {
        if (event.target.tagName !== 'INPUT') {
          this.options.onRowClick(event, rowData)
        }
      })
    }
    if (this.options && this.options.columns) {
      const columns = this.options.columns
      columns.forEach((column) => {
        const cell = this.createCell(rowData[column.fieldName])
        row.appendChild(cell)
      })
    } else {
      const item = this.data[0]
      Object.keys(item).forEach((name) => {
        const cell = this.createCell(rowData[name])
        row.appendChild(cell)
      })
    }
    return row
  }

  createCell(data) {
    const cell = document.createElement('cdg-table-cell')
    cell.innerHTML = data

    return cell
  }

  handleCheckboxChange(event) {
    const selectedRows = []

    let isCheckAll = true
    let hasCheckedRow = false

    let i = 0
    this.rows.forEach((row, index) => {
      if (row.checkboxElement.checked) {
        hasCheckedRow = true
        selectedRows.push(
          new TableSelectionRow(
            index,
            row,
            (this.data && this.data[index]) || null,
          ),
        )
      }
      if (!row.checkboxElement.checked) {
        isCheckAll = false
      }
    })

    this.dispatchEvent(
      new CustomEvent('onRowCheck', {
        detail: new TableSelectionChangeEvent(
          isCheckAll,
          hasCheckedRow,
          selectedRows,
        ),
      }),
    )
  }
}
