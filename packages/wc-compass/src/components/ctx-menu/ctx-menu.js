import {CdgBaseComponent} from '../../shared/base-component'
import {getClosestParentElement} from '../../shared/dom'

export class CdgCtxMenu extends CdgBaseComponent {
  set data(data) {
    this.menu = data
    this.attachContent()
  }

  get data() {
    return this.menu
  }

  set anchor(anchor) {
    this.anchorPoint = anchor
    this.updateAnchorPoint()
  }

  get anchor() {
    return this.anchorPoint
  }

  set focusing(focusing) {
    if (focusing && !this.keyboardListener) {
      this.focusingOnMe = focusing
      this.keyboardListener = this.handleKeyboard.bind(this)
      window.addEventListener('keydown', this.keyboardListener)
    } else {
      this.focusingOnMe = focusing
      window.removeEventListener('keydown', this.keyboardListener)
      this.keyboardListener = null
    }
  }

  get focusing() {
    return this.focusingOnMe
  }

  menu
  anchorPoint
  selecting
  focusingOnMe

  keyboardListener
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-ctx-menu')
  }

  attachContent() {
    if (this.menu && this.menu.length) {
      this.textContent = ''
      this.menu.forEach((item) => {
        const menuItem = document.createElement('cdg-ctx-menu-item')
        menuItem.data = item
        menuItem.addEventListener('select', this.handleSelect.bind(this))

        this.appendChild(menuItem)
      })
    }
  }

  handleSelect(event) {
    this.dispatchEvent(new CustomEvent('select', {detail: event.detail}))
  }

  setSelectingItem(element) {
    if (this.selecting) {
      this.selecting.classList.remove('selecting', 'open', 'hover')
    }
    this.selecting = element
    this.selecting.classList.add('selecting', 'open')
  }

  updateAnchorPoint() {
    if (this.anchor) {
      this.style.left = this.anchor.x + 1 + 'px'
      this.style.top = this.anchor.y + 1 + 'px'
    }
  }

  closeAll() {
    Array.from(this.children).forEach((child) => {
      child.close()
    })
  }

  autoSelectFirst() {
    this.setSelectingItem(this.firstChild)
  }

  handleKeyboard(event) {
    this.stopEvent(event)

    if (!this.focusing) {
      return
    }

    if (!this.selecting) {
      const selectedItem =
        event.key === 'ArrowDown'
          ? this.firstChild
          : event.key === 'ArrowUp'
          ? this.lastChild
          : ''
      if (selectedItem) {
        this.setSelectingItem(selectedItem)
      }
      return
    }

    switch (event.key) {
      case 'ArrowUp':
        this.selecting.classList.remove('open')
        if (this.selecting.previousElementSibling) {
          this.setSelectingItem(this.selecting.previousElementSibling)
        } else {
          this.setSelectingItem(this.lastChild)
        }
        break

      case 'ArrowDown':
        this.selecting.classList.remove('open')
        if (this.selecting.nextElementSibling) {
          this.setSelectingItem(this.selecting.nextElementSibling)
        } else {
          this.setSelectingItem(this.firstChild)
        }
        break

      case 'ArrowRight':
        const childMenu = this.selecting.querySelector('cdg-ctx-menu')
        if (childMenu) {
          this.focusing = false
          childMenu.focusing = true
          childMenu.autoSelectFirst()
          this.selecting.classList.add('open')
        }
        break

      case 'ArrowLeft':
        if (!this.classList.contains('cdg-ctx-menu-root')) {
          const parentMenu = getClosestParentElement(
            this.parentElement,
            'cdg-ctx-menu',
          )
          if (parentMenu) {
            this.focusing = false
            this.selecting.classList.remove('open', 'selecting')
            parentMenu.focusing = true
          }
        }
        break

      case ' ':
      case 'Enter':
        if (this.focusing) {
          this.dispatchEvent(
            new CustomEvent('select', {detail: this.selecting.data}),
          )

          this.focusingOnMe = false
          window.removeEventListener('keydown', this.keyboardListener)
          this.keyboardListener = null
        }
        break

      default:
        break
    }
  }

  stopEvent(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.keyboardListener)
  }
}
