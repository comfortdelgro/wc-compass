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
    this.rows.forEach((row) => {
      row.checkboxElement.checked = checked
    })
  }

  createRow(rowData) {
    const row = document.createElement('cdg-table-row')
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
    const checked = event.target.checkboxElement.checked

    let isCheckAll = true
    let hasCheckedRow = false

    let i = 0
    while ((isCheckAll || !hasCheckedRow) && i < this.rows.length) {
      const row = this.rows[i]

      if (row.checkboxElement.checked) {
        hasCheckedRow = true
      }
      if (!row.checkboxElement.checked) {
        isCheckAll = false
      }

      i++
    }

    this.dispatchEvent(
      new CustomEvent('onRowCheck', {
        detail: {checked, isCheckAll, hasCheckedRow, target: event.target},
      }),
    )
  }
}
