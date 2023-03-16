export class CdgFileUpload extends HTMLElement {
  static get observedAttributes() {
    return ['fileName', 'state'];
  }

  get fileName() {
    return this.getAttribute('fileName');
  }

  set fileName(fileName) {
    this.setAttribute('fileName', fileName);
  }

  get state() {
    return this.getAttribute('state');
  }

  set state(state) {
    this.setAttribute('state', state);
  }

  nameElement;
  iconElement;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-file-upload');
    this.nameElement = document.createElement('div');
    this.nameElement.textContent = this.fileName;

    this.prepend(this.nameElement);
    this.attachIcon();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'fileName':
        if (this.nameElement) {
          this.nameElement.textContent = this.fileName;
        }
        break;

      case 'state':
        this.classList.remove(oldVal);
        this.classList.add(newVal);
        this.attachIcon();
        break;

      default:
        break;
    }
  }

  attachIcon() {
    if (this.iconElement && this.contains(this.iconElement)) {
      this.removeChild(this.iconElement);
    }
    switch (this.state) {
      case 'uploading':
        this.iconElement = document.createElement('cdg-loading');
        this.iconElement.setAttribute('size', 'small');
        break;

      case 'error':
        this.iconElement = document.createElement('cdg-icon');
        this.iconElement.setAttribute('name', 'warning');
        this.iconElement.setAttribute('size', '16');
        this.iconElement.setAttribute('source', 'host');
        break;

      case 'success':
        this.iconElement = document.createElement('cdg-icon');
        this.iconElement.setAttribute('name', 'ticks');
        this.iconElement.setAttribute('size', '16');
        break;

      case 'close':
        this.iconElement = document.createElement('cdg-icon');
        this.iconElement.setAttribute('name', 'crossCircle');
        this.iconElement.setAttribute('source', 'host');
        this.iconElement.setAttribute('size', '16');
        this.iconElement.tabIndex = 0;
        break;

      case 'downloadable':
        this.iconElement = document.createElement('cdg-icon');
        this.iconElement.setAttribute('name', 'download');
        this.iconElement.setAttribute('source', 'host');
        this.iconElement.setAttribute('size', '16');
        this.iconElement.tabIndex = 0;
        break;

      default:
        break;
    }

    this.appendChild(this.iconElement);
  }
}
