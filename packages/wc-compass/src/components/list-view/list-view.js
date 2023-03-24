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
        if (this.allowDrag) {
          listItem.setAttribute('allow-drag', this.allowDrag)
        } else {
          listItem.removeAttribute('allow-drag')
        }
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
    this.placeholder.style.height = this.draggingItem.clientHeight + 2 + 'px' // 2 for border
  }

  handleDragThrough(event) {
    const to = event.detail
    let target = this.dragIndex + to
    target = target < 0 ? 0 : target
    target =
      target > this.children.length + 1 ? this.children.length + 1 : target

    if (this.children[target]) {
      this.insertBefore(this.placeholder, this.children[target])
    } else {
      this.appendChild(this.placeholder)
    }
  }

  handleDragEnd(event) {
    if (this.contains(this.placeholder)) {
      this.insertBefore(this.draggingItem, this.placeholder)
      this.removeChild(this.placeholder)
    }
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

    this.playEndAnimation(event.detail)
  }

  playEndAnimation(detail) {
    const animationTime = 300
    const element = detail.element
    if (!element) {
      return
    }
    element.style.transition = `all ${animationTime}ms ease-in-out`
    this.draggingItem.classList.add('moving')
    const bound = this.draggingItem.getBoundingClientRect()
    element.style.top = bound.top + 'px'
    element.style.left = bound.left + 'px'

    setTimeout(() => {
      if (element && document.body.contains(element)) {
        this.draggingItem.classList.remove('moving')
        document.body.removeChild(element)
        detail.onAnimationDone && detail.onAnimationDone()
      }
    }, animationTime)
  }
}
