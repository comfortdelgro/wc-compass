import {isNullOrUndefinded} from '../../shared/utilities'

const CARD_MODE_PADDING = 60
const CARD_MODE_SMALL_PADDING = 76
const CARD_GAP = 24
const TRANSITION_TIME = 300
const TRANSITION = `all ${TRANSITION_TIME}ms ease-in-out`
const SMALL_DEVICE = 479

export class CdgCarouselScroller extends HTMLElement {
  isDragging = false
  isSmallDevice = false
  resizingTimeout

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
    return (
      (this.parentElement.clientWidth -
        (this.singleCenter ? this.cardPadding : 0)) *
      (this.singleCenter ? this.singleSlidePercentage : 1)
    )
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
        this.renewActiveItem(oldVal, newVal)
        // Prevent handle change position when user is dragging
        if (this.isDragging) {
          return
        }
        if (oldVal || newVal) {
          // Time out waiting for new width of children
          setTimeout(() => {
            this.handleCurrentChange(
              Number(oldVal),
              Number(newVal),
              isNullOrUndefinded(oldVal) && newVal,
            )
          })
        }
        break

      case 'position':
        const activeItem = this.querySelector(
          `cdg-slide[slide-index="${this.current}"]`,
        )
        const isMoveFoward = newVal - oldVal > 0
        // Handle move first/last element to last/first position of "carousel-scroller"
        if (
          this.isDragging &&
          activeItem &&
          ((isMoveFoward && activeItem === this.firstItem) ||
            (!isMoveFoward && activeItem === this.lastItem))
        ) {
          this.forwardItem(isMoveFoward)
          return
        }
        this.updatePosition(null)
        break

      case 'single-center':
        this.updateViewResize()
        break

      default:
        break
    }
  }

  forwardItem(isMoveFoward) {
    if (isMoveFoward) {
      this.position = this.position - this.firstItemWidth
      this.prepend(this.lastItem)
    } else {
      this.position = this.position + this.firstItemWidth
      this.append(this.firstItem)
    }
    this.updatePosition()
    this.dispatchEvent(
      new CustomEvent('updatePosition', {detail: this.position}),
    )
  }

  renewActiveItem(oldVal, newVal) {
    // Remove active attr of old actived item
    const oldActiveItem = this.querySelector(
      `cdg-slide[slide-index="${oldVal}"]`,
    )
    if (oldActiveItem) {
      oldActiveItem.removeAttribute('active')
    }
    // Add active attr of old actived item
    const newActiveItem = this.querySelector(
      `cdg-slide[slide-index="${newVal}"]`,
    )
    if (newActiveItem) {
      newActiveItem.setAttribute('active', '')
    }
  }

  isRevertSwipe(prevValue, currentValue, gapSpace) {
    const oldActiveItem = this.querySelector(
      `cdg-slide[slide-index="${prevValue}"]`,
    )

    let revert = {next: false, prev: false}
    // Back to last item from first item and have no sibling prev element
    if (
      prevValue === 0 &&
      currentValue === this.children.length - 1 &&
      oldActiveItem === this.firstItem
    ) {
      return {...revert, prev: true}
    }
    // Back to last item from first item and have no sibling next element
    else if (
      prevValue === this.children.length - 1 &&
      currentValue === 0 &&
      oldActiveItem === this.lastItem
    ) {
      return {...revert, next: true}
    }
    // Go back and have no sibling prev element
    else if (
      currentValue < prevValue &&
      oldActiveItem === this.firstItem &&
      gapSpace === 1
    ) {
      return {...revert, prev: true}
    }
    // Go next and have no sibling next element
    else if (
      currentValue > prevValue &&
      oldActiveItem === this.lastItem &&
      gapSpace === 1
    ) {
      return {...revert, next: true}
    }

    return revert
  }

  handleCurrentChange(prevValue, currentValue, initWithCurrent) {
    const isNext = currentValue > prevValue
    const gapSpace = Math.abs(currentValue - prevValue)

    const revert = this.isRevertSwipe(prevValue, currentValue, gapSpace)

    // Is revert slider
    if (revert.next || revert.prev) {
      this.style.transition = 'none'
      let newPosition = this.firstItemWidth
      if (revert.prev) {
        newPosition = -this.firstItemWidth
        this.prepend(this.lastItem)
      } else if (revert.next) {
        this.append(this.firstItem)
      }
      this.updatePosition(this.position + newPosition)
      setTimeout(() => {
        this.style.transition = TRANSITION
        this.updatePosition()
      }, 0)
    } else {
      // Prevent animation for initial case
      if (initWithCurrent) {
        this.style.transition = 'none'
      }
      if (gapSpace === 1) {
        this.position =
          this.position +
          (isNext
            ? -this.firstItemWidth - this.cardGap
            : this.firstItemWidth + this.cardGap)
        this.updatePosition()
      }
      // For case click indicator buttons
      else {
        const realWidth = this.firstItemWidth + this.cardGap
        // Move item to first with gap spaces (for initial case)
        for (let index = 0; index < this.children.length; index++) {
          const element = this.children[index]
          if (element.getAttribute('slide-index') === `${currentValue}`) {
            this.position = -(realWidth * index)
            break
          }
        }
        const remainParentWidth =
          this.parentElement.clientWidth - this.firstItemWidth
        this.position = this.position - this.cardPadding + remainParentWidth / 2
        this.updatePosition()
      }
      // Reset animation after rendered for initial case
      if (initWithCurrent) {
        setTimeout(() => {
          this.style.transition = TRANSITION
        }, 1)
      }
      // Recalculate to add first/last element after animation
      setTimeout(() => {
        this.handleMoveItem(isNext)
      }, TRANSITION_TIME)
    }
    this.dispatchEvent(
      new CustomEvent('updatePosition', {detail: this.position}),
    )
  }

  listenEvents() {
    window.addEventListener('resize', this.updateViewResize.bind(this))
  }

  updateViewResize(event) {
    // To add resizing class name
    this.classList.add('resizing')
    this.isSmallDevice = window.innerWidth < SMALL_DEVICE

    this.updateSize()

    if (this.resizingTimeout) {
      clearTimeout(this.resizingTimeout)
    }

    if (event) {
      this.resizingTimeout = setTimeout(() => {
        const realWidth = this.firstItemWidth + this.cardGap
        // Move item to first with gap spaces (for initial case)
        for (let index = 0; index < this.children.length; index++) {
          const element = this.children[index]
          if (element.getAttribute('slide-index') === `${this.current}`) {
            this.position = -(realWidth * index)
            break
          }
        }
        const remainParentWidth =
          this.parentElement.clientWidth - this.firstItemWidth
        this.position = this.position - this.cardPadding + remainParentWidth / 2
      }, TRANSITION_TIME)
    }
    this.dispatchEvent(
      new CustomEvent('updatePosition', {detail: this.position}),
    )
    this.updatePosition()
  }

  updateSize() {
    this.style.width = Math.floor(this.slideWidth * this.children.length) + 'px'
  }

  handleEndDrag(distanceX, callback) {
    const halfDistance = Math.abs(this.firstItemWidth / 2) - this.cardGap
    const isNext = distanceX < 0
    const isOverHalf = Math.abs(distanceX) > halfDistance
    // Drag over half of width element
    if (isOverHalf) {
      const remainWidth =
        this.firstItemWidth + this.cardGap - Math.abs(distanceX)
      if (isNext) {
        this.position -= remainWidth
      } else {
        this.position += remainWidth
      }
      const newCurrentValue = this.getNewCurrentValue(isNext)
      this.setAttribute('current', newCurrentValue)
      this.style.transition = TRANSITION
      this.updatePosition()
      callback(newCurrentValue)
      // Recalculate to add first/last element after animation
      setTimeout(() => {
        this.handleMoveItem(isNext)
      }, TRANSITION_TIME)
    } else {
      if (isNext) {
        this.position += Math.abs(distanceX)
      } else {
        this.position -= Math.abs(distanceX)
      }
      this.style.transition = TRANSITION
      this.updatePosition()
    }
    this.dispatchEvent(
      new CustomEvent('updatePosition', {detail: this.position}),
    )
    this.isDragging = false
  }

  handleMoveItem(isMoveFoward) {
    const activeItem = this.querySelector(
      `cdg-slide[slide-index="${this.current}"]`,
    )
    const needAddFirst =
      !isMoveFoward &&
      (!activeItem.previousElementSibling ||
        (activeItem.previousElementSibling &&
          !activeItem.previousElementSibling.previousElementSibling))
    const needAddLast =
      isMoveFoward &&
      (!activeItem.nextElementSibling ||
        (activeItem.nextElementSibling &&
          !activeItem.nextElementSibling.nextElementSibling))

    const needAddMoveItem = needAddFirst || needAddLast
    // Only add first/last item for slider has more 2 children
    if (this.children.length > 2 && this.singleCenter && needAddMoveItem) {
      this.style.transition = 'none'
      if (needAddFirst) {
        this.position = this.position - this.slideWidth
        this.prepend(this.lastItem)
      } else if (needAddLast) {
        this.position = this.position + this.slideWidth
        this.append(this.firstItem)
      }
      setTimeout(() => {
        this.style.transition = TRANSITION
      }, 100)
      this.dispatchEvent(
        new CustomEvent('updatePosition', {detail: this.position}),
      )
    }
  }

  getNewCurrentValue(isNext) {
    let newCurrentValue = this.current + 1
    const lastItemIndex = this.children.length - 1
    if (isNext) {
      // Revert from last item
      if (this.current + 1 > lastItemIndex) {
        return 0
      }
    } else {
      newCurrentValue = this.current - 1
      // Revert from first item
      if (this.current - 1 < 0) {
        return lastItemIndex
      }
    }
    return newCurrentValue
  }

  updatePosition(position = null) {
    this.style.transform = `translate3d(${position || this.position}px, 0, 0)`
  }
}
