import { CdgIconSize } from '../../shared/core.js';

export class CdgAvatar extends CdgIconSize {
  static get observedAttributes() {
    return ['size', 'name'];
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(name) {
    this.setAttribute('name', name);
  }

  get size() {
    return Number(this.getAttribute('size'));
  }

  set size(size) {
    this.setAttribute('size', size);
  }

  get useFullName() {
    return this.hasAttribute('useFullName');
  }

  nameElement;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-avatar');

    const type = this.getAttribute('type');
    if (this.hasAttribute('imageSrc')) {
      this.displayAsImage();
    }
    this.nameElement = this.querySelector('.avatar-text');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'size') {
      this.addCustomSize();
    } else if (attr === 'name' && !this.hasAttribute('imageSrc')) {
      this.nameElement = this.querySelector('.avatar-text');
      this.addName();
    }
  }

  displayAsImage() {
    const img = document.createElement('img');
    img.classList.add('avatar-image');
    img.src = this.getAttribute('imageSrc');
    img.alt = this.hasAttribute('alt')
      ? this.getAttribute('alt')
      : 'Avatar image';
    this.appendChild(img);
  }

  addName() {
    const text = this.useFullName ? this.name : this.getShortName(this.name);
    if (this.nameElement) {
      this.nameElement.textContent = text;
    } else {
      this.nameElement = document.createElement('span');
      this.nameElement.classList.add('avatar-text');
      this.nameElement.textContent = text;
      this.nameElement.alt = this.hasAttribute('alt')
        ? this.getAttribute('alt')
        : 'Avatar image';

      this.appendChild(this.nameElement);
    }
  }

  getShortName(name) {
    if (!name) {
      return '';
    }

    const splited = name.split(' ');
    const firstChar = splited[0][0];
    let lastChar = '';
    if (splited.length > 1) {
      lastChar = splited[splited.length - 1][0];
    }
    return firstChar + lastChar;
  }
}
