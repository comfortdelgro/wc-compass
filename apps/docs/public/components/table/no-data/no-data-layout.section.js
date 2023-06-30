import {CdgBaseComponent} from '../../../shared/base-component'
import {dummyData} from '../table-data'
import template from './no-data-layout.section.html'

export class CdgNoDataTableLayoutSection extends CdgBaseComponent {
  tableElement
  tableBody
  paginationElement
  pageSizeDropdown
  displayedRows

  pageIndex = 1
  pageSize = 10

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.tableElement = this.querySelector('table[is="cdg-table"]')
    this.tableBody = this.tableElement.querySelector('.cdg-table-body')
    this.paginationElement = this.querySelector('cdg-pagination')
    this.pageSizeDropdown = this.querySelector('#pageSizeDropdown')
    this.displayedRows = this.querySelector('#displayedRows')

    // dummyData
    //   .slice(
    //     (this.pageIndex - 1) * this.pageSize,
    //     this.pageIndex * this.pageSize,
    //   )
    //   .forEach((data) => {
    //     const row = this.createRow(data)
    //     this.tableBody.append(row.content.cloneNode(true))
    //   })

    // if (this.pageSizeDropdown) {
    //   this.pageSizeDropdown.addEventListener('onchangevalue', (event) => {
    //     this.pageSize = Number(event.detail)
    //     this.renderNewRows(this.pageIndex, this.pageSize)
    //   })
    // }

    // if (this.paginationElement) {
    //   this.paginationElement.addEventListener('navigate', (event) => {
    //     this.pageIndex = Number(event.detail)
    //     this.renderNewRows(this.pageIndex, this.pageSize)
    //   })
    // }
  }

  createRow(data) {
    const rowTemplate = document.createElement('template')
    rowTemplate.innerHTML = `
            <tr is="cdg-table-row" checkable>
                <td is="cdg-table-cell">${data.id}</td>
                <td is="cdg-table-cell">${data.name}</td>
                <td is="cdg-table-cell">${data.age}</td>
                <td is="cdg-table-cell">${data.gender}</td>
            </tr>
        `
    return rowTemplate
  }

  renderNewRows(pageIndex, pageSize) {
    this.tableBody.innerHTML = ''
    this.paginationElement.setAttribute('page-size', pageSize)
    this.paginationElement.setAttribute('current-page', pageIndex)
    this.displayedRows.innerHTML = `Showing ${
      pageIndex * pageSize - pageSize + 1
    } - ${pageIndex * pageSize} out of ${dummyData.length}`
    dummyData
      .slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      .forEach((data) => {
        const row = this.createRow(data)
        this.tableBody.append(row.content.cloneNode(true))
      })
  }
}
