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
      this.appendChild(this.createRow(row, index))
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
      if (checked) {
        row.checkboxContainer.setAttribute('checked', '')
      } else {
        row.checkboxContainer.removeAttribute('checked')
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
    if (this.options && this.options.columns) {
      const columns = this.options.columns
      columns.forEach((column) => {
        if (typeof rowData[column.fieldName] === 'object') {
          const childTable = document.createElement('table', {is: 'cdg-table'})
          childTable.data = rowData[column.fieldName]
          row.appendChild(childTable)
        } else {
          const cell = this.createCell(rowData[column.fieldName])
          if (column.align) {
            cell.setAttribute('align', column.align)
          }
          if (column.editable) {
            cell.setAttribute('data-field', column.fieldName)
            if (column.colummTemplate) {
              cell.classList.add('editable-template')

              // cell.addEventListener(
              //   'click',
              //   this.appendTemplateToCell.bind(this, column.colummTemplate),
              // )
            } else {
              cell.setAttribute('editable', '')
              cell.classList.add('editable')
              cell.addEventListener(
                'click',
                this.handleEditableCellClick.bind(this, rowData, rowIndex),
              )
            }
          }
          row.appendChild(cell)
        }
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
    const cell = document.createElement('td', {is: 'cdg-table-cell'})
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
