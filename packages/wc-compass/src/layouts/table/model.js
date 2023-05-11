export class TableSelectionRow {
  index = -1
  element
  data
  constructor(index = -1, row = {}, data = {}) {
    this.index = index
    this.row = row
    this.data = data
  }
}

export class TableSelectionEvent {
  isCheckAll = false
  hasCheckedRow = false
  selected = []

  constructor(isCheckAll = false, hasCheckedRow = false, selected = []) {
    this.isCheckAll = isCheckAll
    this.hasCheckedRow = hasCheckedRow
    this.selected = selected
  }
}

export class TableSortEvent {
  fieldName
  sortDirection
  constructor(fieldName, sortDirection) {
    this.fieldName = fieldName
    this.sortDirection = sortDirection
  }
}

export class TableOptions {
  columns = []
  onRowClick
  onRowChange
}

export class TableColumnOption {
  name = ''
  width = 'auto'
  align = ''
  fieldName = ''
  scrollable = false
  sortDirection = null
  editable = false
  colummTemplate = null
}
