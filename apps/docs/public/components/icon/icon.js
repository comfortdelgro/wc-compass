import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'
import {CdgDocumentComponent} from '../../shared/document-component'
import {iconList} from './icon-list'
import template from './icon.html'

import {IconSample} from './icon-sample'
customElements.define('icon-sample', IconSample)

export class CdgIconDemo extends CdgDocumentComponent {
  pageIndex = 1
  pageSize = 30
  loop
  keyword = ''
  pagination
  filteredData = []
  displayData = []
  dataInfo
  searchIcon
  inputKeyword

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.inputKeyword = this.querySelector('#search-icon')
    this.searchIcon = this.querySelector('#search-icon+cdg-icon')
    this.pagination = this.querySelector('#pagination')
    this.dataInfo = this.querySelector('#displayedRows')

    this.inputKeyword.addEventListener('input', this.updateSearch.bind(this))
    this.searchIcon.addEventListener('click', this.clearKeyword.bind(this))

    this.pagination.addEventListener('navigate', (event) => {
      this.pageIndex = event.detail
      this.renderIcon()
    })

    this.renderIcon()
  }

  updateSearch() {
    this.keyword = this.inputKeyword.value
    this.pageIndex = 1
    this.renderIcon()
    this.searchIcon.name = !this.keyword ? 'search' : 'crossCircle'
  }

  clearKeyword() {
    if (!this.keyword) {
      return
    }
    this.keyword = ''
    this.inputKeyword.value = ''
    this.updateSearch()
  }

  renderIcon() {
    if (!this.loop) {
      const iconGrid = this.querySelector('#icon-grid')
      this.loop = new CdgLoop(iconGrid)
    }

    this.filteredData = iconList.filter((icon) => {
      if (icon.toLowerCase().includes(this.keyword)) {
        return icon
      }
    })

    this.displayData = this.filteredData.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize,
    )
    this.loop.loop(this.displayData)
    this.updatePagination()
  }

  updatePagination() {
    this.pagination.pageSize = this.pageSize
    this.pagination.total = this.filteredData.length

    let start = (this.pageIndex - 1) * this.pageSize
    start = start ? start : start < 0 ? 0 : 1

    let end = this.pageIndex * this.pageSize
    end = end > this.filteredData.length ? this.filteredData.length : end

    this.dataInfo.textContent = `Showing ${
      (this.pageIndex - 1) * this.pageSize || 1
    } - ${end} out of ${this.filteredData.length}`
  }
}
