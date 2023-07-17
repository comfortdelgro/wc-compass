import {CdgBaseComponent} from '../../shared/base-component'

export class CdgListview extends CdgBaseComponent {
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
  siblingsListElement = []
  cdgListViewService = window.cdgListViewService

  constructor() {
    super()
    this.isBindingList = this.hasAttribute('draggableName')

    if (this.isBindingList) {
      this.bindEventsForBindingList()
    }
  }

  bindEventsForBindingList() {
    this.addEventListener(
      'onListItemPositionChange',
      this.handleChangeDragPosition.bind(this),
    )
    this.addEventListener(
      'onOriginListViewDragEnd',
      this.handleOriginDragEnd.bind(this),
    )
    this.addEventListener(
      'mouseenter',
      this.handleMouseEnterForBindingList.bind(this),
    )
  }

  handleChangeDragPosition() {
    const listItems = this.querySelectorAll('cdg-list-item')
    const listItemsLength = listItems.length
    if (listItemsLength) {
      for (let index = 0; index < listItemsLength; index++) {
        const listItem = listItems.item(index)
        const isAddedPlaceholder = this.addPlaceholderToSiblingsList(
          listItem,
          index,
          listItemsLength,
        )
        if (isAddedPlaceholder) {
          return
        }
      }
    } else {
      this.appendChild(this.placeholder)
    }
  }

  handleOriginDragEnd(event) {
    this.insertBefore(
      this.cdgListViewService.dataTransfer.target,
      this.cdgListViewService.dataTransfer.placeholder,
    )
    this.removeChild(this.cdgListViewService.dataTransfer.placeholder)
    this.playEndAnimation(
      event.detail,
      this.cdgListViewService.dataTransfer.target,
    )
  }

  handleMouseEnterForBindingList() {
    if (this.cdgListViewService.dataTransfer) {
      this.cdgListViewService.notifyGotDataTransfer(this)
    }
  }

  isInBounding({x, y}, {top, bottom, left, right}) {
    return x >= left && x <= right && y >= top && y <= bottom
  }

  addPlaceholderToSiblingsList(listItem, index, listItemsLength) {
    const listItemBound = listItem.getBoundingClientRect()
    if (
      this.isInBounding(
        this.cdgListViewService.dataTransfer.position,
        listItemBound,
      )
    ) {
      const isOverHalfOfLastItem =
        index === listItemsLength - 1 &&
        this.cdgListViewService.dataTransfer.position.y >
          listItemBound.top + listItemBound.height / 2

      if (isOverHalfOfLastItem) {
        this.appendChild(this.cdgListViewService.dataTransfer.placeholder)
      } else {
        this.insertBefore(
          this.cdgListViewService.dataTransfer.placeholder,
          listItem,
        )
      }
      return true
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

      this.handleDragStartFn =
        this.handleDragStartFn || this.handleDragStart.bind(this)
      this.handleDragThroughFn =
        this.handleDragThroughFn || this.handleDragThrough.bind(this)
      this.handleDragEndFn =
        this.handleDragEndFn || this.handleDragEnd.bind(this)
      this.handleDragOverParentFn =
        this.handleDragOverParentFn || this.handleDragOverParent.bind(this)

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
    this.cdgListViewService.setNewDataTransfer({
      ...event.detail,
      origin: this,
      placeholder: this.placeholder,
      removeIndex: this.dragIndex,
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
    } else {
      if (this.isBindingList) {
        this.cdgListViewService.notifyOriginDragEnd(event.detail)
        return
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

    this.playEndAnimation(event.detail, this.draggingItem)
  }

  removeListItemEvents(item) {
    item.removeEventListener('dragstart', this.handleDragStartFn)
    item.removeEventListener('dragthrough', this.handleDragThroughFn)
    item.removeEventListener('dragend', this.handleDragEndFn)
    if (this.isBindingList) {
      item.removeEventListener('dragoverParent', this.handleDragOverParentFn)
    }
  }

  playEndAnimation(detail, draggingItem) {
    const animationTime = 300
    const element = detail.element
    if (!element) {
      return
    }
    element.style.transition = `all ${animationTime}ms ease-in-out`
    draggingItem.classList.add('moving')
    const bound = draggingItem.getBoundingClientRect()
    element.style.top = bound.top + 'px'
    element.style.left = bound.left + 'px'

    setTimeout(() => {
      if (element && document.body.contains(element)) {
        draggingItem.classList.remove('moving')
        document.body.removeChild(element)
        detail.onAnimationDone && detail.onAnimationDone()
      }
    }, animationTime)
  }
}
