import {CdgDialogBase} from './dialog.base'

function createContentDialog(title, message, imageName = 'dialog-success') {
  const template = document.createElement('template')
  template.innerHTML = `
    <div class="cdg-dialog-content">
      <div class="cdg-dialog-content-image">
        <img src="images/${imageName}.png" />
      </div>
      <h4 class="cdg-dialog-title">${title}</h4>
      <p class="cdg-dialog-message">
        ${message}
      </p>
    </div>
  `
  return template
}

export class CdgDialogStatus extends CdgDialogBase {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add(
      'cdg-dialog-status',
      'cdg-animate__animated',
      this.hasAttribute('animation')
        ? this.getAttribute('animation')
        : 'cdg-animate__zoomInDown',
    )
    if (!this.children.length) {
      this.append(
        createContentDialog(
          this.getAttribute('title') || '',
          this.getAttribute('message') || '',
          this.getAttribute('status') === 'success'
            ? 'dialog-success'
            : 'dialog-error',
        ).content.cloneNode(true),
      )
    }

    this.attachFooter()
  }

  attachFooter() {
    this.actions = document.createElement('cdg-dialog-actions')
    this.actions.classList.add('center')
    this.executeButton = document.createElement('button')
    this.executeButton.setAttribute('execute-button', '')
    this.executeButton.setAttribute('class', 'cdg-button secondary')
    this.executeButton.textContent = this.executeLabel || 'Okay'
    this.closeListener = this.close.bind(this)
    this.executeButton.addEventListener('click', this.closeListener)

    this.actions.appendChild(this.executeButton)
    this.appendChild(this.actions)
  }
}
