export class CdgGroupImageViewer extends HTMLElement {
  static get observedAttributes() {
    return ['src']
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(src) {
    this.setAttribute('src', src)
  }

  closeButton
  viewer
  controls

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-group-image-viewer')

    this.controls = document.createElement('div')
    this.controls.classList.add('cdg-image-viewer-controls')

    this.closeButton = document.createElement('button')
    this.closeButton.classList.add('cdg-button', 'icon', 'ghost')
    const closeIcon = document.createElement('cdg-icon')
    closeIcon.setAttribute('name', 'close')
    this.closeButton.appendChild(closeIcon)
    this.closeButton.addEventListener('click', this.handleClose.bind(this))

    this.controls.appendChild(this.closeButton)
    this.appendChild(this.controls)

    this.viewer = this.querySelector('cdg-image-viewer')
    this.viewer.addEventListener('swipeClose', () => {
      this.close()
    })
  }

  // To prevent double click on close button
  handleClose() {
    this.removeChild(this.controls)
    this.viewer.close()
  }

  close() {
    if (this && this.parentElement && this.parentElement.hasChildNodes(this)) {
      this.parentElement.removeChild(this)
    }
  }
}
