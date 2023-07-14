import {CdgBaseComponent} from '../../shared/base-component'
import {getRealHeight, isElement} from '../../shared/utilities'

export class CdgMultiLevelDropdown extends CdgBaseComponent {
  dropdownMenuToggleElement
  dropdownMenuElement
  floatingElement
  dropdownItemElements

  get event() {
    this.getAttribute('event') || 'click'
  }

  set event(value) {
    this.setAttribute('event', value || 'click')
    if (this.dropdownMenuToggleElement && !this.hasAttribute('trigger')) {
      this.clearListener()
      if (value === 'click' || this.isMobile) {
        this.dropdownMenuToggleElement.addEventListener(
          'click',
          this.handleToggleClickFn,
        )
        if (!this.isMobile) {
          this.dropdownMenuToggleElement.addEventListener(
            'blur',
            this.handleToggleButtonBlurFn,
          )
        } else {
          this.dropdownMenuToggleElement.addEventListener(
            'mouseout',
            this.handleToggleButtonBlurFn,
          )
        }
      } else {
        this.dropdownMenuToggleElement.addEventListener(
          'mouseenter',
          this.handleToggleClickFn,
        )
        this.dropdownMenuToggleElement.addEventListener(
          'mouseout',
          this.handleToggleButtonBlurFn,
        )
        this.dropdownMenuElement.addEventListener(
          'mouseout',
          this.handleToggleButtonBlurFn,
        )
      }
    }
  }

  static get observedAttributes() {
    return ['event']
  }

  constructor() {
    super()
    this.classList.add('cdg-dropdown-menu-container')
    this.isMobile = window.innerWidth < 992
    if (window.innerWidth < 992) {
      this.addHoverEventForSubmenu(this.dropdownMenuElement)
    }

    this.dropdownItemElements = this.querySelectorAll('li.cdg-dropdown-item')
    this.addDropdownItemEvents()

    this.dropdownMenuToggleElement = this.querySelector('[dropdownMenuToggle]')
    this.dropdownMenuElement = this.querySelector('[dropdownMenu]')

    this.handleToggleButtonBlurFn = this.handleToggleButtonBlur.bind(this)
    this.handleToggleClickFn = this.handleToggleClick.bind(this)
  }

  addDropdownItemEvents() {
    this.dropdownItemElements.forEach((dropdownItem) => {
      const submenu = dropdownItem.querySelector('ul.submenu.cdg-dropdown-menu')
      if (submenu) {
        if (!this.isMobile) {
          this.handleDropdownItemHoverOnPC(dropdownItem, submenu)
        } else {
          dropdownItem.addEventListener('click', (event) => {
            event.stopPropagation()
            event.preventDefault()
            submenu.classList.toggle('show')
          })
        }
      }
    })
  }

  handleDropdownItemHoverOnPC(dropdownItem, submenu) {
    dropdownItem.addEventListener('mouseenter', () => {
      const dropdownItemBound = dropdownItem.getBoundingClientRect()
      submenu.classList.add('show')
      if (window.innerWidth < dropdownItemBound.right + submenu.clientWidth) {
        submenu.classList.add('submenu-left')
      }
      if (
        window.innerHeight <
        dropdownItemBound.bottom + submenu.clientHeight
      ) {
        submenu.classList.add('submenu-top')
      }
    })
    dropdownItem.addEventListener('mouseout', (event) => {
      if (!dropdownItem.contains(event.relatedTarget)) {
        submenu.classList.remove('show')
      }
    })
  }

  addHoverEventForSubmenu(dropdownMenu) {
    if (!dropdownMenu) {
      return
    }
    dropdownMenu.childNodes.forEach((item) => {
      if (isElement(item)) {
        const subMenu = item.querySelector('ul.submenu')
        if (subMenu) {
          item.addEventListener('click', (event) => {
            event.stopPropagation()
            subMenu.style.opacity = !!item.cdgClicked ? 0 : 1
            subMenu.style.visibility = !!item.cdgClicked ? 'hidden' : 'visible'
            item.cdgClicked = !item.cdgClicked
          })
          item.addEventListener('blur', (event) => {
            if (!item.contains(event.relatedTarget)) {
              item.cdgClicked = false
              subMenu.style.opacity = 0
              subMenu.style.visibility = 'hidden'
            }
          })
          this.addHoverEventForSubmenu(subMenu)
        }
      }
    })
  }

  handleToggleClick() {
    if (this.dropdownMenuElement) {
      if (
        window.innerHeight <
        this.dropdownMenuToggleElement.getBoundingClientRect().bottom +
          getRealHeight(this.dropdownMenuElement)
      ) {
        this.dropdownMenuElement.classList.add('menuTop')
      } else {
        this.dropdownMenuElement.classList.remove('menuTop')
      }

      this.dropdownMenuElement.classList.toggle('show')

      if (
        this.dropdownMenuElement.classList.contains('show') &&
        this.isMobile
      ) {
        setTimeout(() => {
          const dropdownMenuBound =
            this.dropdownMenuElement.getBoundingClientRect()
          let translateX = ''
          if (dropdownMenuBound.x < 0) {
            translateX = `translateX(calc(-50% + ${
              Math.abs(dropdownMenuBound.x) + 1
            }px))`
          } else if (dropdownMenuBound.right > window.innerWidth) {
            translateX = `translateX(calc(-50% - ${
              dropdownMenuBound.right - window.innerWidth + 1
            }px))`
          }

          if (translateX) {
            if (this.dropdownMenuElement.classList.contains('menuTop')) {
              translateX = `${translateX} translateY(-100%)`
            }
            this.dropdownMenuElement.style.transform = translateX
          }
        }, 0)
      }
    }
  }

  handleToggleButtonBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.dropdownMenuElement.classList.remove('show')
    }
  }

  clearListener() {
    this.dropdownMenuToggleElement.removeEventListener(
      'mouseenter',
      this.handleToggleClickFn,
    )
    this.dropdownMenuToggleElement.removeEventListener(
      'mouseout',
      this.handleToggleButtonBlurFn,
    )
    this.dropdownMenuToggleElement.removeEventListener(
      'click',
      this.handleToggleClickFn,
    )
    this.dropdownMenuToggleElement.removeEventListener(
      'blur',
      this.handleToggleButtonBlurFn,
    )
    if (this.dropdownMenuElement) {
      this.dropdownMenuElement.removeEventListener(
        'mouseout',
        this.handleToggleButtonBlurFn,
      )
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue
  }
}
