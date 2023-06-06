export class CdgTagBoxItem extends HTMLElement {
  closeElement
  iconContainer

  get error() {
    return this.hasAttribute('error')
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', '')
    } else {
      this.removeAttribute('error')
    }
  }

  get error() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  static get observedAttributes() {
    return ['error', 'persist', 'disabled']
  }

  constructor() {
    super()
    if (!this.hasAttribute('persist')) {
      this.iconContainer = document.createElement('button')
      this.iconContainer.classList.add('cdg-tag-box-item-close-button')
      this.iconContainer.setAttribute('aria-label', 'Remove item button')
      this.closeElement = document.createElement('cdg-icon')
      this.closeElement.setAttribute('name', 'close')
      this.closeElement.setAttribute('size', '12')
      this.iconContainer.appendChild(this.closeElement)
      if (!this.querySelector('button.cdg-tag-box-item-close-button')) {
        this.appendChild(this.iconContainer)
      }
      this.error = this.hasAttribute('error')
      this.disabled = this.hasAttribute('disabled')
      this.iconContainer.addEventListener('click', () =>
        this.handleDispatchEvent('onRemoveItem'),
      )
    }
    if (this.hasAttribute('icon-name')) {
      const icon = document.createElement('cdg-icon')
      icon.setAttribute('name', this.getAttribute('icon-name'))
      icon.setAttribute('size', '12')
      if (this.hasAttribute('icon-color')) {
        icon.style.color = this.getAttribute('icon-color')
      }
      this.prepend(icon)
    }

    this.addEventListener('click', () => this.handleDispatchEvent('onClick'))
  }

  handleDispatchEvent(eventName) {
    if (this.hasAttribute('disabled')) return
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {value: this.getAttribute('value') || this.textContent},
      }),
    )
  }

  connectedCallback() {
    this.classList.add('cdg-tag-box-item')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return

    switch (attr) {
      case 'error':
        this.error = this.hasAttribute('error')
        break
      case 'disabled':
        this.disabled = this.hasAttribute('disabled')
        break

      default:
        break
    }
  }
}
