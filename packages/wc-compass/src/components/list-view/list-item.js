import {Pointer} from '../../shared/pointer'

export class CdgListItem extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'allow-drag']
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', null)
    } else {
      this.removeAttribute('disabled')
    }
  }

  get allowDrag() {
    return this.hasAttribute('allow-drag')
  }

  set allowDrag(allowDrag) {
    if (allowDrag) {
      this.setAttribute('allow-drag', true)
    } else {
      this.removeAttribute('allow-drag')
    }
  }

  placeholderPosition = ''
  draggableIcon
  pointer
  clonedElement
  startBound

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-list-item')
    this.tabIndex = 0
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'disabled':
        if (this.disabled) {
          this.tabIndex = 0
        } else {
          this.removeAttribute('tabindex')
        }
        break

      case 'allow-drag':
        if (this.allowDrag) {
          this.listenEvents()
          this.addDragIcon()
        } else {
          this.removeEvents()
          this.removeDragIcon()
        }
        break

      default:
        break
    }
  }

  addDragIcon() {
    this.draggableIcon = document.createElement('div')
    this.draggableIcon.classList.add('cdg-list-draggable-icon')
    this.prepend(this.draggableIcon)
  }

  removeEvents() {
    this.removeEventListener('dragstart', this.handleDrag.bind(this))
  }

  removeDragIcon() {
    this.removeChild(this.draggableIcon)
  }

  listenEvents() {
    this.addEventListener('pointerdown', this.handleDrag.bind(this))
  }

  handleDrag(event) {
    this.setPointerCapture(event.pointerId)
    this.pointer = new Pointer()
    this.pointer.start({x: event.pageX, y: event.pageY})
    this.startBound = this.getBoundingClientRect()

    this.addEventListener('pointermove', this.handlePointerMove)
    this.addEventListener('pointerup', this.handlePointerUp, {
      once: true,
    })
    this.addEventListener('pointercancel', this.handlePointerUp, {
      once: true,
    })

    this.dispatchEvent(
      new CustomEvent('dragstart', {
        detail: this,
      }),
    )
  }

  isBeingDrag() {
    const x = Math.abs(this.pointer.distance.x)
    const y = Math.abs(this.pointer.distance.y)
    return !this.pointer.didMoving && (x <= 3 || y <= 3)
  }

  handlePointerMove(event) {
    this.pointer.update({x: event.pageX, y: event.pageY})
    if (this.isBeingDrag()) {
      return
    }

    this.pointer.didMoving = true

    // Setting up clone element to capture
    if (!this.clonedElement) {
      this.clonedElement = this.cloneNode(true)
      this.clonedElement.style.borderRadius = '4px'
      this.clonedElement.style.border = '2px solid var(--accent)'
      this.clonedElement.style.height = this.clientHeight + 'px'
      this.clonedElement.style.width = this.clientWidth + 'px'
      this.clonedElement.style.zIndex = '65'
      this.clonedElement.style.position = 'fixed'
      this.clonedElement.classList.add('cloned')
      document.body.appendChild(this.clonedElement)
    }

    this.clonedElement.style.top =
      this.startBound.top + this.pointer.distance.y + 'px'
    this.clonedElement.style.left =
      this.startBound.left + this.pointer.distance.x + 'px'

    // Dragging item will be hidden so we need to plus 1
    // The dragging item will place to next item when we move it over half of next item
    const sub = this.pointer.distance.y > 0 ? 1.5 : 0.5

    const moveToIndex = Math.floor(
      this.pointer.distance.y / this.clonedElement.clientHeight + sub,
    )

    this.classList.add('dragging')
    this.dispatchEvent(
      new CustomEvent('dragthrough', {
        detail: moveToIndex,
      }),
    )
  }

  handlePointerUp() {
    this.classList.remove('dragging')
    if (this.clonedElement && document.body.contains(this.clonedElement)) {
      document.body.removeChild(this.clonedElement)
      this.clonedElement = null
    }
    this.removeEventListener('pointermove', this.handlePointerMove)

    this.dispatchEvent(new Event('dragend'))
  }
}
