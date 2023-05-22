import {CONTENT_MAP} from '../../constants/content-map'
import {DOCUMENT_CONTENT} from '../../constants/document-content'
import {CdgBaseComponent} from '../../shared/base-component'
import {findParentMenu} from '../../shared/menu'
import template from './container.html'

const NO_TABLE_OF_CONTENT = [
  'theming',
  'layoutsAndControls',
  'zIndex',
  'customization',
  'layouts',
  'article',
  'newsAndBlogs',
  'services',
  'dashboardTemplate',
]

export class CdgDemoContainer extends CdgBaseComponent {
  pageHeader
  currentPage
  subTitle
  pageTitle
  subpage
  content
  subNav

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.classList.add('page-container')
    this.pageHeader = this.querySelector('cdg-page-header')
    this.content = this.querySelector('#component-content')

    this.pageTitle = this.querySelector('.cdg-page-title')
    this.subpage = this.querySelector('.sub-page-breadcrumb')
    this.currentPage = this.querySelector('.current-page-breadcrumb')

    this.subTitle = document.querySelector('.cdg-sub-nav-title')

    window.addEventListener('hashchange', (event) => {
      this.handlePageChange(event.newURL)
    })

    this.subpage.addEventListener('click', () => {
      const nav = document.querySelector('cdg-nav-rail')
      nav.open = true
      nav.focus()
    })

    // By default
    this.handlePageChange(window.location.href)
  }

  handlePageChange(url) {
    // Remove old things
    this.content.textContent = ''

    const lastPrams = url.split('#')[1] || 'home'
    const hash = lastPrams.split('?')[0]

    if (hash === 'home') {
      this.pageHeader.classList.add('hide')
    } else {
      this.pageHeader.classList.remove('hide')
      const menu = this.getMenuInfo(hash)
      this.pageTitle.textContent = menu.name
      this.currentPage.textContent = menu.name

      const parent = findParentMenu(hash)
      this.subpage.textContent = parent.name
    }

    const contentMapped = CONTENT_MAP[hash]
    const contentElement = document.createElement(contentMapped)
    this.content.appendChild(contentElement)
  }

  getMenuInfo(hash) {
    for (let index in DOCUMENT_CONTENT) {
      const child = this.findChildren(DOCUMENT_CONTENT[index], hash)
      if (child) {
        return child
      }
    }
  }

  findChildren(menu, child) {
    if (menu.childList.length) {
      return menu.childList.find((item) => item.slug === child)
    }
    return null
  }

  createSubMenu(item) {
    const menu = document.createElement('a')
    menu.classList.add('cdg-sub-nav-item')
    menu.textContent = item.name
    menu.setAttribute('href', '#' + item.slug)
    return menu
  }
}
