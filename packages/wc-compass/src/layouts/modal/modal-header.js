const CLOSE_ICON = `<button is="cdg-button" class="icon ghost close-button">
  <cdg-icon name="close" size="16"></cdg-icon>
</button>`

export class CdgModalHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'use-close-cutton']
  }

  get title() {
    return this.getAttribute('title') || ''
  }

  set title(title) {
    this.setAttribute('title', title)
  }

  get useCloseButton() {
    return this.getAttribute('use-close-cutton') === 'true'
  }

  set useCloseButton(useCloseButton) {
    if (useCloseButton) {
      this.setAttribute('use-close-cutton', useCloseButton)
    } else {
      this.removeAttribute('use-close-cutton')
      if (this.closeIcon && this.modalHeaderActions.contains(this.closeIcon)) {
        this.modalHeaderActions.removeChild(this.closeIcon)
      }
    }
  }

  titleElement
  closeIcon

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-modal-header')
    this.attachCloseIcon()
  }

  disconnectedCallback() {
    this.closeIcon.removeEventListener(
      'click',
      this.handleCloseClick.bind(this),
    )
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (attr) {
      case 'title':
        this.attachTitle()
        break

      case 'use-close-cutton':
        this.useCloseButton = newValue === 'true'
        if (this.useCloseButton) {
          this.attachCloseIcon()
        }
        break

      default:
        break
    }
  }

  attachTitle() {
    if (!this.titleElement) {
      this.titleElement = document.createElement('h4')
      this.titleElement.classList.add('cdg-modal-title')
      this.prepend(this.titleElement)
    }
    this.titleElement.textContent = this.title
  }

  attachCloseIcon() {
    if (this.closeIcon) {
      return
    }

    this.modalHeaderActions = document.createElement('div')
    this.modalHeaderActions.classList.add('cdg-modal-header-actions')
    this.modalHeaderActions.innerHTML = CLOSE_ICON
    this.append(this.modalHeaderActions)

    this.closeIcon = this.modalHeaderActions.querySelector('.close-button')
    this.closeIcon.addEventListener('click', this.handleCloseClick.bind(this))
  }

  handleCloseClick() {
    this.dispatchEvent(new CustomEvent('close'))
  }
}
