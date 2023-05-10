const checkboxTemplate = document.createElement('template')
checkboxTemplate.innerHTML = `
<label is="cdg-checkbox">
  <input type="checkbox" />
</label>
`

export class CdgTableRow extends HTMLTableRowElement {
  checkboxElement
  checkboxContainer
  index = -1

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-table-row')
    this.setAttribute('role', 'tr')
    this.attachCheckbox()
    if (
      this.parentElement.classList.contains('cdg-table-body') &&
      this.parentElement.registerRow
    ) {
      this.index = Array.from(this.parentElement.children).indexOf(this)
      this.parentElement.registerRow(this, this.index)
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = this.hasAttribute(attr)
  }

  attachCheckbox() {
    const checkboxCellElement = document.createElement('td', {
      is: 'cdg-table-cell',
    })
    checkboxCellElement.classList.add(
      'cdg-table-cell',
      'cdg-table-cell-checkbox',
    )
    const container = document.createElement('div')
    container.classList.add('cdg-table-checkbox-contaner')
    container.appendChild(checkboxTemplate.content.cloneNode(true))
    this.checkboxContainer = container.querySelector('label[is="cdg-checkbox"]')
    this.checkboxElement = this.checkboxContainer.querySelector(
      'input[type="checkbox"]',
    )
    this.checkboxElement.addEventListener(
      'change',
      this.handleCheckboxChange.bind(this),
    )
    checkboxCellElement.appendChild(container)
    this.prepend(checkboxCellElement)
  }

  check(checked) {
    if (checked) {
      this.checkboxContainer.setAttribute('checked', '')
    } else {
      this.checkboxContainer.removeAttribute('checked')
    }
    this.checkboxElement.checked = checked
  }

  handleCheckboxChange(event) {
    this.dispatchEvent(
      new CustomEvent('toggleRow', {
        detail: {checked: event.target.checked},
      }),
    )
  }
}
