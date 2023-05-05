import {DOCUMENT_CONTENT} from '../../constants/document-content'
import {CdgBaseComponent} from '../../shared/base-component'
import {findParentMenu} from '../../shared/menu'
import template from './sidebar.html'

export class CdgDemoSidebar extends CdgBaseComponent {
  activeParent
  activatedMenu
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const navRail = this.querySelector('.cdg-nav-rail-body')
    DOCUMENT_CONTENT.forEach((item) => {
      navRail.appendChild(this.createNavMenu(item))
    })

    window.addEventListener('hashchange', (event) => {
      this.activeMenu()
    })

    this.activeMenu()
  }

  createSubMenu(item) {
    const menu = document.createElement('a')
    menu.classList.add('cdg-sub-nav-item')
    menu.textContent = item.name
    menu.setAttribute('href', '#' + item.slug)

    return menu
  }

  createSubMenuGroup(data) {
    const menuGroup = document.createElement('div')
    menuGroup.classList.add('cdg-sub-nav-group-content')

    if (data.children.length) {
      data.children.forEach((item) => {
        menuGroup.appendChild(this.createSubMenu(item))
      })
    }

    return menuGroup
  }

  createNavMenu(item) {
    const menu = document.createElement('a')
    const menuInner = document.createElement('div')
    menuInner.classList.add('menu-inner')

    if (item.slug) {
      menu.setAttribute('href', '#' + item.slug)
    }

    menu.classList.add('cdg-nav-item')
    menu.setAttribute('id', item.id)
    const menuIcon = document.createElement('cdg-icon')
    menuIcon.setAttribute('name', item.icon)

    const menuText = document.createElement('span')
    menuText.textContent = item.name

    menuInner.appendChild(menuIcon)
    menuInner.appendChild(menuText)

    if (item.children && item.children.length) {
      const arrowIcon = document.createElement('cdg-icon')
      arrowIcon.classList.add('item-arrow')
      arrowIcon.setAttribute('name', 'arrowRight')
      arrowIcon.setAttribute('size', 16)
      menuInner.appendChild(arrowIcon)
    }

    menu.appendChild(menuInner)

    if (item.children && item.children.length) {
      menuInner.addEventListener('click', () => {
        const navRailWrapper = document.querySelector('.cdg-nav-rail')
        const listener = () => {
          if (!menu.classList.contains('active')) {
            menu.classList.remove('expanded')
          }
          navRailWrapper.removeEventListener('close', listener)
        }
        navRailWrapper.addEventListener('close', listener)
        menu.classList.toggle('expanded')
      })
      menu.appendChild(this.createSubMenuGroup(item))
    }

    return menu
  }

  activeMenu() {
    const params = window.location.href.split('#')[1] || 'home'
    const hash = params.split('?')[0]
    console.log(hash)
    setTimeout(() => {
      // Handle main nav active states
      if (this.activeParent) {
        this.activeParent.classList.remove('active')
      }

      const parent = findParentMenu(hash)
      console.log(parent)
      if (parent) {
        this.activeParent = document.querySelector('#' + parent.id)
        this.activeParent.classList.add('active')
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
}
