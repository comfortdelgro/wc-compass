import {CdgDialogBase} from './dialog.base'

function createContentDialog(title, message, status) {
  const template = document.createElement('template')
  const playerLink =
    status === 'success'
      ? 'https://assets.lottiefiles.com/packages/lf20_jbrw3hcz.json'
      : 'https://assets4.lottiefiles.com/packages/lf20_tl52xzvn.json'

  template.innerHTML = `
    <div class="cdg-dialog-content">
      <div class="cdg-dialog-content-image">
        <lottie-player
          src="${playerLink}"
          background="transparent"
          speed="1"
          style="width: 230px; height: 230px"
          loop
          autoplay
        />
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
      'cdg-animate__zoomInDown',
    )
    if (!this.children.length) {
      this.append(
        createContentDialog(
          this.getAttribute('title') || '',
          this.getAttribute('message') || '',
          this.getAttribute('status') || 'success',
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
