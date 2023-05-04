import {CdgDocumentComponent} from '../../shared/document-component'
import template from './toast.html'

export class CdgToastDemo extends CdgDocumentComponent {
  color = ''

  colorConfig

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.colorConfig = document.querySelector('#colorConfig')
    this.colorConfig.addEventListener('onchangevalue', (event) => {
      this.color = event.detail
    })

    const showToastButton = this.querySelector('#showToastButton')
    showToastButton.addEventListener('click', this.showToast.bind(this))

    const showSimpleButton = this.querySelector('#showSimpleButton')
    showSimpleButton.addEventListener('click', this.showSimple.bind(this))

    const showUndoButton = this.querySelector('#showUndoButton')
    showUndoButton.addEventListener('click', this.showUndo.bind(this))

    const showToastActionsButton = this.querySelector('#showToastActionsButton')
    showToastActionsButton.addEventListener(
      'click',
      this.showToastActions.bind(this),
    )

    const showToastHeaderButton = this.querySelector('#showToastHeaderButton')
    showToastHeaderButton.addEventListener(
      'click',
      this.showToastHeader.bind(this),
    )

    const quickToastButton = this.querySelector('#quickToastButton')
    quickToastButton.addEventListener('click', this.quickToast.bind(this))

    const quickToastIconButton = this.querySelector('#quickToastIconButton')
    quickToastIconButton.addEventListener(
      'click',
      this.quickToastIcon.bind(this),
    )
  }

  showToast() {
    const toast = document.createElement('cdg-toast')
    toast.setAttribute('color', this.color)

    const id = 'default' + new Date().getTime()
    toast.textContent = 'Sample ' + id
    cdgToastService.show(id, toast)
  }

  showSimple() {
    const toast =
      this.querySelector('#simpleToast').content.firstElementChild.cloneNode(
        true,
      )
    toast.setAttribute('color', this.color)

    const closeButton = toast.querySelector('#toast-close-button')
    const id = 'simple' + new Date().getTime()
    closeButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    cdgToastService.show(id, toast, {
      autoHideAfter: 0,
    })
  }

  showUndo() {
    const toast =
      this.querySelector('#undoToast').content.firstElementChild.cloneNode(true)
    toast.setAttribute('color', this.color)

    const undoButton = toast.querySelector('#undo-button')
    const closeButton = toast.querySelector('#toast-close-button')
    const id = 'undo' + new Date().getTime()
    undoButton.addEventListener('click', () => {
      cdgToastService.close(id)
      cdgToastService.toast('User has selected Undo')
    })
    closeButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    cdgToastService.show(id, toast, {
      autoHideAfter: 0,
    })
  }

  showToastActions() {
    const toast =
      this.querySelector('#toastActions').content.firstElementChild.cloneNode(
        true,
      )
    toast.setAttribute('color', this.color)

    const closeButton = toast.querySelector('#toast-close-button')
    const dismissButton = toast.querySelector('#dismiss-button')
    const id = 'actions' + new Date().getTime()
    closeButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    dismissButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    cdgToastService.show(id, toast, {
      autoHideAfter: 5000,
    })
  }

  showToastHeader() {
    const toast =
      this.querySelector('#toastHeader').content.firstElementChild.cloneNode(
        true,
      )
    toast.setAttribute('color', this.color)

    const executeButton = toast.querySelector('#toast-execute-button')
    const closeButton = toast.querySelector('#toast-close-button')
    const dismissButton = toast.querySelector('#dismiss-button')
    const id = 'header' + new Date().getTime()
    executeButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    closeButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    dismissButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })
    cdgToastService.show(id, toast, {
      autoHideAfter: 0,
    })
  }

  quickToast() {
    cdgToastService.toast('This is a quick toast')
  }

  quickToastIcon() {
    cdgToastService.toast('This is a quick toast with custom icon', {
      name: 'shapes',
      color: '#0142af',
    })
  }
}
