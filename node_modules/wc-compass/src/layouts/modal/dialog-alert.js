import { CdgDialogBase } from './dialog.base';

export class CdgDialogAlert extends CdgDialogBase {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('cdg-dialog-alert');
    this.attachFooter();
  }

  attachFooter() {
    this.actions = document.createElement('cdg-dialog-actions');
    this.actions.classList.add('center');
    this.executeButton = document.createElement('button');
    this.executeButton.setAttribute('class', 'cdg-button secondary');
    this.executeButton.textContent = this.executeLabel || 'Okay';
    this.closeListener = this.close.bind(this);
    this.executeButton.addEventListener('click', this.closeListener);

    this.actions.appendChild(this.executeButton);
    this.appendChild(this.actions);
  }
}
