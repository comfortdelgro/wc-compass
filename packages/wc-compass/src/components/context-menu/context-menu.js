import {CdgMultiLevelDropdown} from '../multi-level-dropdown/multi-level-dropdown'

export class CdgContextMenu extends CdgMultiLevelDropdown {
  contextMenuToggleElement
  contextMenuContentElement

  get name() {
    if (!this.getAttribute('name')) {
      this.setAttribute('name', 'context-menu')
    }
    return this.getAttribute('name')
  }

  static get observedAttributes() {
    return []
  }

  constructor() {
    super()
    this.classList.add('cdg-context-menu')

    this.createContextMenu()
  }

  createContextMenu() {
    // Create context-menu container
    const contextMenuElement =
      document.querySelector(`div#${this.name}`) ||
      document.createElement('div')
    contextMenuElement.innerHTML = ''
    contextMenuElement.id = this.name
    contextMenuElement.classList.add('cdg-context-menu-container')

    // Create context-menu wrapper
    this.contextMenuToggleElement = document.createElement('div')
    this.contextMenuToggleElement.classList.add('cdg-context-menu-wrapper')
    this.contextMenuContentElement = this.querySelector('[contextMenuContent]')
    this.contextMenuContentElement.classList.add('cdg-context-menu-content')
    this.contextMenuToggleElement.appendChild(this.contextMenuContentElement)

    contextMenuElement.appendChild(this.contextMenuToggleElement)
    document.body.appendChild(contextMenuElement)

    // Add event listener
    if (!this.handleWindowClickOutFn) {
      this.handleWindowClickOutFn = this.handleWindowClickOut.bind(this)
    }
    this.dropdownMenuToggleElement = this.querySelectorAll(
      '[contextMenuToggle]',
    )
    if (this.dropdownMenuToggleElement) {
      for (
        let index = 0;
        index < this.dropdownMenuToggleElement.length;
        index++
      ) {
        const dropdownMenuToggle = this.dropdownMenuToggleElement[index]
        dropdownMenuToggle.addEventListener(
          'contextmenu',
          this.handleOpenContextMenu.bind(this),
        )
      }
    }
  }

  handleOpenContextMenu(event) {
    event.preventDefault()
    this.dispatchEvent(new CustomEvent('onContextMenuOpen'))
    this.contextMenuContentElement.classList.add('show')
    window.addEventListener('click', this.handleWindowClickOutFn)
    this.contextMenuToggleElement.style.left = `${event.clientX}px`
    this.contextMenuToggleElement.style.top = `${event.clientY}px`
  }

  handleWindowClickOut(event) {
    if (!this.contextMenuToggleElement.contains(event.target)) {
      this.contextMenuContentElement.classList.remove('show')
      this.dispatchEvent(new CustomEvent('onContextMenuClose'))
      this.contextMenuToggleElement.style.left = `-9999px`
      this.contextMenuToggleElement.style.top = `-9999px`
      window.removeEventListener('click', this.handleWindowClickOutFn)
    }
  }
}
