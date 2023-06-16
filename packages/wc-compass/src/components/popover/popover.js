import {createFloating, DIRECTIONS} from '../floating-content/floating-content'

export class CdgPopover extends HTMLElement {
  floatingElement
  anchorElement
  cdgPopoverContentElement
  _direction = 'bottom'

  blurListener
  clickListener
  keyboardEvent

  get trigger() {
    return this.getAttribute('trigger')
  }

  set trigger(trigger) {
    this.setAttribute('trigger', trigger)
  }

  get direction() {
    return this.getAttribute('direction')
  }

  set direction(value) {
    if (!value || !DIRECTIONS.includes(value)) {
      value = 'bottom'
    }
    this.setAttribute('direction', value)
    if (this.floatingElement) {
      this.floatingElement.setAttribute('placement', value)
    }
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    if (!this.floatingElement) {
      return
    }
    if (value) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  static get observedAttributes() {
    return ['direction', 'open']
  }

  constructor() {
    super()
    this.cdgPopoverContentElement = this.querySelector('cdg-popover-content')
  }

  connectedCallback() {
    this.classList.add('cdg-popover')
    if (!this.floatingElement) {
      if (!this.anchorElement) {
        this.anchorElement = this.querySelector('[cdg-popover-header]')
        this.anchorElement.setAttribute('tabindex', 0)

        if (this.trigger !== self) {
          this.blurListener = this.handleAnchorBlur.bind(this)
          this.anchorElement.addEventListener('blur', this.blurListener)

          this.clickListener = this.handleAnchorClick.bind(this)
          this.anchorElement.addEventListener('click', this.clickListener)
        }
      }
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.cdgPopoverContentElement,
        this.direction,
        ['cdg-popover-floating-container'],
        false,
        false,
        true,
        false,
      )
    }
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'open':
        if (this.open) {
          this.floatingElement.setAttribute('open', '')
          this.keyboardEvent = this.handleKeyboard.bind(this)
          window.addEventListener('keydown', this.keyboardEvent)
        } else {
          this.floatingElement.removeAttribute('open')
          window.removeEventListener('keydown', this.keyboardEvent)
        }
        break

      default:
        break
    }
  }

  handleAnchorClick() {
    this.open = true
  }

  handleAnchorBlur() {
    this.open = false
  }

  handleKeyboard(event) {
    if (event.key === 'Escape') {
      document.activeElement.blur()
    }
  }
}
