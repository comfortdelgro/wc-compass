export * from './components/index'
export * from './pages/index'
export * from './portal/index'
export * from './services/index'

import {DOCUMENT_CONTENT} from './constants/document-content'
import {SampleSection} from './sample-section'

customElements.define('cdg-sample-section', SampleSection)
const subTitle = document.querySelector('.cdg-sub-nav-title')
const subNavParent = document.querySelector('.sub-nav-wrapper')
const subNav = document.querySelector('.cdg-sub-nav-group-content')

window.showSubNav = () => {
  subNavParent.classList.add('stick')
}

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

const navRail = document.querySelector('.cdg-nav-rail-body')
DOCUMENT_CONTENT.forEach((item) => {
  navRail.appendChild(createNavMenu(item))
})
