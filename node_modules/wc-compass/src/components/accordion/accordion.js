export class CdgAccordion extends HTMLElement {
  isOpen = false;
  header;
  content;
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-acordion');
    this.header = this.querySelector('cdg-accordion-header');
    this.content = this.querySelector('cdg-accordion-content');
    this.header &&
      this.header.addEventListener('toggle', this.handleToggle.bind(this));

    if (this.hasAttribute('opened')) {
      this.open();
    }
  }

  handleToggle() {
    this.isOpen = !this.isOpen;
    this.classList.toggle('open');
    if (this.isOpen) {
      this.content.style.maxHeight = this.content.scrollHeight + 'px';
    } else {
      this.content.style.maxHeight = '0px';
    }
  }

  open() {
    this.isOpen = true;
    this.classList.add('open');
    this.content.style.maxHeight = this.content.scrollHeight + 'px';
  }
}
