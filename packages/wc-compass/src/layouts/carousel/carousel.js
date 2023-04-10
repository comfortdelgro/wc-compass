import {Pointer} from '../../shared/pointer'

const ARROW_RIGHT = `<cdg-icon name="arrowRight" size="24"></cdg-icon>`
const ARROW_LEFT = `<cdg-icon name="arrowLeft" size="24"></cdg-icon>`
const ARROW_RIGHT_TEXT = `Next`
const ARROW_LEFT_TEXT = `Prev`
const CLICKABLE_ELEMENTS = ['BUTTON', 'A']

export class CdgCarousel extends HTMLElement {
  static get observedAttributes() {
    return ['current', 'use-arrow', 'auto-switch', 'single-center', 'scaled']
  }

  get current() {
    return Number(this.getAttribute('current')) || 0
  }

  set current(current) {
    this.setAttribute('current', current)
  }

  get useArrow() {
    return this.hasAttribute('use-arrow')
  }

  set useArrow(useArrow) {
    if (useArrow) {
      this.setAttribute('use-arrow', '')
    } else {
      this.removeAttribute('use-arrow')
    }
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

  get autoSwitch() {
    return this.hasAttribute('auto-switch')
  }

  set autoSwitch(autoSwitch) {
    if (autoSwitch) {
      this.setAttribute('auto-switch', '')
    } else {
      this.removeAttribute('auto-switch')
    }
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

  get length() {
    return this.scroller.children.length || 0
  }

  container
  scroller
  controller
  indicator
  timer
  navigationBar
  btnNext
  btnPrev

  pointer = new Pointer()
  scrollerPosition = 0

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-carousel')
    this.wrapContent()
    if (!this.hasAttribute('current')) {
      this.switchSlide()
    }
  }

  wrapContent() {
    this.container = document.createElement('div')
    this.container.classList.add('cdg-carousel-container')

    this.scroller = document.createElement('cdg-carousel-scroller')
    this.scroller.addEventListener(
      'updatePosition',
      this.handleUpdatePositon.bind(this),
    )

    this.indicator = document.createElement('cdg-dots-indicator')
    this.indicator.addEventListener('dotClick', this.handleDotClick.bind(this))

    // Element that contains dot, socials
    this.controller = document.createElement('div')
    this.controller.classList.add('cdg-carousel-controllers')

    const actions = this.querySelector('.cdg-mobile-actions')
    this.scroller.innerHTML = this.innerHTML
    if (this.scaled) {
      this.scroller.setAttribute('scaled', '')
    }

    this.controller.appendChild(this.indicator)
    this.container.appendChild(this.scroller)
    this.container.appendChild(this.controller)

    this.textContent = ''

    this.appendChild(this.container)
    if (actions) {
      this.appendChild(actions)
    }

    // Should get length after mobile actions has removed
    this.indicator.setAttribute('length', this.length)
    this.indicator.setAttribute('current', this.current)

    // Init first state of scroller
    this.scroller.setAttribute('current', this.current)
    if (this.singleCenter) {
      this.scroller.setAttribute('single-center', '')
    } else {
      this.scroller.removeAttribute('single-center')
    }

    this.attachNavigation()
    this.listenEvents()
  }

  listenEvents() {
    this.scroller.addEventListener(
      'pointerdown',
      this.handlePointerDown.bind(this),
    )
  }

  createButton() {
    const button = document.createElement('button')
    button.setAttribute('size', 'large')
    button.classList.add('cdg-button')
    button.classList.add('ghost')
    button.classList.add(this.useArrow ? 'icon' : 'text')

    return button
  }

  attachNavigation() {
    this.navigationBar = document.createElement('div')
    this.navigationBar.classList.add('cdg-carousel-navigation')

    this.btnNext = this.createButton()
    this.btnNext.classList.add('next')
    this.btnNext.innerHTML = this.useArrow ? ARROW_RIGHT : ARROW_RIGHT_TEXT
    this.btnNext.addEventListener('click', this.next.bind(this))

    this.btnPrev = this.createButton()
    this.btnPrev.classList.add('prev')
    this.btnPrev.innerHTML = this.useArrow ? ARROW_LEFT : ARROW_LEFT_TEXT
    this.btnPrev.addEventListener('click', this.prev.bind(this))

    this.navigationBar.appendChild(this.btnPrev)
    this.navigationBar.appendChild(this.btnNext)
    this.container.appendChild(this.navigationBar)
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'current':
        if (this.scroller && this.indicator) {
          this.scroller.setAttribute('current', this.current)
          this.indicator.setAttribute('current', this.current)
          this.switchSlide()
        }
        break

      case 'auto-switch':
        if (this.autoSwitch) {
          this.switchSlide()
        } else {
          this.stop()
        }
        break

      case 'single-center':
        if (this.scroller) {
          if (this.singleCenter) {
            this.scroller.setAttribute('single-center', '')
          } else {
            this.scroller.removeAttribute('single-center')
          }
        }
        break

      case 'scaled':
        if (!this.scroller) {
          return
        }
        if (this.scaled) {
          this.scroller.setAttribute('scaled', '')
        } else {
          this.scroller.removeAttribute('scaled')
        }
        break

      default:
        break
    }
  }

  switchSlide() {
    this.stop()
    if (this.autoSwitch) {
      this.timer = setTimeout(() => {
        this.current = (this.current + 1) % this.length
        this.switchSlide()
      }, 3000)
    }
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  next() {
    this.stop()
    this.current = (this.current + 1) % this.length
  }

  prev() {
    this.stop()
    this.current = (this.length + (this.current - 1)) % this.length
  }

  handleUpdatePositon(event) {
    this.scrollerPosition = event.detail
  }

  handleDotClick(event) {
    const target = event.detail || 0
    this.stop()
    this.current = target
  }

  handlePointerDown(event) {
    // Stop the auto play
    this.stop()

    // Stop transition timer
    this.scroller.style.transition = 'none'

    // Buttons will not trigger click event if we set pointer capture
    // This is to ignore buttons
    if (!CLICKABLE_ELEMENTS.includes(event.target.tagName)) {
      this.setPointerCapture(event.pointerId)
    }

    this.pointer = new Pointer()
    this.pointer.start({x: event.pageX, y: event.pageY})

    this.addEventListener('pointermove', this.handlePointerMove)
    this.addEventListener('touchmove', this.handleTouchMove)
    this.addEventListener('pointerup', this.handlePointerUp, {
      once: true,
    })
    this.addEventListener('pointercancel', this.handlePointerUp, {
      once: true,
    })
  }

  /**
   * To prevent page scroll on mobile when user is dragging
   * @param {TouchEvent} event
   */
  handleTouchMove(event) {
    if (Math.abs(this.pointer.distance.x) > 10) {
      event.preventDefault()
    }
  }

  handlePointerMove(event) {
    event.preventDefault()
    this.pointer.update({x: event.pageX, y: event.pageY})
    this.scroller.setAttribute(
      'position',
      this.scrollerPosition - this.pointer.distance.x,
    )
  }

  handlePointerUp() {
    this.removeEventListener('pointermove', this.handlePointerMove)

    // Make it transition smoother again
    this.scroller.style.transition = 'all 0.3s ease-in-out'

    if (Math.abs(this.pointer.distance.x) / this.clientWidth > 0.2) {
      if (this.pointer.distance.x < 0) {
        this.next()
      } else {
        this.prev()
      }
    } else {
      this.scroller.setAttribute('position', this.scrollerPosition)
    }
  }
}
