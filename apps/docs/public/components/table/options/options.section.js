import {CdgBaseComponent} from '../../../shared/base-component'
import {dummyData} from '../table-data'
import template from './options.section.html'

export class CdgTableOptionsSection extends CdgBaseComponent {
  checkable = false

  table
  toolbar
  pagination
  selectButton
  searchField
  startItem
  toItem
  totalItem
  filteredData = []

  currentPage = 1
  pageSize = 10

  timer

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.fillInData()
    this.listenEvents()
  }

  fillInData() {
    this.table = this.querySelector('#sampleTable')
    this.table.checkable = false
    this.table.options = {
      columns: [
        {
          name: 'ID',
          width: '80px',
          fieldName: 'id',
        },
        {
          name: 'Name',
          width: 'auto',
          fieldName: 'name',
          sortable: true,
        },
        {
          name: 'Age',
          width: '80px',
          fieldName: 'age',
          sortable: true,
        },
        {
          name: 'Sex',
          width: '140px',
          fieldName: 'gender',
        },
      ],
      onRowClick: this.onRowClick.bind(this),
    }
    this.filteredData = dummyData
    this.table.data = this.filteredData.slice(0, this.pageSize)
    this.table.addEventListener(
      'selectionChange',
      this.handleSelectionChange.bind(this),
    )
    this.table.addEventListener('sort', this.handleSort.bind(this))
  }

  listenEvents() {
    this.selectedText = this.querySelector('#selectedText')
    this.toolbar = this.querySelector('.cdg-toolbar')
    this.selectButton = this.querySelector('#selectButton')
    this.selectButton.addEventListener('click', this.toggleCheckable.bind(this))

    this.pagination = this.querySelector('cdg-pagination')
    this.pagination.addEventListener('navigate', this.handleNavigate.bind(this))

    this.searchField = this.querySelector('#searchKeyword')
    this.searchField.addEventListener('input', this.handleSearch.bind(this))

    this.startItem = this.querySelector('#startItem')
    this.toItem = this.querySelector('#toItem')
    this.totalItem = this.querySelector('#totalItem')

    this.updatePagingData()
  }

  toggleCheckable() {
    this.checkable = !this.checkable
    this.table.checkable = this.checkable
    this.selectButton.textContent = this.checkable ? 'Cancel' : 'Select'
  }

  exitSelect() {
    this.checkable = false
    this.table.checkable = this.checkable
    this.selectButton.textContent = 'Select'
  }

  updateSortDirection(sortEvent) {
    this.table.options.columns.forEach((column) => {
      if (column.fieldName === sortEvent.fieldName) {
        column.sortDirection = sortEvent.sortDirection
      } else {
        column.sortDirection = null
      }
    })
  }

  handleSort(event) {
    this.updateSortDirection(event.detail)

    const fieldName = event.detail.fieldName
    this.filteredData = this.filteredData.sort((a, b) => {
      if (event.detail.sortDirection === 1) {
        return a[fieldName] > b[fieldName]
          ? 1
          : a[fieldName] === b[fieldName]
          ? 0
          : -1
      } else {
        return a[fieldName] < b[fieldName]
          ? 1
          : a[fieldName] === b[fieldName]
          ? 0
          : -1
      }
    })

    this.currentPage = 1
    this.pagination.setAttribute('current-page', this.currentPage)
    this.table.data = this.filteredData.slice(0, this.pageSize)
    this.updatePagingData()
  }

  handleSelectionChange(event) {
    if (event.detail.hasCheckedRow) {
      this.toolbar.classList.add('selected')
      this.selectedText.textContent = 'Selected ' + event.detail.selected.length
    } else {
      this.toolbar.classList.remove('selected')
      this.selectedText.textContent = ''
    }
  }

  handleNavigate(event) {
    this.exitSelect()
    this.currentPage = event.detail
    this.table.data = this.filteredData.slice(
      this.currentPage * this.pageSize - this.pageSize,
      this.currentPage * this.pageSize,
    )
    this.updatePagingData()
  }

  handleSearch(event) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      const keyword = event.target.value.toLowerCase().trim()
      this.filteredData = dummyData.filter((item) => {
        return item.name.toLowerCase().includes(keyword)
      })
      this.currentPage = 1
      this.pagination.setAttribute('current-page', this.currentPage)
      this.table.data = this.filteredData.slice(0, this.pageSize)
      this.updatePagingData()
    }, 500)
  }

  onRowClick(event, data) {
    cdgToastService.toast('Clicked on: ' + data.name)
  }

  updatePagingData() {
    this.startItem.textContent =
      this.currentPage * this.pageSize - this.pageSize
    this.toItem.textContent = this.currentPage * this.pageSize
    this.totalItem.textContent = this.filteredData.length
    this.pagination.setAttribute('total', this.filteredData.length)
  }
}
