export class DialogService {
  modals = {};

  show(id, modal) {
    const modalElement = this.wrapByOverlay(modal);
    modal.id = id;
    this.modals[id] = modalElement;
    document.body.appendChild(modalElement);
  }

  alert({ dialogTitle = '', message = '', buttonLabel = 'Okay' }) {
    const alert = document.createElement('cdg-dialog-alert');
    alert.setAttribute('dialogTitle', dialogTitle);
    alert.setAttribute('message', message);
    alert.setAttribute('executeLabel', buttonLabel);
    this.show('alert' + new Date().getTime(), alert);
    return alert;
  }

  success(title, message) {
    console.log('Show alert with title & message');
  }

  error(title, message) {
    console.log('Show alert with title & message');
  }

  confirm({
    dialogTitle = '',
    message = '',
    executeLabel = 'Okay',
    cancelLabel = 'Cancel',
  }) {
    const alert = document.createElement('cdg-dialog-confirm');
    alert.setAttribute('dialogTitle', dialogTitle);
    alert.setAttribute('message', message);
    alert.setAttribute('executeLabel', executeLabel);
    alert.setAttribute('cancelLabel', cancelLabel);
    this.show('alert' + new Date().getTime(), alert);
    return alert;
  }

  confirmCustom({ content, executeLabel = 'Okay', cancelLabel = 'Cancel' }) {
    const alert = document.createElement('cdg-dialog-confirm');
    alert.appendChild(content);
    alert.setAttribute('useCustomContent', 'true');
    alert.setAttribute('executeLabel', executeLabel);
    alert.setAttribute('cancelLabel', cancelLabel);
    this.show('alert' + new Date().getTime(), alert);
    return alert;
  }

  warning({
    dialogTitle = '',
    message = '',
    executeLabel = 'Okay',
    cancelLabel = 'Cancel',
  }) {
    const alert = document.createElement('cdg-dialog-warning');
    alert.setAttribute('dialogTitle', dialogTitle);
    alert.setAttribute('message', message);
    alert.setAttribute('executeLabel', executeLabel);
    alert.setAttribute('cancelLabel', cancelLabel);
    this.show('alert' + new Date().getTime(), alert);
    return alert;
  }

  hide(id, answer) {
    if (!this.modals[id]) {
      console.error('Can not find this id');
      return;
    }

    this.modals[id].firstElementChild.dispatchEvent(
      new CustomEvent('close', { detail: answer })
    );

    document.body.removeChild(this.modals[id]);
    delete this.modals[id];
  }

  wrapByOverlay(modal) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('cdg-modal-overlay');
    wrapper.appendChild(modal);
    return wrapper;
  }
}
