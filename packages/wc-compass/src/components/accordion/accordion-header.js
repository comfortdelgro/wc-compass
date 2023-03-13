export class CdgAccordionHeader extends HTMLElement {
  isOpen = false;
  wrapper;
  expandIcon;
  title = '';
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-acordion-header');
    this.attachWrapper();
    this.displayTitle();
    this.displayExpandIcon();
  }

  disconnectedCallback() {
    this.expandIcon.removeEventListener('click', this.toggle.bind(this));
  }

  attachWrapper() {
    this.title = this.textContent;
    this.textContent = '';

    this.wrapper = document.createElement('button');
    this.wrapper.classList.add('header-wrapper');
    this.wrapper.addEventListener('click', this.toggle.bind(this));

    this.appendChild(this.wrapper);
  }

  displayTitle() {
    const title = document.createElement('span');
    title.classList.add('header-text');
    title.textContent = this.title;

    this.wrapper.appendChild(title);
  }

  displayExpandIcon() {
    this.expandIcon = document.createElement('span');
    this.expandIcon.classList.add('expand-icon');

    this.wrapper.appendChild(this.expandIcon);
  }

  toggle(event) {
    this.dispatchEvent(new CustomEvent('toggle', { data: event }));
  }
}
