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
    this.setAttribute('role', 'tbody')
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
        const cell = this.createCell(
          resolveObject(rowData, column.fieldName),
          rowData,
          rowIndex,
          column,
        )
        row.appendChild(cell)
      }
    })
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

    if (column.editable) {
      cell.setAttribute('data-field', column.fieldName)
      if (column.colummTemplate) {
        cell.classList.add('editable-template')
      } else {
        cell.setAttribute('editable', '')
        cell.classList.add('editable')
        cell.addEventListener(
          'click',
          this.handleEditableCellClick.bind(this, rowData, rowIndex),
        )
      }
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

  handleEditableCellClick(rowData, rowIndex, event) {
    const cell = event.target.closest('.editable')
    if (cell) {
      if (cell.querySelector('input') !== null) {
        return
      } else {
        const input = document.createElement('input')
        input.classList.add('cdg-input')
        input.value = cell.textContent
        input.addEventListener('blur', (event) => {
          const row = cell.parentNode
          const cells = Array.from(row.querySelectorAll('.editable'))
          const newData = {...rowData}
          cells.forEach((cell) => {
            const key = cell.getAttribute('data-field')
            newData[key] = input.value
          })
          cell.textContent = input.value
          if (this.options.onRowChange) {
            this.options.onRowChange(event, {
              oldValue: rowData,
              newValue: newData,
              rowIndex,
            })
          }
        })
        cell.textContent = ''
        cell.appendChild(input)
        input.focus()
      }
    }
  }

  appendTemplateToCell(template, event) {
    const cell = event.target.closest('.editable-template')
    if (cell) {
      if (cell.querySelector('template') !== null) {
        return
      } else {
        cell.textContent = ''
        cell.appendChild(template.content.cloneNode(true))
      }
    }
  }
}
