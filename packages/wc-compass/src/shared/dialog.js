export class DialogService {
  modals = {}

  show(id, modal) {
    modal.setAttribute('role', 'dialog')
    modal.id = id
    const modalElement = this.wrapByOverlay(modal)
    this.attachDialog(id, modalElement)
  }

  showSidebar(id, modal, placement = 'right') {
    modal.setAttribute('role', 'dialog')
    modal.id = id
    const modalElement = this.wrapByOverlay(modal, placement)
    this.attachDialog(id, modalElement)
  }

  alert({dialogTitle = '', message = '', buttonLabel = 'Okay'}) {
    const alert = document.createElement('cdg-dialog-alert')
    alert.setAttribute('dialogTitle', dialogTitle)
    alert.setAttribute('message', message)
    alert.setAttribute('executeLabel', buttonLabel)
    this.show('alert' + new Date().getTime(), alert)
    return alert
  }

  isMyScriptLoaded(url) {
    const scripts = document.head.getElementsByTagName('script')
    for (var i = scripts.length; i--; ) {
      if (scripts[i].src == url) return true
    }
    return false
  }

  showStatus({status, title = '', message = '', buttonLabel = 'Okay'}) {
    if (
      !this.isMyScriptLoaded(
        'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      )
    ) {
      const lottiePlayer = document.createElement('script')
      lottiePlayer.src =
        'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
      document.head.appendChild(lottiePlayer)
    }

    const alert = document.createElement('cdg-dialog-status')
    alert.setAttribute('title', title)
    alert.setAttribute('status', status)
    alert.setAttribute('useCustomContent', 'true')
    alert.setAttribute('message', message)
    alert.setAttribute('executeLabel', buttonLabel)
    this.show('alert' + new Date().getTime(), alert)
    return alert
  }

  confirm({
    dialogTitle = '',
    message = '',
    executeLabel = 'Okay',
    cancelLabel = 'Cancel',
  }) {
    const alert = document.createElement('cdg-dialog-confirm')
    alert.setAttribute('dialogTitle', dialogTitle)
    alert.setAttribute('message', message)
    alert.setAttribute('executeLabel', executeLabel)
    alert.setAttribute('cancelLabel', cancelLabel)
    this.show('alert' + new Date().getTime(), alert)
    return alert
  }

  confirmCustom({content, executeLabel = 'Okay', cancelLabel = 'Cancel'}) {
    const alert = document.createElement('cdg-dialog-confirm')
    alert.appendChild(content)
    alert.setAttribute('useCustomContent', 'true')
    alert.setAttribute('executeLabel', executeLabel)
    alert.setAttribute('cancelLabel', cancelLabel)
    this.show('alert' + new Date().getTime(), alert)
    return alert
  }

  warning({
    dialogTitle = '',
    message = '',
    executeLabel = 'Okay',
    cancelLabel = 'Cancel',
  }) {
    const alert = document.createElement('cdg-dialog-warning')
    alert.setAttribute('dialogTitle', dialogTitle)
    alert.setAttribute('message', message)
    alert.setAttribute('executeLabel', executeLabel)
    alert.setAttribute('cancelLabel', cancelLabel)
    this.show('alert' + new Date().getTime(), alert)
    return alert
  }

  hide(id, answer) {
    if (!this.modals[id]) {
      console.error('Can not find this id')
      return
    }

    this.modals[id].ref.firstElementChild.dispatchEvent(
      new CustomEvent('close', {detail: answer}),
    )

    if (this.modals[id].lastFocus) {
      this.modals[id].lastFocus.focus()
    }

    document.body.removeChild(this.modals[id].ref)
    delete this.modals[id]
  }

  wrapByOverlay(modal, placement = '') {
    const wrapper = document.createElement('div')
    wrapper.classList.add('cdg-modal-overlay')
    if (placement) {
      wrapper.classList.add(placement)
    }
    wrapper.appendChild(modal)
    return wrapper
  }

  focusOnElement(modal) {
    const afElement = modal.querySelector('[autofocus]')
    if (afElement) {
      afElement.focus()
    } else {
      const button = modal.querySelector('[execute-button]')
      if (button) {
        button.focus()
      }
    }
  }

  /**
   * Todo: Keep focus inside dialog when user press Tab and Shift + Tab key
   * @param {string} id
   */
  keepFocus(id) {
    const ref = this.modals[id].ref
    this.modals[id].lastFocus = document.activeElement
    const focusable = ref.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
    )

    if (focusable.length) {
      focusable[0].addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && event.shiftKey) {
          focusable[focusable.length - 1].focus()
          event.preventDefault()
        }
      })
      focusable[focusable.length - 1].addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && !event.shiftKey) {
          focusable[0].focus()
          event.preventDefault()
        }
      })
    }
  }

  attachDialog(id, modalElement) {
    const modal = {}
    modal.id = id
    modal.ref = modalElement

    this.modals[id] = modal

    document.body.appendChild(modalElement)
    this.keepFocus(id)
    this.focusOnElement(modalElement)
  }
}
