export class CdgCarouselScroller extends HTMLElement {
  static get observedAttributes() {
    return ['current', 'position', 'single-center']
  }

  get current() {
    return Number(this.getAttribute('current')) || 0
  }

  set current(current) {
    this.setAttribute('current', current)
  }

  get position() {
    return Number(this.getAttribute('position')) || 0
  }

  set position(position) {
    this.setAttribute('position', position)
  }

  get singleCenter() {
    return this.hasAttribute('single-center')
  }

  set singleCenter(singleCenter) {
    if (singleCenter) {
      this.setAttribute('single-center', '')
    } else {
      this.removeAttribute('single-center')
    }
  }

  get slideWidth() {
    return this.parentElement.clientWidth * (this.singleCenter ? 0.6 : 1)
  }

  sizingTimer

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-carousel-scroller')

    const clonedActions = this.querySelector('.cdg-mobile-actions')
    if (clonedActions) {
      this.removeChild(clonedActions)
    }

    this.listenEvents()
    this.updateViewResize()
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.updateViewResize.bind(this))
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'current':
        this.position = Math.floor(this.slideWidth * this.current)
        this.updatePosition()
        this.dispatchEvent(
          new CustomEvent('updatePosition', {detail: this.position}),
        )
        break

      case 'position':
        this.updatePosition()
        break

      case 'single-center':
        this.updateSize()
        this.updatePosition()
        break

      default:
        break
    }
  }

  listenEvents() {
    window.addEventListener('resize', this.updateViewResize.bind(this))
  }

  updateViewResize() {
    // To add resizing class name
    // Prevent animation while resizing
    // To update view immediately
    this.classList.add('resizing')
    if (this.sizingTimer) {
      clearTimeout(this.sizingTimer)
    }

    // Remove class name after 200ms that use haven't resized again
    this.sizingTimer = setTimeout(() => {
      this.classList.remove('resizing')
    }, 200)

    this.updateSize()
    let position = Math.floor(this.slideWidth * this.current)
    position = this.position < 0 ? 0 : this.position
    this.position = position
    this.updatePosition()
  }

  updateSize() {
    this.style.width = Math.floor(this.slideWidth * this.children.length) + 'px'
  }

  updatePosition() {
    // To not let slide moves on start and end
    if (
      this.singleCenter ||
      this.position <= this.clientWidth - this.slideWidth
    ) {
      this.style.transform = `translate3d(-${this.position}px, 0, 0)`
    }
  }
}
