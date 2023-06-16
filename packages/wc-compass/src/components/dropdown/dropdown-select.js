import {createFloating} from '../floating-content/floating-content'

const templateClearOption = document.createElement('template')
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
`

export class CdgDropdownSelect extends HTMLElement {
  floatingElement

  static get observedAttributes() {
    return ['open', 'header-title']
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-dropdown-select')
    if (!this.floatingElement) {
      this.floatingElement = createFloating.bind(this)(
        this.parentNode,
        null,
        'bottomLeft',
        ['cdg-dropdown-select-floating-container'],
        true,
        false,
        true,
      )
    }

    if (!this.handleWindowResizeFn) {
      this.handleWindowResizeFn = this.handleWindowResize.bind(this)
    }

    window.addEventListener('resize', this.handleWindowResizeFn)
  }

  handleWindowResize() {
    if (this.rootElement && this.floatingElement) {
      const rootBound = this.rootElement.getBoundingClientRect()
      this.floatingElement.style.minWidth = `${this.rootElement.clientWidth}px`
      this.floatingElement.style.left = `${rootBound.left}px`
      if (this.clientHeight + rootBound.bottom > window.innerHeight) {
        // Wait for open to change top position
        setTimeout(() => {
          this.floatingElement.style.top = `${
            rootBound.top - this.clientHeight
          }px`
        })
      } else {
        this.floatingElement.style.top = `${rootBound.top + rootBound.height}px`
      }
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleWindowResizeFn)
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (attr) {
      case 'open':
        if (newValue) {
          if (this.floatingElement) {
            this.floatingElement.setAttribute('open', 'true')
            this.handleWindowResizeFn()
          }
        } else {
          if (this.floatingElement) {
            this.floatingElement.removeAttribute('open')
          }
        }
        break
      case 'header-title':
        if (newValue) {
          this.prepend(templateClearOption.content.cloneNode(true))
          this.headerLabel = this.querySelector(
            'div.cdg-dropdown-option-header-label',
          )
          this.headerLabel.textContent = newValue
          const clearButton = this.querySelector(
            'button.cdg-dropdown-option-clear-button',
          )
          clearButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('onDropdownClear'))
          })
        }
        break

      default:
        break
    }
  }
}
