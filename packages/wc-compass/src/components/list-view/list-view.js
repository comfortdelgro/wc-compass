export class CdgListview extends HTMLElement {
  static get observedAttributes() {
    return ['allow-drag']
  }

  get allowDrag() {
    return this.hasAttribute('allow-drag')
  }

  set allowDrag(allowDrag) {
    if (allowDrag) {
      this.setAttribute('allow-drag', '')
    } else {
      this.removeAttribute('allow-drag')
    }
  }

  placeholder
  draggingItem
  draggingIndex
  dragoverElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-list-view')
    this.placeholder = document.createElement('div')
    this.placeholder.classList.add('cdg-list-placeholder-item')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'allow-drag') {
      this.setDraggableChildren()
    }
  }

  setDraggableChildren() {
    this.querySelectorAll('cdg-list-item').forEach((listItem, index) => {
      if (listItem) {
        listItem.setAttribute('allow-drag', this.allowDrag)
      }
      if (this.allowDrag) {
        listItem.addEventListener('dragstart', this.handleDragStart.bind(this))
        listItem.addEventListener(
          'dragthrough',
          this.handleDragThrough.bind(this),
        )
        listItem.addEventListener('dragend', this.handleDragEnd.bind(this))
      } else {
        listItem.removeEventListener(
          'dragstart',
          this.handleDragStart.bind(this),
        )
        listItem.removeEventListener(
          'dragthrough',
          this.handleDragThrough.bind(this),
        )
        listItem.removeEventListener('dragend', this.handleDragEnd.bind(this))
      }
    })
  }

  handleDragStart(event) {
    this.draggingItem = event.detail
    this.dragIndex = Array.from(this.children).indexOf(this.draggingItem)
  }

  handleDragThrough(event) {
    const to = event.detail

    if (to === 0 || this.dragIndex === to) {
      return
    }

    let target = this.dragIndex + to
    target = target < 0 ? 0 : target
    target = target > this.children.length ? this.children.length : target

    this.insertBefore(this.placeholder, this.children[target])
  }

  handleDragEnd() {
    if (this.contains(this.placeholder)) {
      this.insertBefore(this.draggingItem, this.placeholder)
      this.removeChild(this.placeholder)
      const toIndex = Array.from(this.children).indexOf(this.draggingItem)

      this.dispatchEvent(
        new CustomEvent('dragitem', {
          detail: {
            draggIndex: this.dragIndex,
            dragElement: this.draggingItem,
            toIndex,
          },
        }),
      )
    }
  }
}
