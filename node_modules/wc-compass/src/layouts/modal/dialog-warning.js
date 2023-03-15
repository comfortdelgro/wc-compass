import { CdgDialogBase } from './dialog.base';

export class CdgDialogWarning extends CdgDialogBase {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('cdg-dialog-warning');
    this.attachFooter();
  }

  attachFooter() {
    this.actions = document.createElement('cdg-dialog-actions');
    this.actions.classList.add('right');

    this.cancelButton = document.createElement('button');
    this.cancelButton.setAttribute('class', 'cdg-button secondary cancel');
    this.cancelButton.textContent = this.cancelLabel || 'Cancel';
    this.closeListener = this.close.bind(this, false);
    this.cancelButton.addEventListener('click', this.closeListener);

    this.executeButton = document.createElement('button');
    this.executeButton.setAttribute('class', 'cdg-button danger');
    this.executeButton.textContent = this.executeLabel || 'Okay';
    this.executeListener = this.close.bind(this, true);
    this.executeButton.addEventListener('click', this.executeListener);

    this.actions.appendChild(this.cancelButton);
    this.actions.appendChild(this.executeButton);
    this.appendChild(this.actions);
  }
}
