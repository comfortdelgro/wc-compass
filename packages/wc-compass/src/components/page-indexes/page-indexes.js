export class CdgPageIndexes extends HTMLElement {
  get scrollContent() {
    return this.getAttribute('scroll-content')
  }

  set scrollContent(host) {
    this.setAttribute('scroll-content', host)
  }

  get offset() {
    return Number(this.getAttribute('offset')) || 0
  }

  set offset(offset) {
    this.setAttribute('offset', offset)
  }

  hostElement
  container
  indexes
  wrapper

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-page-indexes')
  }

  registerTableContent(element) {
    this.textContent = ''
    this.indexes = []
    this.hostElement = document.querySelector(this.scrollContent)
    this.container = element
    this.indexes = Array.from(
      this.container.querySelectorAll('[pageindexitem]'),
    )
    this.renderIndexes()
  }

  renderIndexes() {
    this.wrapper = document.createElement('ul')
    if (this.indexes && this.indexes.length) {
      this.indexes.forEach((item) => {
        const itemElement = this.createListViewItem(item)
        this.wrapper.appendChild(itemElement)
      })
    }
    this.appendChild(this.wrapper)
  }

  createListViewItem(item) {
    const itemWrapper = document.createElement('li')
    const itemLink = document.createElement('div')
    itemLink.classList.add('cdg-page-index-item')
    itemLink.addEventListener('click', this.handleItemClick.bind(this, item))
    itemLink.textContent = item.getAttribute('pageIndexItem')
    itemWrapper.appendChild(itemLink)

    return itemWrapper
  }

  handleItemClick(item) {
    if (this.hostElement) {
      this.hostElement.scrollTop = item.offsetTop - this.offset
    } else {
      console.error(
        'Could not get the scroll content element, please setup scroll content element selector',
      )
    }
  }
}
