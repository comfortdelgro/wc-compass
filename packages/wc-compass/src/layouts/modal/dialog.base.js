export class CdgDialogBase extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  set id(id) {
    this.setAttribute('id', id);
  }

  static get observedAttributes() {
    return ['message', 'dialogTitle'];
  }

  get dialogTitle() {
    return this.getAttribute('dialogTitle');
  }

  set dialogTitle(dialogTitle) {
    this.setAttribute('dialogTitle', dialogTitle);
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(message) {
    this.setAttribute('message', message);
  }

  get executeLabel() {
    return this.getAttribute('executeLabel');
  }

  set executeLabel(executeLabel) {
    this.setAttribute('executeLabel', executeLabel);
  }

  get cancelLabel() {
    return this.getAttribute('cancelLabel');
  }

  set cancelLabel(cancelLabel) {
    this.setAttribute('cancelLabel', cancelLabel);
  }

  get useCustomContent() {
    return this.getAttribute('useCustomContent') === 'true';
  }

  set useCustomContent(useCustomContent) {
    this.setAttribute('useCustomContent', useCustomContent);
  }

  content;
  titleElement;
  messageElement;
  actions;
  executeButton;
  cancelButton;
  closeListener;
  executeListener;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-dialog');
    this.attachContent();
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'title':
        this.updateTitle();
        break;

      case 'message':
        this.updateMessage();
        break;

      default:
        break;
    }
  }

  attachContent() {
    if (this.useCustomContent) {
      return;
    }

    this.content = document.createElement('dig');
    this.content.classList.add('cdg-dialog-content');
    this.appendChild(this.content);

    if (this.dialogTitle) {
      this.titleElement = document.createElement('h4');
      this.titleElement.classList.add('cdg-dialog-title');
      this.titleElement.textContent = this.dialogTitle;
      this.content.appendChild(this.titleElement);
    }

    if (this.message) {
      this.messageElement = document.createElement('div');
      this.messageElement.classList.add('cdg-dialog-message');
      this.messageElement.textContent = this.message;
      this.content.appendChild(this.messageElement);
    }
  }

  updateTitle() {
    if (!this.titleElement) {
      return;
    }
    this.titleElement.textContent = this.title;
  }

  updateMessage() {
    if (!this.messageElement) {
      return;
    }
    this.messageElement.textContent = this.message;
  }

  close(answer) {
    this.executeButton.removeEventListener('click', this.closeListener);
    cdgDialogService.hide(this.id, answer);
  }
}
