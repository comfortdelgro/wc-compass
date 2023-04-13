export class CdgTable extends HTMLElement {
  static get observedAttributes() {
    return ['checkable']
  }

  get data() {
    return this.source
  }

  set data(data) {
    this.source = data
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

  get checkable() {
    return this.hasAttribute('checkable')
  }

  set checkable(checkable) {
    if (checkable) {
      this.setAttribute('checkable', '')
    } else {
      this.removeAttribute('checkable')
    }
  }

  source
  configurations

  header
  body

  constructor() {
    super()
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'checkable':
        if (!this.checkable) {
          this.body.toggleAll(false)
          this.header.check(false)
          this.dispatchEvent(
            new CustomEvent('selectionChange', {
              detail: {
                checked: false,
                isCheckAll: false,
                hasCheckedRow: false,
              },
            }),
          )
        }
        break

      default:
        break
    }
  }

  connectedCallback() {
    this.classList.add('cdg-table')
  }

  displayData() {
    // Let's clean everything
    this.textContent = ''
    this.attachHeader()
    this.attachBody()
  }

  registerHeader(header) {
    if (!this.header) {
      this.header = header
      this.header.addEventListener('toggleAll', this.handleToggleAll.bind(this))
    }
  }

  registerBody(body) {
    if (!this.body) {
      this.body = body
      this.body.addEventListener('onRowCheck', this.handleRowCheck.bind(this))
    }
  }

  attachHeader() {
    this.header = document.createElement('cdg-table-head')

    if (!this.options) {
      // Auto generate column title from object keys
      this.options = {
        columns: [],
      }
      const item = this.data[0]
      Object.keys(item).forEach((name) => {
        this.options.columns.push({
          name,
          width: 'auto',
          fieldName: name,
          sortable: false,
        })
      })
    }
    this.header.options = this.options
    this.header.addEventListener('toggleAll', this.handleToggleAll.bind(this))

    this.appendChild(this.header)
  }

  attachBody() {
    this.body = document.createElement('cdg-table-body')
    this.body.addEventListener('onRowCheck', this.handleRowCheck.bind(this))
    this.body.data = this.data

    this.appendChild(this.body)
  }

  handleToggleAll(event) {
    this.body.toggleAll(event.detail.checked)
    this.dispatchEvent(new CustomEvent('toggleAll', {detail: event.detail}))

    this.dispatchEvent(
      new CustomEvent('selectionChange', {
        detail: {
          checked: event.detail.checked,
          isCheckAll: event.detail.checked,
          hasCheckedRow: event.detail.checked,
        },
      }),
    )
  }

  handleRowCheck(event) {
    this.header.handleRowCheck(event.detail)
    this.dispatchEvent(
      new CustomEvent('selectionChange', {detail: event.detail}),
    )
  }
}
