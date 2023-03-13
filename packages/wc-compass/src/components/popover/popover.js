import { createFloating, DIRECTIONS } from '../floating-content/floating-content';

export class CdgPopover extends HTMLElement {
  floatingElement;
  anchorElement;
  cdgPopoverContentElement;
  _direction = 'bottom';
  _open = false;

  get direction() {
    return this._direction ? 'bottom' : this._direction;
  }

  set direction(value) {
    this._direction = !DIRECTIONS.includes(value) ? 'bottom' : value;
    if (this.floatingElement) {
      this.floatingElement.setAttribute('placement', this._direction);
    }
  }

  get open() {
    return this._open;
  }

  set open(value) {
    if (this.floatingElement) {
      if (value) {
        this.floatingElement.setAttribute('opening', 'true');
      } else {
        this.removeAttribute('open');
        this.floatingElement.removeAttribute('opening');
      }
    }
    this._open = value;
  }

  static get observedAttributes() {
    return ['direction', 'open'];
  }

  constructor() {
    super();
    this.cdgPopoverContentElement = this.querySelector('cdg-popover-content');
  }

  connectedCallback() {
    this.classList.add('cdg-popover');
    if (!this.floatingElement) {
      if (!this.anchorElement) {
        this.anchorElement = this.querySelector('[cdg-popover-header]');
        this.anchorElement.addEventListener(
          'blur',
          this.handleAnchorBlur.bind(this)
        );
      }
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.cdgPopoverContentElement,
        this.direction,
        'cdg-popover-floating-container',
        false,
        false,
        true,
        false
      );
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[attr] = newValue;
  }

  handleAnchorBlur() {
    this.open = false;
  }
}
