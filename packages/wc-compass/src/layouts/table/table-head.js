export class CdgTableHead extends HTMLElement {
  checkboxElement
  headerRow

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-table-head')
    this.setAttribute('role', 'thead')
    this.headerRow = this.querySelector('.cdg-table-head-row')
    this.headerRow.addEventListener(
      'toggleRow',
      this.handleCheckboxChange.bind(this),
    )
    if (this.parentElement.classList.contains('cdg-info-table')) {
      this.parentElement.registerHeader(this)
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    this[attr] = this.hasAttribute(attr)
  }

  updateCheckboxElement() {
    if (!this.checkboxElement) {
      this.checkboxElement = this.querySelector(
        'input[type="checkbox"].cdg-cell-checkbox',
      )
    }
  }

  check(checked) {
    this.updateCheckboxElement()
    this.checkboxElement.indeterminate = false
    this.checkboxElement.checked = checked
  }

  handleRowCheck(detail) {
    this.updateCheckboxElement()
    if (detail.isCheckAll) {
      this.checkboxElement.indeterminate = false
      this.checkboxElement.checked = true
    } else if (detail.hasCheckedRow) {
      this.checkboxElement.checked = false
      this.checkboxElement.indeterminate = true
    } else {
      this.checkboxElement.indeterminate = false
      this.checkboxElement.checked = false
    }
  }

  handleCheckboxChange(event) {
    this.dispatchEvent(
      new CustomEvent('toggleAll', {
        detail: {checked: event.detail.checked},
      }),
    )
  }
}
