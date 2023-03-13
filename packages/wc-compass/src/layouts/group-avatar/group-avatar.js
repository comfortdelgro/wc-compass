export class CdgGroupAvatar extends HTMLElement {
  static get observedAttributes() {
    return ['more'];
  }

  get more() {
    return Number(this.getAttribute('more'));
  }

  set more(more) {
    this.setAttribute('more', more);
  }

  moreAvatar;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-group-avatar');

    if (this.more) {
      this.addMoreAvatar();
    }
  }

  attributeChangedCallback(attr) {
    if (attr === 'more' && this.more) {
      this.addMoreAvatar();
    }
  }

  addMoreAvatar() {
    if (this.moreAvatar) {
      this.moreAvatar.setAttribute('name', '+' + this.more);
    } else {
      this.moreAvatar = document.createElement('cdg-avatar');
      this.moreAvatar.setAttribute('size', 32);
      this.moreAvatar.setAttribute('useFullName', true);
      this.moreAvatar.setAttribute('name', '+' + this.more);
      this.appendChild(this.moreAvatar);
    }
  }
}
