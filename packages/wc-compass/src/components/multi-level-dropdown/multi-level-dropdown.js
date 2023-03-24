import {isElement} from '../../main'

export class CdgMultiLevelDropdown extends HTMLElement {
  dropdownMenuToggleElement
  dropdownMenuElement
  floatingElement

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

    this.dropdownMenuToggleElement = this.querySelector('[dropdownMenuToggle]')
    this.dropdownMenuElement = this.querySelector('[dropdownMenu]')

    this.handleToggleButtonBlurFn = this.handleToggleButtonBlur.bind(this)
    this.handleToggleClickFn = this.handleToggleClick.bind(this)
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
      this.dropdownMenuElement.classList.toggle('show')
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
