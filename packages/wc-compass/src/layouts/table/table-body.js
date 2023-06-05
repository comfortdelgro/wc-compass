import {resolveObject} from '../../shared/utilities'
import {TableSelectionEvent, TableSelectionRow} from './model'

export class CdgTableBody extends HTMLTableSectionElement {
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
    return this.configurations || {}
  }

  set options(options) {
    this.configurations = options
    if (this.configurations.bodyClass) {
      this.classList.add(...this.configurations.bodyClass)
    }
  }

  configurations
  dataSource
  rows = []

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-table-body')
    this.setAttribute('role', 'rowgroup')
    if (this.parentElement.classList.contains('cdg-table')) {
      this.parentElement.registerBody(this)
    }
  }

  registerRow(row, at) {
    row.addEventListener('toggleRow', this.handleCheckboxChange.bind(this))

    // Add row click callback
    if (this.options && this.options.onRowClick) {
      row.addEventListener('click', (event) => {
        if (event.target.tagName !== 'INPUT') {
          this.options.onRowClick(event, this.data[at])
        }
      })
    }

    this.rows[at] = row
  }

  unregisterRow(index) {
    this.rows.splice(index, 1)
  }

  displayData() {
    this.data.forEach((row, index) => {
      this.createRow(row, index)
    })
  }

  toggleAll(checked) {
    const selectedRows = []
    this.rows.forEach((row, index) => {
      if (row.checkboxElement) {
        row.checkboxElement.checked = checked
      }
      if (checked) {
        selectedRows.push(
          new TableSelectionRow(
            index,
            row,
            (this.data && this.data[index]) || null,
          ),
        )
        row.setAttribute('checked', '')
        row.classList.add('cdg-table-row-checked')
        if (row.checkboxContainer) {
          row.checkboxContainer.setAttribute('checked', '')
        }
      } else {
        row.removeAttribute('checked')
        row.classList.remove('cdg-table-row-checked')
        if (row.checkboxContainer) {
          row.checkboxContainer.removeAttribute('checked')
        }
      }
    })

    this.dispatchEvent(
      new CustomEvent('onRowCheck', {
        detail: new TableSelectionEvent(checked, checked, selectedRows),
      }),
    )
  }

  createRow(rowData, rowIndex) {
    const row = document.createElement('tr', {is: 'cdg-table-row'})
    if (this.options) {
      // Have settings for table body
      if (this.options.bodyColumns) {
        const rowKey = `cdg-table-row-${rowData.key || rowData.id}`
        row.classList.add(rowKey)
        row.setAttribute('cdg-data-key', rowKey)
        this.renderColumnsWithOptionsBody(
          rowData,
          this.options.bodyColumns,
          row,
          rowKey,
          rowIndex,
          0,
        )
        return
      } else if (this.options.columns) {
        this.renderColumns(rowData, this.options.columns, row, rowIndex)
      }
    } else {
      const item = this.data[0]
      Object.keys(item).forEach((name) => {
        const cell = this.createCell(rowData[name])
        row.appendChild(cell)
      })
    }
    this.appendChild(row)
  }

  renderColumnsWithOptionsBody(rowData, columns, row, rowKey, rowIndex, level) {
    if (!this.contains(row)) {
      this.appendChild(row)
    }
    columns.forEach((column) => {
      const cell = this.createCell(
        resolveObject(rowData, column.fieldName),
        rowData,
        rowIndex,
        column,
        true,
      )
      row.appendChild(cell)
      if (column.columns) {
        const tableRow = this.querySelectorAll(rowKey)
        let newRow = tableRow.item(level + 1)
        if (!newRow) {
          newRow = document.createElement('tr', {is: 'cdg-table-row'})
          newRow.classList.add(rowKey)
          newRow.setAttribute('cdg-data-key', rowKey)
        }
        this.renderColumnsWithOptionsBody(
          rowData,
          column.columns,
          newRow,
          rowIndex,
          level + 1,
        )
      }
    })
  }

  renderColumns(rowData, columns, row, rowIndex) {
    columns.forEach((column) => {
      if (column.columns) {
        this.renderColumns(rowData, column.columns, row, rowIndex)
      } else {
        let cell
        if (column.table) {
          cell = this.createTableInCell(
            column.table,
            resolveObject(rowData, column.fieldName),
          )
        } else {
          cell = this.createCell(
            resolveObject(rowData, column.fieldName),
            rowData,
            rowIndex,
            column,
          )
        }
        row.appendChild(cell)
      }
    })
  }

  createTableInCell(tableSetting, tableData) {
    const cell = document.createElement('td', {is: 'cdg-table-cell'})
    const table = document.createElement('table', {is: 'cdg-table'})
    if (tableSetting.checkable) {
      table.setAttribute('checkable', '')
    }
    table.options = tableSetting
    table.data = tableData

    cell.appendChild(table)

    if (tableSetting.width) {
      cell.setAttribute('width', tableSetting.width)
    }
    if (tableSetting.colspan) {
      cell.setAttribute('colspan', tableSetting.colspan)
    }
    if (tableSetting.rowspan) {
      cell.setAttribute('rowspan', tableSetting.rowspan)
    }

    return cell
  }

  createCell(data, rowData, rowIndex, column, withColSetting = false) {
    const cell = document.createElement('td', {is: 'cdg-table-cell'})
    cell.innerHTML = data

    if (column.align) {
      cell.setAttribute('align', column.align)
    }

    if (withColSetting) {
      if (column.width) {
        cell.setAttribute('width', column.width)
      }
      if (column.colspan) {
        cell.setAttribute('colspan', column.colspan)
      }
      if (column.rowspan) {
        cell.setAttribute('rowspan', column.rowspan)
      }
    }
    if (column.colummTemplate) {
      cell.style.position = 'relative'
      cell.classList.add('editable-cell')
      cell.addEventListener('click', (e) => {
        if (cell.querySelector('.cdg-table-editable-cell') !== null) {
          return
        } else {
          cell.appendChild(column.colummTemplate)
          this.dispatchEvent(
            new CustomEvent('onEditCellStart', {
              detail: {
                index: rowIndex,
                value: rowData[column.fieldName],
                column: column.fieldName,
              },
            }),
          )
        }
      })
    }
    return cell
  }

  handleCheckboxChange(event) {
    const selectedRows = []

    let isCheckAll = true
    let hasCheckedRow = false

    const siblingRows = this.parentElement.querySelectorAll(
      `.cdg-table-row[cdg-data-key="${event.target.getAttribute(
        'cdg-data-key',
      )}"]`,
    )
    siblingRows.forEach((row) => {
      if (event.detail.checked) {
        row.setAttribute('checked', '')
        row.classList.add('cdg-table-row-checked')
      } else {
        row.removeAttribute('checked')
        row.classList.remove('cdg-table-row-checked')
      }
    })
    // Remove checked attribute for clicked row
    if (event.detail.checked) {
      event.target.classList.add('cdg-table-row-checked')
      event.target.setAttribute('checked', '')
    } else {
      event.target.classList.remove('cdg-table-row-checked')
      event.target.removeAttribute('checked')
    }
    this.rows.forEach((row, index) => {
      if (!row.checkboxElement) {
        return
      }
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
        detail: new TableSelectionEvent(
          isCheckAll,
          hasCheckedRow,
          selectedRows,
        ),
      }),
    )
  }
}
