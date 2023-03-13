export class CdgModal extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  set id(id) {
    this.setAttribute('id', id);
  }

  modalHeader;
  closeListener;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-modal');
    this.modalHeader = this.querySelector('cdg-modal-header');
    this.closeEventListener = this.close.bind(this);
    this.modalHeader.addEventListener('close', this.closeEventListener);
  }

  close() {
    this.modalHeader.removeEventListener('close', this.closeEventListener);
    cdgDialogService.hide(this.id);
  }
}
