export class CdgPagination extends HTMLElement {
  static get observedAttributes() {
    return ['total', 'current-page', 'page-size'];
  }

  totalPage = 0;
  constructor() {
    super();
  }

  get currentPage() {
    return Number(this.getAttribute('current-page')) || 1;
  }

  set currentPage(page) {
    this.setAttribute('current-page', page);
  }

  get total() {
    return Number(this.getAttribute('total')) || 0;
  }

  set total(total) {
    this.setAttribute('total', total);
  }

  get pageSize() {
    return Number(this.getAttribute('page-size')) || 20;
  }

  set pageSize(pageSize) {
    this.setAttribute('page-size', pageSize);
  }

  connectedCallback() {
    this.classList.add('cdg-pagination');
    this.ariaLabel = 'Page navigation';
    this.totalPage = Math.ceil(this.total / this.pageSize);

    this.attachButtons();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'current-page') {
      this.setActiveButton(Number(oldValue), Number(newValue));
    }
  }

  setActiveButton(oldValue, newValue) {
    // Set active
    for (let button of this.children) {
      if (button) {
        const buttonValue = Number(button.textContent);
        if (buttonValue === newValue) {
          button.classList.add('active');
        } else if (buttonValue === oldValue) {
          button.classList.remove('active');
        }
      }
    }
  }

  createPageIndex(page) {
    const button = document.createElement('button');
    button.classList.add('cdg-button');
    button.textContent = page;

    button.addEventListener('click', (event) => {
      this.handleItemClick(event, page);
    });
    return button;
  }

  createDotButton() {
    const button = document.createElement('button');
    button.classList.add('cdg-button');
    button.textContent = '...';
    return button;
  }

  createNavButton(name) {
    const icon = document.createElement('cdg-icon');
    icon.setAttribute('name', name);
    icon.setAttribute('size', '16');

    const button = document.createElement('button');
    button.classList.add('cdg-button');
    button.classList.add('arrow-icon');
    button.appendChild(icon);
    return button;
  }

  createPrevButton() {
    const button = this.createNavButton('arrowLeft');

    button.addEventListener('click', (event) => {
      this.handleItemClick(
        event,
        this.currentPage === 1 ? 1 : this.currentPage - 1
      );
    });

    return button;
  }

  createNextButton() {
    const button = this.createNavButton('arrowRight');

    button.addEventListener('click', (event) => {
      this.handleItemClick(
        event,
        this.currentPage === this.totalPage
          ? this.totalPage
          : this.currentPage + 1
      );
    });

    return button;
  }

  attachButtons() {
    // Empty the element
    this.textContent = '';

    let from = this.totalPage;
    let isOverflow = false;
    if (this.totalPage > 5) {
      from = 3;
      isOverflow = true;
    }

    // Start part
    if (isOverflow) {
      // Let's add the left arrow icon button
      this.appendChild(this.createPrevButton());
    }

    // Middle part
    for (let i = 1; i <= from; i++) {
      this.appendChild(this.createPageIndex(i));
    }
    if (isOverflow) {
      this.appendChild(this.createDotButton());
      this.appendChild(this.createPageIndex(this.totalPage));

      // Let's add the right arrow icon button
      this.appendChild(this.createNextButton());
    }

    this.setActiveButton(0, this.currentPage);
  }

  handleItemClick(event, index) {
    this.onnavigate && this.onnavigate(index);
    this.dispatchEvent(new CustomEvent('navigate', { detail: index }));
  }
}
