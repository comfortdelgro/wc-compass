import { createFloating } from '../floating-content/floating-content';

const templateClearOption = document.createElement('template');
templateClearOption.innerHTML = `
  <div class="cdg-dropdown-option-header">
    <div class="cdg-dropdown-option-header-label"></div>
    <div class="cdg-dropdown-option-header-actions">
      <button
        class="cdg-dropdown-option-clear-button"
        type="danger"
      >
        Clear
      </button>
    </div>
  </div>
`;

export class CdgDropdownSelect extends HTMLElement {
  floatingElement;

  static get observedAttributes() {
    return ['opening', 'header-title'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-dropdown-select');
    if (!this.floatingElement) {
      this.floatingElement = createFloating.bind(this)(
        this.parentNode,
        null,
        'bottomLeft',
        'cdg-dropdown-select-floating-container',
        true,
        false,
        true
      );
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (attr) {
      case 'opening':
        if (newValue) {
          if (this.floatingElement) {
            this.floatingElement.setAttribute('opening', 'true');
          }
        } else {
          if (this.floatingElement) {
            this.floatingElement.removeAttribute('opening');
          }
        }
        break;
      case 'header-title':
        if (newValue) {
          this.prepend(templateClearOption.content.cloneNode(true));
          this.headerLabel = this.querySelector(
            'div.cdg-dropdown-option-header-label'
          );
          this.headerLabel.textContent = newValue;
          const clearButton = this.querySelector(
            'button.cdg-dropdown-option-clear-button'
          );
          clearButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('onDropdownClear'));
          });
        }
        break;

      default:
        break;
    }
  }
}
