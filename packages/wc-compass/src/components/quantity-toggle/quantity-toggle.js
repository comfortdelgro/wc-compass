export class CdgQuantityToggle extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'max', 'min', 'disabled'];
  }

  get value() {
    return Number(this.getAttribute('value'));
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get max() {
    return Number(this.getAttribute('max'));
  }

  set max(max) {
    this.setAttribute('max', max);
  }

  get min() {
    return Number(this.getAttribute('min'));
  }

  set min(min) {
    this.setAttribute('min', min);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(disabled) {
    if (this.disabled) {
      this.setAttribute('disabled', disabled);
    } else {
      this.removeAttribute('disabled');
    }
  }

  input;
  increaseButton;
  decreaseButton;

  // When user has changed the value
  dirty;
  errors = {};

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-quantity-toggle');
    const buttons = this.querySelectorAll('button');
    if (buttons && buttons.length) {
      this.decreaseButton = buttons[0];
      this.decreaseButton.addEventListener(
        'click',
        this.handleDecrease.bind(this)
      );

      this.increaseButton = buttons[1];
      this.increaseButton.addEventListener(
        'click',
        this.handleIncrease.bind(this)
      );
    } else {
      console.error('You must add the two buttons follow the guidelines');
    }

    this.input = this.querySelector('input[type="number"');
    this.input.addEventListener('input', () => {
      this.value = this.input.value;
      this.dirty = true;
    });

    this.handleDisabled();
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'value':
        this.dispatchEvent(new Event('change'));
        if (this.input) {
          this.input.value = this.value;
          this.handleMinError();
          this.handleMaxError();
          this.checkErrors();
        }
        break;

      case 'max':
        this.handleMaxError();
        break;

      case 'min':
        this.handleMinError();
        break;

      case 'disabled':
        this.handleDisabled();
        break;

      default:
        break;
    }
  }

  handleDisabled() {
    if (this.input) {
      this.input.disabled = this.disabled;
    }
    if (this.increaseButton) {
      this.increaseButton.disabled = this.disabled;
    }
    if (this.decreaseButton) {
      this.decreaseButton.disabled = this.disabled;
    }
  }

  handleDecrease() {
    let value = (this.value || 0) - 1;
    value = value >= 0 ? value : 0;
    if (this.value !== value) {
      this.value = value;
    }
  }

  handleIncrease() {
    this.value = (this.value || 0) + 1;
  }

  handleMaxError() {
    if (!this.max || !this.input) {
      return;
    }

    const error = this.input.value > this.max;
    if (error) {
      this.errors.max = 'Value should be less than ' + this.max;
    } else {
      delete this.errors.max;
    }
  }

  handleMinError() {
    if (!this.min || !this.input) {
      return;
    }

    const error = this.input.value < this.min;
    if (error) {
      this.errors.min = 'Value should be greater than ' + this.min;
    } else {
      delete this.errors.min;
    }
  }

  checkErrors() {
    const errors = Array.from(Object.keys(this.errors));
    if (errors.length) {
      this.classList.add('error');
    } else {
      this.classList.remove('error');
    }
    this.dispatchEvent(new CustomEvent('validChange', { detail: this.errors }));
  }
}
