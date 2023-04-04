import {createFloating, DIRECTIONS} from '../floating-content/floating-content'

export class CdgPopover extends HTMLElement {
  floatingElement
  anchorElement
  cdgPopoverContentElement
  _direction = 'bottom'
  _open = false

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
    return this._open
  }

  set open(value) {
    if (this.floatingElement) {
      if (value) {
        this.floatingElement.setAttribute('opening', 'true')
      } else {
        this.removeAttribute('open')
        this.floatingElement.removeAttribute('opening')
      }
    }
    this._open = value
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
        this.anchorElement.addEventListener(
          'blur',
          this.handleAnchorBlur.bind(this),
        )
        this.anchorElement.addEventListener(
          'click',
          this.handleAnchorClick.bind(this),
        )
      }
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.cdgPopoverContentElement,
        this.direction,
        'cdg-popover-floating-container',
        false,
        false,
        true,
        false,
      )
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    this[attr] = newValue
  }

  handleAnchorClick() {
    this.open = true
  }

  handleAnchorBlur() {
    this.open = false
  }
}
