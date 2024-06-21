import {CdgBaseComponent} from '../../shared/base-component'

const CARD_MODE_PADDING = 60
const CARD_MODE_SMALL_PADDING = 76
const CARD_GAP = 24
const TRANSITION_TIME = 300
const TRANSITION = `all ${TRANSITION_TIME}ms ease-in-out`
const SMALL_DEVICE = 479

export class CdgCarouselScroller extends CdgBaseComponent {
  isSmallDevice = false
  resizingTimeout
  switchingSlide = false
  timer
  valueTimer

  static get observedAttributes() {
    return ['current', 'position', 'single-center', 'scaled']
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

  get cardPadding() {
    if (!this.singleCenter) {
      return 0
    }
    return this.isSmallDevice ? CARD_MODE_SMALL_PADDING : CARD_MODE_PADDING
  }

  get cardGap() {
    return this.singleCenter ? CARD_GAP : 0
  }

  get currentPosition() {
    const halfDistance =
      (this.parentElement.clientWidth - this.cardPadding - this.slideWidth) /
        2 -
      this.cardGap
    const width =
      this.slideWidth +
      (this.singleCenter ? this.cardGap : 0) / this.children.length
    const currentPosition = -(this.current * width)
    return currentPosition - (this.singleCenter ? halfDistance : 0)
  }

  get slideWidth() {
    return this.singleCenter ? this.children[0]?.clientWidth : this.clientWidth
  }

  get singleSlidePercentage() {
    return window.innerWidth < 768 ? 0.9 : 0.6
  }

  get firstItem() {
    return this.children[0]
  }

  get lastItem() {
    return this.children[this.children.length - 1]
  }

  get firstItemWidth() {
    return this.firstItem ? this.firstItem.clientWidth : 0
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-carousel-scroller')

    const clonedActions = this.querySelector('.cdg-mobile-actions')
    if (clonedActions) {
      this.removeChild(clonedActions)
    }

    // Set "slide-index" for "cdg-slide"
    for (let index = 0; index < this.children.length; index++) {
      const element = this.children[index]
      element.setAttribute('slide-index', index)
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
        this.handleCurrentChange(oldVal, newVal, false)
        break

      case 'position':
        break

      case 'single-center':
        break

      default:
        break
    }
  }

  handleCurrentChange(prevValue, currentValue, initWithCurrent) {
    this.scrollTo({left: currentValue * this.slideWidth, behavior: 'smooth'})
    this.switchingSlide = true
    this.debounceScroll()
  }

  listenEvents() {
    window.addEventListener('resize', this.updateViewResize.bind(this))
    this.addEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll() {
    if (this.switchingSlide) {
      this.debounceScroll()
      return
    }
    const target = Math.round(this.scrollLeft / this.slideWidth)
    if (target !== this.current) {
      this.debounceChangeValue(target)
    }
  }

  debounceScroll() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.switchingSlide = false
    }, 300)
  }

  debounceChangeValue(target) {
    if (this.valueTimer) {
      clearTimeout(this.valueTimer)
    }
    this.valueTimer = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('currentChange', {detail: target}))
    }, 100)
  }

  updateViewResize(event) {}

  updateSize() {
    this.style.width = Math.ceil(this.slideWidth * this.children.length) + 'px'
  }
}
