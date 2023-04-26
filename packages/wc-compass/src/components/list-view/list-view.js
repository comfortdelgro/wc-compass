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
  isBindingList = false
  siblingListElement = []

  constructor() {
    super()
    if (this.hasAttribute('name')) {
      const listViewElements = document.querySelectorAll(
        `[name="${this.getAttribute('name')}"]`,
      )
      if (listViewElements && listViewElements.length > 1) {
        listViewElements.forEach((list) => {
          if (list !== this) {
            this.siblingListElement.push(list)
          }
        })
        this.isBindingList = true
      }
    }
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
      if (!this.handleDragStartFn) {
        this.handleDragStartFn = this.handleDragStart.bind(this)
      }
      if (!this.handleDragThroughFn) {
        this.handleDragThroughFn = this.handleDragThrough.bind(this)
      }
      if (!this.handleDragEndFn) {
        this.handleDragEndFn = this.handleDragEnd.bind(this)
      }
      if (!this.handleDragOverParentFn) {
        this.handleDragOverParentFn = this.handleDragOverParent.bind(this)
      }
      if (this.allowDrag) {
        this.bindEventForListItemByIndex(index)
      } else {
        this.removeListItemEvents(listItem)
      }
    })
  }

  bindEventForListItemByIndex(index) {
    const listItem = this.querySelectorAll('cdg-list-item').item(index)
    listItem.addEventListener('dragstart', this.handleDragStartFn)
    listItem.addEventListener('dragthrough', this.handleDragThroughFn)
    listItem.addEventListener('dragend', this.handleDragEndFn)
    if (this.isBindingList) {
      listItem.addEventListener('dragoverParent', this.handleDragOverParentFn)
    }
  }

  handleDragOverParent(event) {
    this.siblingListElement.forEach((list) => {
      const listBound = list.getBoundingClientRect()
      if (this.isInBounding(event.detail, listBound)) {
        const listItems = list.querySelectorAll('cdg-list-item')
        if (listItems.length) {
          listItems.forEach((listItem, index) => {
            const listItemBound = listItem.getBoundingClientRect()
            if (this.isInBounding(event.detail, listItemBound)) {
              if (
                index === listItems.length - 1 &&
                event.detail.y > listItemBound.top + listItemBound.height / 2
              ) {
                list.appendChild(this.placeholder)
              } else {
                list.insertBefore(this.placeholder, listItem)
              }
            } else {
            }
          })
        } else {
          list.appendChild(this.placeholder)
        }
      }
    })
  }

  isInBounding({x, y}, {top, bottom, left, right}) {
    return x >= left && x <= right && y >= top && y <= bottom
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
    } else {
      if (this.siblingListElement && this.siblingListElement.length) {
        const isMoveToOtherList = this.siblingListElement.some((list) => {
          if (list.contains(this.placeholder)) {
            const elementIndex = Array.prototype.indexOf.call(
              list.children,
              this.placeholder,
            )

            this.removeListItemEvents(this.draggingItem)
            list.insertBefore(this.draggingItem, this.placeholder)
            list.removeChild(this.placeholder)
            list.setDraggableChildren()

            this.dispatchEvent(
              new CustomEvent('onRemoveItem', {
                detail: {
                  dragElement: this.draggingItem,
                  elementIndex: this.dragIndex,
                },
              }),
            )
            list.dispatchEvent(
              new CustomEvent('onAddItem', {
                detail: {
                  dragElement: this.draggingItem,
                  elementIndex,
                },
              }),
            )
            this.playEndAnimation(event.detail)
            return true
          }
          return false
        })

        if (isMoveToOtherList) {
          return
        }
      }
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

  removeListItemEvents(item) {
    item.removeEventListener('dragstart', this.handleDragStartFn)
    item.removeEventListener('dragthrough', this.handleDragThroughFn)
    item.removeEventListener('dragend', this.handleDragEndFn)
    if (this.isBindingList) {
      item.removeEventListener('dragoverParent', this.handleDragOverParentFn)
    }
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
