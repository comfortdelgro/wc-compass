export class CdgInfoTable extends HTMLElement {
  get data() {
    return this.source
  }

  set data(data) {
    this.source = data
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

  source
  configurations

  header
  body

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-info-table')
    this.classList.add('cdg-table')
  }

  displayData() {
    // Let's clean everything
    this.textContent = ''
    this.attachHeader()
    this.attachBody()
  }

  createHeaderCell(name) {
    const cell = document.createElement('cdg-table-head-cell')
    cell.textContent = name

    return cell
  }

  attachHeader() {
    this.header = document.createElement('cdg-table-head')

    const headerRow = document.createElement('cdg-table-row')
    headerRow.classList.add('cdg-table-head-row')

    if (this.options) {
      this.options.columns.forEach((column) => {
        const cell = this.createHeaderCell(column.name)
        if (column.width) {
          cell.setAttribute('width', column.width)
        }
        headerRow.appendChild(cell)
      })
    } else {
      // Auto generate column title from object keys
      const item = this.data[0]
      Object.keys(item).forEach((name) => {
        headerRow.appendChild(this.createHeaderCell(name))
      })
    }

    this.header.appendChild(headerRow)
    this.appendChild(this.header)
  }

  attachBody() {
    this.body = document.createElement('cdg-table-body')
    this.data.forEach((row) => {
      const rowElement = this.createRow(row)
      this.body.appendChild(rowElement)
    })
    this.appendChild(this.body)
  }

  createCell(data) {
    const cell = document.createElement('cdg-table-cell')
    cell.innerHTML = data

    return cell
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
}
