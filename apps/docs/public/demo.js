export * from './components/accordion/index'
export * from './components/avatar/index'
export * from './components/button/index'
export * from './components/calendar/index'
export * from './components/carousel/index'
export * from './components/datepicker/index'
export * from './components/dropdown/index'
export * from './components/gutter/index'
export * from './components/list-item/index'
export * from './components/listview/index'
export * from './components/progress/index'
export * from './components/table/index'

import {SampleSection} from './sample-section'

import './components/accordion/accordion.html'
import './components/alert-badges.html'
import './components/alert.html'
import './components/avatar/avatar.html'
import './components/breadcrumbs.html'
import './components/button/button.html'
import './components/calendar/calendar.html'
import './components/card-blogs.html'
import './components/cards.html'
import './components/carousel/carousel.html'
import './components/chart.html'
import './components/checkboxes.html'
import './components/context-menu.html'
import './components/dashboard-side-card.html'
import './components/datepicker/datepicker.html'
import './components/dialog.html'
import './components/dropdown/dropdown.html'
import './components/file-upload.html'
import './components/file.html'
import './components/footer.html'
import './components/gutter/gutter.html'
import './components/icon.html'
import './components/inline-loading.html'
import './components/layouts.html'
import './components/listview/list-view.html'
import './components/loading.html'
import './components/modal.html'
import './components/multi-level-dropdown.html'
import './components/nav-rail.html'
import './components/navbar.html'
import './components/page-header.html'
import './components/pagination.html'
import './components/pill-badges.html'
import './components/popover.html'
import './components/progress/progress.html'
import './components/quantity-toggle.html'
import './components/radios.html'
import './components/range-slider.html'
import './components/rating.html'
import './components/sidebar.html'
import './components/status.html'
import './components/sub-header.html'
import './components/sub-nav.html'
import './components/table/table.html'
import './components/tabs.html'
import './components/tag-box.html'
import './components/template/about.html'
import './components/template/dashboard.html'
import './components/testimonials.html'
import './components/text-field.html'
import './components/timeline.html'
import './components/toast.html'
import './components/toggle.html'
import './components/toolbar.html'
import './components/tooltip.html'
import './components/video.html'
import './components/volume.html'
import './components/website/contents/article.html'
import './components/website/contents/news-blogs.html'
import './components/website/news-and-blogs.html'
import './components/website/post-detail.html'
import './components/wizards.html'
import './pages/customization.html'
import './pages/home.html'
import './pages/layouts-and-controls.html'
import './pages/theming.html'
import './pages/z-index.html'

customElements.define('cdg-sample-section', SampleSection)

const contentMap = {
  home: './pages/home.html',
  customization: './pages/customization.html',
  zIndex: './pages/z-index.html',
  theming: './pages/theming.html',
  layoutsAndControls: './pages/layouts-and-controls.html',
  accordion: './components/accordion/accordion.html',
  alert: './components/alert.html',
  alertBadges: './components/alert-badges.html',
  avatar: './components/avatar/avatar.html',
  breadcrumbs: './components/breadcrumbs.html',
  checkboxes: './components/checkboxes.html',
  dashboardSideCard: './components/dashboard-side-card.html',
  file: './components/file.html',
  fileUpload: './components/file-upload.html',
  footer: './components/footer.html',
  about: './components/template/about.html',
  gutter: './components/gutter/gutter.html',
  icon: './components/icon.html',
  dialog: './components/dialog.html',
  dropdown: './components/dropdown/dropdown.html',
  button: './components/button/button.html',
  cards: './components/cards.html',
  cardBlogs: './components/card-blogs.html',
  carousel: './components/carousel/carousel.html',
  inlineLoading: './components/inline-loading.html',
  layouts: './components/layouts.html',
  listItem: './components/list-item/list-item.html',
  listView: './components/listview/list-view.html',
  loading: './components/loading.html',
  modal: './components/modal.html',
  navRail: './components/nav-rail.html',
  navbar: './components/navbar.html',
  pageHeader: './components/page-header.html',
  pagination: './components/pagination.html',
  pillBadges: './components/pill-badges.html',
  quantityToggle: './components/quantity-toggle.html',
  radios: './components/radios.html',
  rating: './components/rating.html',
  sidebar: './components/sidebar.html',
  status: './components/status.html',
  toolbar: './components/toolbar.html',
  subHeader: './components/sub-header.html',
  tabs: './components/tabs.html',
  textField: './components/text-field.html',
  subNav: './components/sub-nav.html',
  table: './components/table/table.html',
  popover: './components/popover.html',
  progress: './components/progress/progress.html',
  toast: './components/toast.html',
  toggle: './components/toggle.html',
  timeline: './components/timeline.html',
  volume: './components/volume.html',
  wizards: './components/wizards.html',
  calendar: './components/calendar/calendar.html',
  datepicker: './components/datepicker/datepicker.html',
  tooltip: './components/tooltip.html',
  rangeSlider: './components/range-slider.html',
  tagBox: './components/tag-box.html',
  video: './components/video.html',
  dashboardTemplate: './components/template/dashboard.html',
  richTextEditor: './components/rich-text-editor.html',
  selectingThemeModal: './components/template/selecting-theme-modal.html',
  servicesMenu: './components/template/services-menu.html',
  multiLevelDropdown: './components/multi-level-dropdown.html',
  contextMenu: './components/context-menu.html',
  testimonials: './components/testimonials.html',
  imageViewer: './components/zoom-image-view.html',
  newsAndBlogs: './components/website/news-and-blogs.html',
  article: './components/website/post-detail.html',
  services: './components/website/services.html',
  chart: './components/chart.html',
}

const documentContent = [
  {
    name: 'Getting started',
    id: 'getingStarted',
    icon: 'signature',
    children: [
      {
        name: 'Theming',
        slug: 'theming',
      },
      {
        name: 'Layouts and Controls',
        slug: 'layoutsAndControls',
      },
      {
        name: 'zIndex',
        slug: 'zIndex',
      },
      {
        name: 'Customization',
        slug: 'customization',
      },
    ],
  },
  {
    name: 'Layouts',
    id: 'layouts',
    icon: 'grid',
    children: [
      {
        name: 'Accordion',
        slug: 'accordion',
      },
      {
        name: 'Breadcrumbs',
        slug: 'breadcrumbs',
      },
      {
        name: 'Cards',
        slug: 'cards',
      },
      {
        name: 'Carousel',
        slug: 'carousel',
      },
      {
        name: 'Context Menu',
        slug: 'contextMenu',
      },
      {
        name: 'Dashboard Side Card',
        slug: 'dashboardSideCard',
      },
      {
        name: 'Gutter',
        slug: 'gutter',
      },
      {
        name: 'Page Header',
        slug: 'pageHeader',
      },
      {
        name: 'Layouts',
        slug: 'layouts',
      },
      {
        name: 'List Item',
        slug: 'listItem',
      },
      {
        name: 'List View',
        slug: 'listView',
      },
      {
        name: 'Sub Header',
        slug: 'subHeader',
      },
      {
        name: 'Multi Level Dropdown',
        slug: 'multiLevelDropdown',
      },
      {
        name: 'Nav Rail',
        slug: 'navRail',
      },
      {
        name: 'Navbar',
        slug: 'navbar',
      },
      {
        name: 'Sub Nav',
        slug: 'subNav',
      },
      {
        name: 'Table',
        slug: 'table',
      },
      {
        name: 'Timeline',
        slug: 'timeline',
      },
      {
        name: 'Toolbar',
        slug: 'toolbar',
      },
      {
        name: 'Footer',
        slug: 'footer',
      },
    ],
  },
  {
    name: 'Form Controls',
    id: 'formControls',
    icon: 'clipBoard',
    children: [
      {
        name: 'Calendar',
        slug: 'calendar',
      },
      {
        name: 'Checkboxes',
        slug: 'checkboxes',
      },
      {
        name: 'Datepicker',
        slug: 'datepicker',
      },
      {
        name: 'Dropdown',
        slug: 'dropdown',
      },
      {
        name: 'File',
        slug: 'file',
      },
      {
        name: 'File Upload',
        slug: 'fileUpload',
      },
      {
        name: 'Text Field',
        slug: 'textField',
      },
      {
        name: 'Quantity Toggle',
        slug: 'quantityToggle',
      },
      {
        name: 'Radios',
        slug: 'radios',
      },
      {
        name: 'RangeSlider',
        slug: 'rangeSlider',
      },
      {
        name: 'Rich Text Editor',
        slug: 'richTextEditor',
      },
      {
        name: 'Toggle',
        slug: 'toggle',
      },
    ],
  },
  {
    name: 'UI Controls',
    id: 'ui-controls',
    icon: 'shapes',
    children: [
      {
        name: 'Avatar',
        slug: 'avatar',
      },
      {
        name: 'Alert',
        slug: 'alert',
      },
      {
        name: 'Alert Badges',
        slug: 'alertBadges',
      },
      {
        name: 'Button',
        slug: 'button',
      },
      {
        name: 'Icon',
        slug: 'icon',
      },
      {
        name: 'Inline Loading',
        slug: 'inlineLoading',
      },
      {
        name: 'Loading',
        slug: 'loading',
      },
      {
        name: 'Pagination',
        slug: 'pagination',
      },
      {
        name: 'Pill Badges',
        slug: 'pillBadges',
      },
      {
        name: 'Rating',
        slug: 'rating',
      },
      {
        name: 'Status',
        slug: 'status',
      },
      {
        name: 'Tabs',
        slug: 'tabs',
      },
      {
        name: 'Tooltip',
        slug: 'tooltip',
      },
      {
        name: 'Tag Box',
        slug: 'tagBox',
      },
      {
        name: 'Popover',
        slug: 'popover',
      },
      {
        name: 'Progress',
        slug: 'progress',
      },
      {
        name: 'Video',
        slug: 'video',
      },
      {
        name: 'Volume',
        slug: 'volume',
      },
      {
        name: 'Wizards',
        slug: 'wizards',
      },
    ],
  },
  {
    name: 'Services',
    id: 'services',
    icon: 'job',
    children: [
      {
        name: 'Dialog',
        slug: 'dialog',
      },
      {
        name: 'Modal',
        slug: 'modal',
      },
      {
        name: 'Sidebar',
        slug: 'sidebar',
      },
      {
        name: 'Toast',
        slug: 'toast',
      },
      {
        name: 'Chart',
        slug: 'chart',
      },
      {
        name: 'Image Viewer',
        slug: 'imageViewer',
      },
    ],
  },
  {
    name: 'Templates',
    id: 'templates',
    icon: 'grids',
    children: [
      {
        name: 'About',
        slug: 'about',
      },
      {
        name: 'Article',
        slug: 'article',
      },
      {
        name: 'Card for Blogs',
        slug: 'cardBlogs',
      },
      {
        name: 'News And Blogs',
        slug: 'newsAndBlogs',
      },
      {
        name: 'Selecting Theme Modal',
        slug: 'selectingThemeModal',
      },
      {
        name: 'Services Menu',
        slug: 'servicesMenu',
      },
      {
        name: 'Testimonials',
        slug: 'testimonials',
      },
      {
        name: 'Services',
        slug: 'services',
      },
      {name: 'Dashboard', slug: 'dashboardTemplate'},
    ],
  },
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

const content = document.querySelector('#component-content')
const scriptElement = document.querySelector('#sample-script')
const subTitle = document.querySelector('.cdg-sub-nav-title')
const subNavParent = document.querySelector('cdg-sub-nav')
const subNav = document.querySelector('.cdg-sub-nav-group-content')
const pageHeader = document.querySelector('.cdg-page-header')
const pageTitle = document.querySelector('.cdg-page-title')
const subpage = document.querySelector('.sub-page-breadcrumb')
const currentPage = document.querySelector('.current-page-breadcrumb')

let activatedMenu = null
let activeParent = null

window.showSubNav = () => {
  subNavParent.classList.add('stick')
}

function isParentContains(menu, child) {
  if (menu.children.length) {
    return menu.children.find((item) => item.slug === child)
  }
  return false
}

function findParentMenu(hash) {
  return documentContent.find((item) => isParentContains(item, hash))
}

function findChildren(menu, child) {
  if (menu.children.length) {
    return menu.children.find((item) => item.slug === child)
  }
  return null
}

function getMenuInfo(hash) {
  for (let index in documentContent) {
    const child = findChildren(documentContent[index], hash)
    if (child) {
      return child
    }
  }
}

function activeMenu(hash) {
  setTimeout(() => {
    // Handle main nav active states
    if (activeParent) {
      activeParent.forEach((element) => {
        element.classList.remove('active')
      })
    }

    const parent = findParentMenu(hash)
    if (parent) {
      activeParent = document.querySelectorAll('#' + parent.id)

      activeParent.forEach((element) => {
        element.classList.add('active')
      })

      subpage.textContent = parent.name

      showSubMenu(parent)
    } else {
      console.log(hash)
    }

    if (activatedMenu) {
      activatedMenu.forEach((element) => {
        element.classList.remove('active')
      })
    }

    activatedMenu = document.querySelectorAll('[href="#' + hash + '"]')
    activatedMenu.forEach((element) => {
      element.classList.add('active')
    })

    // Close menu
    document.querySelector('cdg-nav-rail').open = false
  })
}

function handlePageChange(url) {
  if (!pageHeader) {
    return
  }
  // Remove old script
  scriptElement.textContent = ''

  const lastPrams = url.split('#')[1] || 'home'
  const hash = lastPrams.split('?')[0]
  activeMenu(hash)
  subNavParent.classList.remove('stick')
  if (hash === 'home') {
    document.querySelector('cdg-sub-nav').classList.add('hide')
    pageHeader.classList.add('hide')
  } else {
    document.querySelector('cdg-sub-nav').classList.remove('hide')
    pageHeader.classList.remove('hide')
    const menu = getMenuInfo(hash)
    pageTitle.textContent = menu.name
    currentPage.textContent = menu.name
  }

  downloadHTMLContent(contentMap[hash]).then((data) => {
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
  })
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
  // menuIcon.setAttribute('source', 'host');

  const menuText = document.createElement('span')
  menuText.textContent = item.name

  menu.appendChild(menuIcon)
  menu.appendChild(menuText)

  return menu
}

document.onreadystatechange = () => {
  handlePageChange(window.location.href)
}

const navRail = document.querySelector('.cdg-nav-rail-body')
documentContent.forEach((item) => {
  navRail.appendChild(createNavMenu(item))
})
