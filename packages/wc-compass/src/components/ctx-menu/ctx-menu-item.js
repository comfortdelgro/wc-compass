import {CdgBaseComponent} from '../../shared/base-component'
import {getClosestParentElement} from '../../shared/dom'

export class CdgCtxMenuItem extends CdgBaseComponent {
  set data(data) {
    this.itemData = data
    this.attachContent()
  }

  get data() {
    return this.itemData
  }

  itemData
  childrenWrapper
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-ctx-menu-item')
    this.addEventListener('mouseenter', this.handleMouseEnter.bind(this))
    this.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
  }

  attachContent() {
    const container = document.createElement('div')
    container.classList.add('cdg-ctx-menu-item-container')

    const label = document.createElement('span')
    label.textContent = this.data.label
    label.classList.add('cdg-ctx-menu-item-label')
    container.appendChild(label)
    this.appendChild(container)

    if (this.data.children && this.data.children.length) {
      const arrow = document.createElement('cdg-icon')
      arrow.setAttribute('name', 'arrowRight')
      arrow.setAttribute('size', '12')
      container.appendChild(arrow)

      this.childrenWrapper = document.createElement('cdg-ctx-menu')
      this.childrenWrapper.data = this.data.children
      this.childrenWrapper.addEventListener('select', (event) => {
        this.dispatchEvent(new CustomEvent('select', {detail: event.detail}))
      })
      this.appendChild(this.childrenWrapper)
    } else {
      container.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('select', {detail: this.data}))
      })
    }
  }

  handleMouseEnter(event) {
    // To not let parent level handle it
    event.stopPropagation()
    this.parentElement.closeAll()
    this.parentElement.setSelectingItem(this)
    this.parentElement.focusing = true

    const grandParent = getClosestParentElement(
      this.parentElement,
      'cdg-ctx-menu',
    )

    if (grandParent) {
      grandParent.focusing = false
    }

    if (this.childrenWrapper) {
      this.childrenWrapper.closeAll()
    }
    this.classList.add('hover')
    if (this.data.children && this.data.children.length) {
      this.classList.add('open')
    }
  }

  handleMouseLeave(event) {
    event.stopPropagation()
    this.classList.remove('hover')
  }

  close() {
    this.classList.remove('open')
    this.classList.remove('hover')
  }
}
