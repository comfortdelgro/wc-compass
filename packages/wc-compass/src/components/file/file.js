const FILE_LABEL = `<span class="cdg-file-name">No file chosen</span>
  <span class="cdg-file-extension"></span>`;
const FILE_DROP_LABEL = `<div class="cdg-drop-label">or Drop Files</div>`;
const FILE_DROP_VERTICAL_LABEL = `
<cdg-icon name="cloudUpload" size="32"></cdg-icon>
<div class="cdg-drop-label">Drag&Drop files here</div>
<div class="cdg-drop-sub-label">or</div>
`;

export class CdgFile extends HTMLElement {
  get allowDrag() {
    return this.hasAttribute('allow-drop');
  }

  get vertical() {
    return this.hasAttribute('vertical');
  }

  get fileName() {
    if (!this.files.length) {
      return '';
    }
    const splitDot = this.files[0].name.split('.');
    return splitDot.slice(0, splitDot.length - 1).join('.');
  }

  get fileExtension() {
    if (!this.files.length) {
      return '';
    }
    const splitDot = this.files[0].name.split('.');
    return '.' + splitDot[splitDot.length - 1];
  }

  inputFile;
  fileExtensionElement;
  fileNameElement;
  files;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-file');
    const wrapper = document.createElement('div');
    wrapper.classList.add('cdg-file-name-wrapper');
    wrapper.innerHTML = this.allowDrag
      ? this.vertical
        ? FILE_DROP_VERTICAL_LABEL
        : FILE_DROP_LABEL
      : FILE_LABEL;

    this.inputFile = this.querySelector('input[type="file"]');
    if (this.vertical) {
      this.prepend(wrapper);
    } else {
      this.insertBefore(wrapper, this.inputFile);
    }

    if (!this.allowDrag) {
      this.fileNameElement = this.querySelector('.cdg-file-name');
      this.fileExtensionElement = this.querySelector('.cdg-file-extension');
    }
    this.inputFile.addEventListener('input', this.handleInputFile.bind(this));
    this.addEventListener('dragover', this.handleDragOver.bind(this));
    this.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  handleDragOver() {
    this.classList.add('dragover');
  }
  handleDragLeave() {
    this.classList.remove('dragover');
  }

  handleInputFile(event) {
    this.classList.remove('dragover');
    if (event.target.files.length) {
      this.files = event.target.files;
      this.updateFileName();
      this.classList.add('inputed');
      this.dispatchEvent(
        new CustomEvent('selectFiles', { detail: this.files })
      );
    }
  }

  updateFileName() {
    if (!this.allowDrag) {
      this.fileNameElement.textContent = this.fileName;
      this.fileExtensionElement.textContent = this.fileExtension;
    }
  }
}
