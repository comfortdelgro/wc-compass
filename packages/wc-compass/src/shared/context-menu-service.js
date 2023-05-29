export class CdgContextMenuService {
  element
  data

  overlay
  menuElements

  constructor(element, data) {
    this.element = element
    this.data = data
    this.listenEvent()
  }

  listenEvent() {
    this.element.addEventListener('contextmenu', this.handleContext.bind(this))
  }

  handleContext(event) {
    event.preventDefault()
    this.attachContextMenu(event)
  }

  attachContextMenu(event) {
    const anchor = {
      x: event.pageX,
      y: event.pageY,
    }
    this.overlay = document.createElement('div')
    this.overlay.classList.add('cdg-ctx-menu-overlay')
    this.overlay.addEventListener('click', this.closeContextMenu.bind(this))

    this.menuElements = document.createElement('cdg-ctx-menu')
    this.menuElements.classList.add('cdg-ctx-menu-root')
    this.menuElements.data = this.data
    this.menuElements.anchor = anchor
    this.menuElements.focusing = true
    this.menuElements.addEventListener('select', (event) => {
      this.onSelect(event.detail)
      this.closeContextMenu()
    })

    document.body.appendChild(this.overlay)
    document.body.appendChild(this.menuElements)
  }

  closeContextMenu() {
    if (this.overlay && this.overlay.parentElement) {
      this.overlay.parentElement.removeChild(this.overlay)
    }
    if (this.menuElements && this.menuElements.parentElement) {
      this.menuElements.parentElement.removeChild(this.menuElements)
    }
  }

  onSelect() {}
}
