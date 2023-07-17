import {CdgBaseComponent} from '../../shared/base-component'

const DISPLAY_PAGES = 3

export class CdgPagination extends CdgBaseComponent {
  static get observedAttributes() {
    return ['total', 'current-page', 'page-size', 'display-button-count']
  }

  get displayButtonCount() {
    return Number(this.getAttribute('display-button-count')) || DISPLAY_PAGES
  }

  set displayButtonCount(page) {
    this.setAttribute('display-button-count', page)
  }

  get currentPage() {
    return Number(this.getAttribute('current-page')) || 1
  }

  set currentPage(page) {
    this.setAttribute('current-page', page)
  }

  get total() {
    return Number(this.getAttribute('total')) || 0
  }

  set total(total) {
    this.setAttribute('total', total)
  }

  get pageSize() {
    return Number(this.getAttribute('page-size')) || 20
  }

  set pageSize(pageSize) {
    this.setAttribute('page-size', pageSize)
  }

  totalPage = 0
  batch = []

  pages
  btnFirstPage
  btnLastPage
  btnPrev
  btnNext
  btnMoreLeft
  btnMoreRight

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-pagination')
    this.ariaLabel = 'Page navigation'
    this.attachPagination()
  }

  attachPagination() {
    this.textContent = ''
    this.totalPage = Math.ceil(this.total / this.pageSize)

    this.btnPrev = this.createPrevButton()
    this.appendChild(this.btnPrev)

    this.btnFirstPage = this.createPageIndex(1)
    this.appendChild(this.btnFirstPage)

    this.btnMoreLeft = this.createDotButton()
    this.appendChild(this.btnMoreLeft)
    this.btnMoreLeft.addEventListener('click', this.handleMoreLeft.bind(this))

    this.pages = document.createElement('div')
    this.pages.classList.add('cdg-pagination-pages')
    this.appendChild(this.pages)

    this.btnMoreRight = this.createDotButton()
    this.appendChild(this.btnMoreRight)
    this.btnMoreRight.addEventListener('click', this.handleMoreRight.bind(this))

    this.btnLastPage = this.createPageIndex(this.totalPage)
    this.appendChild(this.btnLastPage)

    this.btnNext = this.createNextButton()
    this.appendChild(this.btnNext)

    this.updateBatch()
    this.setActiveButton(null, this.currentPage)
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'current-page':
        this.setActiveButton(Number(oldValue), Number(newValue))
        break

      case 'total':
        this.attachPagination()
        break

      default:
        break
    }
  }

  setActiveButton(oldValue, newValue) {
    const buttons = this.querySelectorAll('button')
    // Set active
    for (let button of buttons) {
      const buttonValue = Number(button.textContent)
      if (buttonValue) {
        if (buttonValue === newValue) {
          button.classList.add('active')
        } else if (oldValue && buttonValue === oldValue) {
          button.classList.remove('active')
        }
      }
    }
  }

  createPageIndex(page) {
    const button = document.createElement('button')
    button.setAttribute('aria-label', 'Page number ' + page)
    button.classList.add('cdg-button')
    button.textContent = page

    button.addEventListener('click', (event) => {
      this.handleItemClick(event, page)
    })
    return button
  }

  createDotButton() {
    const button = document.createElement('button')
    button.setAttribute('aria-label', 'More button')
    button.classList.add('cdg-button')
    button.textContent = '...'
    return button
  }

  createNavButton(name) {
    const icon = document.createElement('cdg-icon')
    icon.setAttribute('name', name)
    icon.setAttribute('size', '16')

    const button = document.createElement('button')
    button.setAttribute(
      'aria-label',
      name === 'arrowLeft' ? 'Previous page button' : 'Next page button',
    )
    button.classList.add('cdg-button')
    button.classList.add('arrow-icon')
    button.appendChild(icon)
    return button
  }

  createPrevButton() {
    const button = this.createNavButton('arrowLeft')

    button.addEventListener('click', (event) => {
      this.handleItemClick(
        event,
        this.currentPage === 1 ? 1 : this.currentPage - 1,
      )
    })

    return button
  }

  createNextButton() {
    const button = this.createNavButton('arrowRight')

    button.addEventListener('click', (event) => {
      this.handleItemClick(
        event,
        this.currentPage === this.totalPage
          ? this.totalPage
          : this.currentPage + 1,
      )
    })

    return button
  }

  attachButtonsByBatch() {
    this.pages.textContent = ''
    for (let i = 0; i < this.batch.length; i++) {
      this.pages.appendChild(this.createPageIndex(this.batch[i]))
    }
  }

  batchStartFrom() {
    const half = Math.floor(this.displayButtonCount / 2)

    let start = this.currentPage - half
    while (start < 1) {
      start += 1
    }

    while (start + half * 2 > this.totalPage) {
      start -= 1
    }

    return start
  }

  updateBatch() {
    this.batch = []
    if (this.totalPage > this.displayButtonCount) {
      const start = this.batchStartFrom()
      for (let i = 0; i < this.displayButtonCount; i++) {
        this.batch.push(start + i)
      }
    } else {
      for (let i = 1; i <= this.totalPage; i++) {
        this.batch.push(i)
      }
    }
    this.attachButtonsByBatch()
    this.updateButtonVisible()
  }

  updateButtonVisible() {
    // Prev & Next button
    if (this.totalPage <= this.displayButtonCount) {
      this.btnPrev.style.display = 'none'
      this.btnNext.style.display = 'none'
      this.btnMoreLeft.style.display = 'none'
      this.btnMoreRight.style.display = 'none'
      this.btnFirstPage.style.display = 'none'
      this.btnLastPage.style.display = 'none'
    } else {
      // More left button
      if (this.batch[0] < 3) {
        this.btnMoreLeft.style.display = 'none'
      } else {
        this.btnMoreLeft.style.display = 'inline-flex'
      }

      // Fist page button
      if (this.batch[0] > 1) {
        this.btnFirstPage.style.display = 'inline-flex'
      } else {
        this.btnFirstPage.style.display = 'none'
      }

      // More right button
      if (this.batch[this.batch.length - 1] > this.totalPage - 2) {
        this.btnMoreRight.style.display = 'none'
      } else {
        this.btnMoreRight.style.display = 'inline-flex'
      }

      // Last page button
      if (this.batch[this.batch.length - 1] < this.totalPage) {
        this.btnLastPage.style.display = 'inline-flex'
      } else {
        this.btnLastPage.style.display = 'none'
      }

      // Prev button
      if (this.currentPage === 1) {
        this.btnPrev.setAttribute('disabled', '')
      } else {
        this.btnPrev.removeAttribute('disabled')
      }

      // Prev button
      if (this.currentPage === this.totalPage) {
        this.btnNext.setAttribute('disabled', '')
      } else {
        this.btnNext.removeAttribute('disabled')
      }
    }
  }

  handleMoreLeft() {
    this.setIndex(this.currentPage - this.displayButtonCount)
  }

  handleMoreRight() {
    this.setIndex(this.currentPage + this.displayButtonCount)
  }

  handleItemClick(event, index) {
    this.setIndex(index)
  }

  setIndex(index) {
    const oldIndex = this.currentPage
    this.currentPage = index
    this.updateBatch()
    this.setActiveButton(oldIndex, this.currentPage)
    this.dispatchEvent(new CustomEvent('navigate', {detail: index}))
  }
}
