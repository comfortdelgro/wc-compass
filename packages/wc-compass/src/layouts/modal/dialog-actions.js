export class CdgDialogActions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-dialog-actions');
  }
}
