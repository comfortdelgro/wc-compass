const CLOSE_ICON = `<button class="cdg-button icon ghost close-button">
  <cdg-icon name="close" size="16"></cdg-icon>
</button>`;

export class CdgSidebarHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'useCloseButton'];
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(title) {
    this.setAttribute('title', title);
  }

  get useCloseButton() {
    return this.getAttribute('useCloseButton') === 'true';
  }

  set useCloseButton(useCloseButton) {
    this.setAttribute('useCloseButton', useCloseButton);
  }

  titleElement;
  closeIcon;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-sidebar-header');
    this.attachCloseIcon();
  }

  disconnectedCallback() {
    this.closeIcon.removeEventListener(
      'click',
      this.handleCloseClick.bind(this)
    );
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'title':
        this.attachTitle();
        break;

      case 'useCloseButton':
        console.log('useCloseButton');
        if (this.useCloseButton) {
          this.attachCloseIcon();
        }
        break;

      default:
        break;
    }
  }

  attachTitle() {
    if (!this.titleElement) {
      this.titleElement = document.createElement('h4');
      this.titleElement.classList.add('cdg-sidebar-title');
      this.prepend(this.titleElement);
    }
    this.titleElement.textContent = this.title;
  }

  attachCloseIcon() {
    if (this.closeIcon) {
      return;
    }

    const modalHeaderActions = document.createElement('div');
    modalHeaderActions.classList.add('cdg-sidebar-header-actions');
    modalHeaderActions.innerHTML = CLOSE_ICON;
    this.append(modalHeaderActions);

    this.closeIcon = modalHeaderActions.querySelector('.close-button');
    this.closeIcon.addEventListener('click', this.handleCloseClick.bind(this));
  }

  handleCloseClick() {
    this.dispatchEvent(new CustomEvent('close'));
  }
}
