import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSidebar extends CdgBaseComponent {
  get id() {
    return this.getAttribute('id')
  }

  set id(id) {
    this.setAttribute('id', id)
  }

  modalHeader
  closeListener

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-sidebar')
    this.modalHeader = this.querySelector('cdg-sidebar-header')
    this.closeEventListener = this.close.bind(this)
    this.modalHeader.addEventListener('close', this.closeEventListener)
  }

  close() {
    this.modalHeader.removeEventListener('close', this.closeEventListener)
    cdgDialogService.hide(this.id)
  }
}
