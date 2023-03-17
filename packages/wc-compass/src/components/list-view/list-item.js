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

  dragListener
  moveListener
  cancelListener

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
    this.removeEventListener('pointerdown', this.dragListener)
  }

  removeDragIcon() {
    this.removeChild(this.draggableIcon)
  }

  listenEvents() {
    this.dragListener = this.handleStartDrag.bind(this)
    this.addEventListener('pointerdown', this.dragListener)
  }

  handleStartDrag(event) {
    this.pointer = new Pointer()
    this.setPointerCapture(event.pointerId)
    this.pointer.start({x: event.pageX, y: event.pageY})
    this.startBound = this.getBoundingClientRect()

    this.moveListener = this.handlePointerMove.bind(this)
    this.addEventListener('pointermove', this.moveListener)
    document.addEventListener('pointerup', this.handlePointerUp.bind(this), {
      once: true,
    })

    document.addEventListener(
      'pointercancel',
      this.handlePointerUp.bind(this),
      {
        once: true,
      },
    )

    this.dispatchEvent(
      new CustomEvent('dragstart', {
        detail: this,
      }),
    )
  }

  isBeingDrag() {
    const x = Math.abs(this.pointer.distance.x)
    const y = Math.abs(this.pointer.distance.y)
    return !this.pointer.didMoving && (x <= 1 || y <= 1)
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
      this.clonedElement.style.pointerEvent = 'none'
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
    this.removeEventListener('pointermove', this.moveListener)
    // Only raise event when user has moved
    if (this.pointer.didMoving) {
      this.dispatchEvent(
        new CustomEvent('dragend', {
          detail: {
            element: this.clonedElement,
            onAnimationDone: this.onAnimationDone.bind(this),
          },
        }),
      )
    }
  }

  onAnimationDone() {
    this.clonedElement = null
  }
}
