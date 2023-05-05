import {CONTENT_MAP} from '../../constants/content-map'
import {DOCUMENT_CONTENT} from '../../constants/document-content'
import {CdgBaseComponent} from '../../shared/base-component'
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
  subNavParent
  subNav

  activeParent
  activatedMenu
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

    this.subNavParent = document.querySelector('.sub-nav-wrapper')
    this.subNav = document.querySelector('.cdg-sub-nav-group-content')
    this.subTitle = document.querySelector('.cdg-sub-nav-title')

    window.addEventListener('hashchange', (event) => {
      this.handlePageChange(event.newURL)
    })

    // By default
    this.handlePageChange(window.location.href)
  }

  handlePageChange(url) {
    // Remove old things
    this.content.textContent = ''

    const lastPrams = url.split('#')[1] || 'home'
    const hash = lastPrams.split('?')[0]
    this.activeMenu(hash)

    if (hash === 'home') {
      document
        .querySelector('.cdg-layout.sub-nav-wrapper')
        .classList.add('hide')
      this.pageHeader.classList.add('hide')
    } else {
      document
        .querySelector('.cdg-layout.sub-nav-wrapper')
        .classList.remove('hide')
      this.pageHeader.classList.remove('hide')
      const menu = this.getMenuInfo(hash)
      this.pageTitle.textContent = menu.name
      this.currentPage.textContent = menu.name
    }

    const contentMapped = CONTENT_MAP[hash]
    const contentElement = document.createElement(contentMapped)
    this.content.appendChild(contentElement)
  }

  activeMenu(hash) {
    setTimeout(() => {
      // Handle main nav active states
      if (this.activeParent) {
        this.activeParent.classList.remove('active')
      }

      const parent = this.findParentMenu(hash)
      if (parent) {
        this.activeParent = document.querySelector('#' + parent.id)
        this.activeParent.classList.add('active')

        this.subpage.textContent = parent.name

        this.showSubMenu(parent)
      }

      if (this.activatedMenu) {
        this.activatedMenu.classList.remove('active')
      }

      this.activatedMenu = document.querySelector('[href="#' + hash + '"]')
      this.activatedMenu.classList.add('active')

      // Close menu
      document.querySelector('cdg-nav-rail').open = false
    })
  }

  showSubMenu(data, first) {
    this.subNav.textContent = ''
    this.subTitle.textContent = data.name
    if (data.children.length) {
      data.children.forEach((item) => {
        this.subNav.appendChild(this.createSubMenu(item))
      })
    }
    if (first) {
      window.location.href = '#' + data.children[0].slug
    }
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
    if (menu.children.length) {
      return menu.children.find((item) => item.slug === child)
    }
    return null
  }

  findParentMenu(hash) {
    return DOCUMENT_CONTENT.find((item) => this.isParentContains(item, hash))
  }

  isParentContains(menu, child) {
    if (menu.children.length) {
      return menu.children.some((item) => item.slug === child)
    }
    return false
  }

  createSubMenu(item) {
    const menu = document.createElement('a')
    menu.classList.add('cdg-sub-nav-item')
    menu.textContent = item.name
    menu.setAttribute('href', '#' + item.slug)

    return menu
  }
}
