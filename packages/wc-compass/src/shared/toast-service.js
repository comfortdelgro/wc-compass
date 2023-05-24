import {swapChild} from './dom'

const ANIMATION_TIME = 300

export class ToastIcon {
  name = 'info'
  color = '#009eda'
}

export class ToastConfig {
  autoHideAfter = 3000
}

export class Toast {
  timer
  fadeOutTimer

  constructor(id, toast, config) {
    this.id = id
    this.toast = toast
    this.toast.id = id
    this.config = config
  }

  close(hide) {
    this.toast.classList.add('fade-out')
    this.fadeOutTimer = setTimeout(() => {
      hide(this.id, null)
    }, ANIMATION_TIME)
  }

  hideAfter(hide) {
    if (this.config.autoHideAfter) {
      this.timer = setTimeout(() => {
        this.close(hide)
      }, this.config.autoHideAfter)
    }
  }
}

export class ToastService {
  toasts = {}
  container
  constructor() {
    this.addContainer()
  }

  show(id, toast, config = new ToastConfig()) {
    this.toasts[id] = new Toast(id, toast, config)
    this.toasts[id].hideAfter(this.hide.bind(this))
    this.container.prepend(toast)
    return toast
  }

  toast(message, icon = new ToastIcon(), config) {
    const toast = document.createElement('cdg-toast')
    const header = document.createElement('cdg-toast-header')
    const messageElement = document.createElement('cdg-toast-message')
    messageElement.textContent = message
    const iconElement = document.createElement('cdg-icon')
    iconElement.setAttribute('name', icon.name)
    iconElement.style.color = icon.color
    header.appendChild(iconElement)
    header.appendChild(messageElement)
    toast.appendChild(header)

    this.show('toast' + new Date().getTime(), toast, config)
    return toast
  }

  update(id, toast) {
    if (!this.toasts[id]) {
      return
    }

    const toastElement = this.toasts[id].toast
    swapChild(toast, toastElement)
  }

  close(id) {
    if (!this.toasts[id]) {
      console.error('Can not find this id')
      return
    }
    this.toasts[id].close(this.hide.bind(this))
  }

  hide(id, answer) {
    if (!this.toasts[id]) {
      console.error('Can not find this id')
      return
    }

    this.toasts[id].toast.dispatchEvent(
      new CustomEvent('close', {detail: answer}),
    )

    this.container.removeChild(this.toasts[id].toast)
    delete this.toasts[id]
  }

  addContainer() {
    this.container = document.createElement('div')
    this.container.classList.add('cdg-toast-container')
    document.addEventListener('readystatechange', () => {
      document.body.appendChild(this.container)
    })
  }
}
