export * from './components/index'
export * from './pages/index'
export * from './services/index'

import {CONTENT_MAP, DOCUMENT_CONTENT} from '../pages/constants'
import './components/template/about.html'
import './components/template/dashboard.html'
import './components/website/contents/article.html'
import './components/website/contents/news-blogs.html'
import './components/website/news-and-blogs.html'
import './components/website/post-detail.html'
import {SampleSection} from './sample-section'

customElements.define('cdg-sample-section', SampleSection)

let activatedMenu = null
let activeParent = null

const content = document.querySelector('#component-content')
const scriptElement = document.querySelector('#sample-script')
const subTitle = document.querySelector('.cdg-sub-nav-title')
const subNavParent = document.querySelector('cdg-sub-nav')
const subNav = document.querySelector('.cdg-sub-nav-group-content')
const pageHeader = document.querySelector('.cdg-page-header')
const pageTitle = document.querySelector('.cdg-page-title')
const subpage = document.querySelector('.sub-page-breadcrumb')
const currentPage = document.querySelector('.current-page-breadcrumb')

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

function downloadHTMLContent(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {cache: 'no-cache'})
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('Loaded file is not valid HTML File"'))
        }
      })
      .catch(() => {
        reject(new Error('Error loading HTML'))
      })
  })
}

window.showSubNav = () => {
  subNavParent.classList.add('stick')
}

function isParentContains(menu, child) {
  if (menu.children.length) {
    return menu.children.some((item) => item.slug === child)
  }
  return false
}

function findParentMenu(hash) {
  return DOCUMENT_CONTENT.find((item) => isParentContains(item, hash))
}

function findChildren(menu, child) {
  if (menu.children.length) {
    return menu.children.find((item) => item.slug === child)
  }
  return null
}

function getMenuInfo(hash) {
  for (let index in DOCUMENT_CONTENT) {
    const child = findChildren(DOCUMENT_CONTENT[index], hash)
    if (child) {
      return child
    }
  }
}

function activeMenu(hash) {
  setTimeout(() => {
    // Handle main nav active states
    if (activeParent) {
      activeParent.classList.remove('active')
    }

    const parent = findParentMenu(hash)
    if (parent) {
      activeParent = document.querySelector('#' + parent.id)
      activeParent.classList.add('active')

      subpage.textContent = parent.name

      showSubMenu(parent)
    }

    if (activatedMenu) {
      activatedMenu.classList.remove('active')
    }

    activatedMenu = document.querySelector('[href="#' + hash + '"]')
    activatedMenu.classList.add('active')

    // Close menu
    document.querySelector('cdg-nav-rail').open = false
  })
}

function handlePageChange(url) {
  if (!pageHeader) {
    return
  }
  // Remove old things
  content.textContent = ''
  scriptElement.textContent = ''

  const lastPrams = url.split('#')[1] || 'home'
  const hash = lastPrams.split('?')[0]
  activeMenu(hash)
  subNavParent.classList.remove('stick')

  if (NO_TABLE_OF_CONTENT.includes(hash)) {
    document.querySelector('.table-of-content').classList.add('hide')
  } else {
    document.querySelector('.table-of-content').classList.remove('hide')
  }

  if (hash === 'home') {
    document.querySelector('.cdg-layout.sub-nav-wrapper').classList.add('hide')
    pageHeader.classList.add('hide')
  } else {
    document
      .querySelector('.cdg-layout.sub-nav-wrapper')
      .classList.remove('hide')
    pageHeader.classList.remove('hide')
    const menu = getMenuInfo(hash)
    pageTitle.textContent = menu.name
    currentPage.textContent = menu.name
  }

  const contentMapped = CONTENT_MAP[hash]
  const splited = contentMapped.split('.')
  if (splited.length > 1) {
    downloadHTMLContent(CONTENT_MAP[hash]).then((data) => {
      content.innerHTML = data

      // Make demo script works
      const scriptElement = content.querySelector('script')
      if (scriptElement) {
        eval(scriptElement.innerHTML)
      }

      // Wait for content render
      setTimeout(() => {
        if (hljs) {
          hljs.highlightAll()
        }
      }, 10)

      setTimeout(() => {
        document.querySelector('cdg-page-indexes').registerTableContent(content)
      }, 50)
    })
  } else {
    const contentElement = document.createElement(contentMapped)
    content.appendChild(contentElement)
  }
}

window.addEventListener('hashchange', function (event) {
  handlePageChange(event.newURL)
})

function createSubMenu(item) {
  const menu = document.createElement('a')
  menu.classList.add('cdg-sub-nav-item')
  menu.textContent = item.name
  menu.setAttribute('href', '#' + item.slug)

  return menu
}

function showSubMenu(data, first) {
  subNav.textContent = ''
  subTitle.textContent = data.name
  if (data.children.length) {
    data.children.forEach((item) => {
      subNav.appendChild(createSubMenu(item))
    })
  }
  if (first) {
    window.location.href = '#' + data.children[0].slug
  }
}

function createNavMenu(item) {
  const menu = document.createElement('a')
  menu.classList.add('cdg-nav-item')
  menu.setAttribute('id', item.id)
  if (item.slug) {
    menu.setAttribute('href', '#' + item.slug)
  } else {
    menu.addEventListener('click', () => showSubMenu(item, true))
  }

  const menuIcon = document.createElement('cdg-icon')
  menuIcon.setAttribute('name', item.icon)

  const menuText = document.createElement('span')
  menuText.textContent = item.name

  menu.appendChild(menuIcon)
  menu.appendChild(menuText)

  return menu
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    handlePageChange(window.location.href)
  }
}

const navRail = document.querySelector('.cdg-nav-rail-body')
DOCUMENT_CONTENT.forEach((item) => {
  navRail.appendChild(createNavMenu(item))
})
