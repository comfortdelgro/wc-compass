export class CdgModal extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  set id(id) {
    this.setAttribute('id', id);
  }

  modalHeader;
  closeListener;
  keyListener;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-modal');
    this.setAttribute('aria-modal', true);
    this.modalHeader = this.querySelector('cdg-modal-header');
    this.closeEventListener = this.close.bind(this);
    this.keyListener = this.handleKeydown.bind(this);
    this.modalHeader.addEventListener('close', this.closeEventListener);
    this.addEventListener('keydown', this.keyListener);
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this.removeEventListener('keydown', this.keyListener);
    this.modalHeader.removeEventListener('close', this.closeEventListener);
    cdgDialogService.hide(this.id);
  }
}
