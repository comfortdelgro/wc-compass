export class CdgDropdownOption extends HTMLElement {
  colorElement;
  tickElement;
  multiple = false;

  static get observedAttributes() {
    return ['selected', 'current-color'];
  }

  constructor() {
    super();
    this.tickElement = document.createElement('cdg-icon');
    this.tickElement.setAttribute('name', 'tick');
    this.tickElement.setAttribute('size', '10');
    this.multiple = this.hasAttribute('multiple');
  }

  connectedCallback() {
    this.classList.add('cdg-dropdown-option');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (attr) {
      case 'selected':
        if (newValue) {
          this.classList.add('cdg-dropdown-option-selected');
          if (!this.multiple) {
            if (this.getAttribute('current-color')) {
              this.color.appendChild(this.tickElement);
            } else {
              this.tickElement.classList.add('cdg-icon-color-dropdown');
              this.appendChild(this.tickElement);
            }
          }
        } else {
          if (!this.multiple) {
            if (this.getAttribute('current-color')) {
              this.color.removeChild(this.tickElement);
            } else {
              this.removeChild(this.tickElement);
            }
          }
          this.classList.remove('cdg-dropdown-option-selected');
        }
        break;
      case 'current-color':
        if (newValue) {
          this.classList.add('cdg-dropdown-option-flex');
          this.color = document.createElement('div');
          this.color.classList.add('cdg-dropdown-option-color');
          this.color.style.backgroundColor = newValue;
          this.appendChild(this.color);
        }
        break;

      default:
        break;
    }
  }
}
