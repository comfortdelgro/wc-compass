import {Pointer} from '../../shared/pointer'

export class CdgGutter extends HTMLElement {
  static get observedAttributes() {
    return ['place', 'use-collapse']
  }

  get place() {
    return this.getAttribute('place')
  }

  set place(place) {
    this.setAttribute('place', place)
  }

  get useCollapse() {
    return this.hasAttribute('use-collapse')
  }

  set useCollapse(useCollapse) {
    if (useCollapse) {
      this.setAttribute('use-collapse', '')
    } else {
      this.removeAttribute('use-collapse')
    }
  }

  get viewPortWidth() {
    return this.parentElement.parentElement.offsetWidth || 0
  }

  pointer
  capturedSize
  collapseButton

  collapsed = false

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-gutter')
    this.parentElement.classList.add('cdg-contains-gutter')
    if (this.useCollapse) {
      this.attachArrow()
    }

    this.addEventListener('pointerdown', this.handlePointerDown.bind(this))
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'use-collapse':
        if (this.useCollapse) {
          this.attachArrow()
        } else if (this.collapseButton) {
          this.removeChild(this.collapseButton)
          this.collapseButton = null
        }
        break

      default:
        break
    }
  }

  attachArrow() {
    if (this.collapseButton) {
      return
    }
    this.collapseButton = document.createElement('button', {is: 'cdg-button'})
    this.collapseButton.setAttribute('class', 'cdg-button ghost icon rounded')
    this.collapseButton.setAttribute('size', 'small')
    this.collapseButton.setAttribute('title', 'Collapse view button')

    const icon = document.createElement('cdg-icon')
    icon.setAttribute('name', 'arrowLeft')
    icon.setAttribute('size', '12')
    this.collapseButton.appendChild(icon)
    this.collapseButton.addEventListener(
      'click',
      this.handleCollapse.bind(this),
    )
    this.appendChild(this.collapseButton)
  }

  handleCollapse() {
    if (!this.collapsed) {
      this.collapsed = true
      this.classList.add('collapsed')
      this.parentElement.style.width = '0px'
    } else {
      this.collapsed = false
      this.classList.remove('collapsed')
      this.parentElement.style.width = ''
    }
  }

  handlePointerDown(event) {
    if (event.target.classList.contains('cdg-button')) {
      return
    }
    this.setPointerCapture(event.pointerId)
    this.capturedSize = this.parentElement.clientWidth
    this.pointer = new Pointer()
    this.pointer.start({x: event.pageX, y: event.pageY})
    this.addEventListener('pointermove', this.handlePointerMove)
    this.addEventListener('pointerup', this.handlePointerUp, {
      once: true,
    })
    this.addEventListener('pointercancel', this.handlePointerUp, {
      once: true,
    })
  }

  handlePointerMove(event) {
    event.preventDefault()
    this.pointer.update({x: event.pageX, y: event.pageY})
    let width =
      this.capturedSize +
      (this.place === 'left'
        ? -this.pointer.distance.x
        : this.pointer.distance.x)
    if (width < 0) {
      width = 0
    } else if (width >= this.viewPortWidth) {
      width = this.viewPortWidth
    }
    this.parentElement.style.width = width + 'px'
    window.dispatchEvent(new Event('resize'))
  }

  handlePointerUp() {
    this.removeEventListener('pointermove', this.handlePointerMove)
    if (this.parentElement.clientWidth === 0) {
      this.collapsed = true
      this.classList.add('collapsed')
    } else {
      this.collapsed = true
      this.classList.remove('collapsed')
    }
  }
}
