export class CdgTable extends HTMLElement {
  static get observedAttributes() {
    return ['checkable']
  }

  get checkable() {
    return this.hasAttribute('checkable')
  }

  set checkable(value) {
    if (value) {
      this.setAttribute('checkable', '')
      this.tableHeadElement.setAttribute('checkable', '')
      this.tableBodyElement.setAttribute('checkable', '')
    } else {
      this.removeAttribute('checkable')
      this.tableHeadElement.removeAttribute('checkable', '')
      this.tableBodyElement.removeAttribute('checkable', '')
    }
  }

  static get observedAttributes() {
    return ['checkable']
  }

  tableToolbar
  tableFooter
  tableContainerElement
  tableHeadElement
  tableBodyElement
  checkboxes

  constructor() {
    super()

    this.createTableContent()
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'checkable':
        if (!this.tableBodyElement || !this.tableBodyElement) {
          break
        }

        console.log(this.checkable)
        if (this.checkable) {
          this.tableHeadElement.setAttribute('checkable', '')
          this.tableBodyElement.setAttribute('checkable', '')
        } else {
          this.tableHeadElement.removeAttribute('checkable', '')
          this.tableBodyElement.removeAttribute('checkable', '')
        }
        break
      default:
        break
    }
  }

  createTableContent() {
    this.tableToolbar = this.querySelector('[cdg-table-toolbar]')
    this.tableFooter = this.querySelector('[cdg-table-footer]')
    // this.tableContainerElement = document.createElement('div')
    // this.tableContainerElement.classList.add('cdg-table-container')
    this.tableHeadElement = this.querySelector('cdg-table-head')
    if (this.tableHeadElement) {
      this.tableHeadElement.addEventListener(
        'onCheckAll',
        this.checkAll.bind(this),
      )
      this.appendChild(this.tableHeadElement)
    }
    this.tableBodyElement = this.querySelector('cdg-table-body')
    if (this.tableBodyElement) {
      this.tableBodyElement.addEventListener(
        'onRowCheck',
        this.handleTableBodyRowCheck.bind(this),
      )
      this.appendChild(this.tableBodyElement)
    }
    // this.appendChild(this.tableContainerElement)
    if (this.tableFooter) {
      this.appendChild(this.tableFooter)
    }
  }

  handleTableBodyRowCheck(event) {
    const tableRows = this.tableBodyElement.querySelectorAll('cdg-table-row')
    let isCheckAll = true
    let hasCheckedRow = false
    for (let index = 0; index < tableRows.length; index++) {
      const tableRow = tableRows.item(index)
      const tableRowCheckbox = tableRow.querySelector(
        'input[type="checkbox"].cdg-cell-checkbox',
      )
      if (!tableRowCheckbox.checked) {
        isCheckAll = false
      } else {
        hasCheckedRow = true
      }
      // Stop loop
      if (!isCheckAll && hasCheckedRow) {
        break
      }
    }

    const checkboxTableHead = this.tableHeadElement.querySelector(
      'input[type="checkbox"].cdg-head-checkbox',
    )
    if (hasCheckedRow) {
      if (!isCheckAll) {
        checkboxTableHead.indeterminate = true
        checkboxTableHead.checked = false
      } else {
        checkboxTableHead.indeterminate = false
        checkboxTableHead.checked = true
      }
    } else {
      checkboxTableHead.indeterminate = false
      checkboxTableHead.checked = false
    }

    this.dispatchEvent(
      new CustomEvent('toggleSelectRow', {detail: event.detail}),
    )
  }

  checkAll(event) {
    const checked = !!event.detail.checked
    const checkboxes = this.tableBodyElement.querySelectorAll(
      'input[type="checkbox"].cdg-cell-checkbox',
    )
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked
      checkbox.dispatchEvent(new Event('change', {bubbles: false}))
    })

    this.dispatchEvent(new CustomEvent('toggleSelectAll', {detail: checked}))
  }

  connectedCallback() {
    this.classList.add('cdg-table')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }
}
