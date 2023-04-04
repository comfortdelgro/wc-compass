const CARD_MODE_PADDING = 60
const CARD_GAP = 24
const TRANSITION_TIME = 300
const SCALED_ITEM = 0.9

export class CdgCarouselScroller extends HTMLElement {
  static get observedAttributes() {
    return ['current', 'position', 'single-center', 'scaled']
  }

  get current() {
    return Number(this.getAttribute('current')) || 0
  }

  set current(current) {
    this.setAttribute('current', current)
  }

  get scaled() {
    return this.hasAttribute('scaled')
  }

  set scaled(scaled) {
    if (scaled) {
      this.setAttribute('scaled', '')
    } else {
      this.removeAttribute('scaled')
    }
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
    return this.children[0].clientWidth
  }

  get currentPosition() {
    const halfDistance =
      (this.parentElement.clientWidth - CARD_MODE_PADDING - this.slideWidth) /
        2 -
      CARD_GAP
    const width =
      this.slideWidth +
      (this.singleCenter ? CARD_GAP : 0) / this.children.length
    const currentPosition = this.current * width
    return currentPosition - (this.singleCenter ? halfDistance : 0)
  }

  get slideWidth() {
    return (
      (this.parentElement.clientWidth -
        (this.singleCenter ? CARD_MODE_PADDING : 0)) *
      (this.singleCenter ? 0.6 : 1)
    )
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

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'current':
        if (this.children[oldVal]) {
          this.children[oldVal].removeAttribute('active')
        }
        if (this.children[newVal]) {
          this.children[newVal].setAttribute('active', '')
        }
        this.handleCurrentChange(Number(oldVal), Number(newVal))
        break

      case 'position':
        this.updatePosition()
        break

      case 'single-center':
        this.updateViewResize()
        break

      default:
        break
    }
  }

  handleCurrentChange(prevValue, currentValue) {
    let loop = false
    let position = this.position

    // In loop case
    if (prevValue === 0 && currentValue === this.children.length - 1) {
      loop = true
      position = this.slideWidth * (prevValue - 1) + CARD_MODE_PADDING * 0.5
    } else if (prevValue === this.children.length - 1 && currentValue === 0) {
      loop = true
      position = this.slideWidth * (prevValue + 1) + CARD_MODE_PADDING
    }

    if (loop && this.children.length > 1) {
      if (this.singleCenter) {
        position = -(position - this.parentElement.clientWidth * 0.2)
      } else {
        position = -position
      }
      this.style.transform = `translate3d(${position}px, 0, 0)`
      // To keep the animation smooth
      // Still transition to the positioned item
      setTimeout(() => {
        this.style.transition = 'none'
        this.recalculatePosition()
        this.updatePosition(loop)

        setTimeout(() => {
          this.style.transition = `all ${TRANSITION_TIME}ms ease-in-out`
        })
      }, TRANSITION_TIME)
    } else {
      this.recalculatePosition()
    }
  }

  recalculatePosition() {
    this.position = this.currentPosition
    this.updatePosition(true)
    this.dispatchEvent(
      new CustomEvent('updatePosition', {detail: this.position}),
    )
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

    this.position = this.currentPosition
    this.dispatchEvent(
      new CustomEvent('updatePosition', {detail: this.position}),
    )
    this.updatePosition(true)
  }

  updateSize() {
    this.style.width = Math.floor(this.slideWidth * this.children.length) + 'px'
  }

  /**
   * Only update last and first element when the current slide is switched
   * @param {boolean} updateLastFirst
   */
  updatePosition(updateLastFirst) {
    // To not let slide moves on start and end
    const position =
      this.position < 0 ? Math.abs(this.position) : -this.position
    this.style.transform = `translate3d(${position}px, 0, 0)`

    if (updateLastFirst && this.children.length > 1) {
      const firstSlide = this.children[0]
      const lastSlide = this.children[this.children.length - 1]
      const spacing = this.singleCenter ? 24 : 0
      if (this.current === 0) {
        lastSlide.classList.add('last')
        // Move last slide to first place
        lastSlide.style.transform = `translate3d(-${
          (lastSlide.clientWidth + spacing) * this.children.length
        }px, 0 ,0)${this.scaled ? ' scale(' + SCALED_ITEM + ')' : ''}`
      } else {
        // Move back to last
        lastSlide.style.transform = `translate3d(0, 0 ,0)${
          this.scaled ? ' scale(' + SCALED_ITEM + ')' : ''
        }`
      }

      if (this.current === this.children.length - 1) {
        firstSlide.classList.add('first')
        // Move last slide to first place
        firstSlide.style.transform = `translate3d(${
          (firstSlide.clientWidth + spacing) * this.children.length
        }px, 0 ,0)${this.scaled ? ' scale(' + SCALED_ITEM + ')' : ''}`
      } else {
        // Move back to last
        firstSlide.style.transform = `translate3d(0, 0 ,0)${
          this.scaled ? ' scale(' + SCALED_ITEM + ')' : ''
        }`
      }
    }
  }
}
