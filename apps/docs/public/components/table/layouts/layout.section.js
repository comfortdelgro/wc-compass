import {CdgBaseComponent} from '../../../shared/base-component'
import {dummyData} from '../table-data'
import template from './layout.section.html'

export class CdgTableLayoutSection extends CdgBaseComponent {
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
    this.tableElement = this.querySelector('cdg-info-table')
    this.tableBody = this.tableElement.querySelector('cdg-table-body')
    this.paginationElement = this.querySelector('cdg-pagination')
    this.pageSizeDropdown = this.querySelector('#pageSizeDropdown')
    this.displayedRows = this.querySelector('#displayedRows')

    dummyData
      .slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize,
      )
      .forEach((data) => {
        const row = this.createRow(data)
        this.tableBody.append(row.content.cloneNode(true))
      })

    if (this.pageSizeDropdown) {
      this.pageSizeDropdown.addEventListener('onchangevalue', (event) => {
        this.pageSize = Number(event.detail)
        this.renderNewRows(this.pageIndex, this.pageSize)
      })
    }

    if (this.paginationElement) {
      this.paginationElement.addEventListener('navigate', (event) => {
        this.pageIndex = Number(event.detail)
        this.renderNewRows(this.pageIndex, this.pageSize)
      })
    }
  }

  createRow(data) {
    const rowTemplate = document.createElement('template')
    rowTemplate.innerHTML = `
            <cdg-table-row class="cdg-table-row" checkable>
                <cdg-table-cell>${data.id}</cdg-table-cell>
                <cdg-table-cell>${data.name}</cdg-table-cell>
                <cdg-table-cell>${data.age}</cdg-table-cell>
                <cdg-table-cell>${data.gender}</cdg-table-cell>
            </cdg-table-row>
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
