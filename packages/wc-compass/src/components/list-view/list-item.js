export class CdgListItem extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'draggable'];
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', null);
    } else {
      this.removeAttribute('disabled');
    }
  }

  get draggable() {
    return this.hasAttribute('draggable');
  }

  set draggable(draggable) {
    if (draggable) {
      this.setAttribute('draggable', true);
    } else {
      this.removeAttribute('draggable');
    }
  }

  placeholderPosition = '';
  draggableIcon;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-list-item');
    this.tabIndex = 0;
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'disabled':
        if (this.disabled) {
          this.tabIndex = 0;
        } else {
          this.removeAttribute('tabindex');
        }
        break;

      case 'draggable':
        if (this.draggable) {
          this.listenEvents();
          this.addDragIcon();
        } else {
          this.removeEvents();
          this.removeDragIcon();
        }
        break;

      default:
        break;
    }
  }

  addDragIcon() {
    this.draggableIcon = document.createElement('div');
    this.draggableIcon.classList.add('cdg-list-draggable-icon');
    this.prepend(this.draggableIcon);
  }

  removeEvents() {
    this.removeEventListener('dragstart', this.handleDrag.bind(this));
  }

  removeDragIcon() {
    this.removeChild(this.draggableIcon);
  }

  listenEvents() {
    this.addEventListener('dragstart', this.handleDrag.bind(this));
    this.addEventListener('dragend', this.handleEnd.bind(this));
    this.addEventListener('dragenter', this.handleDragEnter.bind(this));
    this.addEventListener('dragover', this.handleDragOver.bind(this));
    this.addEventListener('dragleave', this.handleDragLeave.bind(this));
  }

  handleDrag(event) {
    // Setting up clone element to capture
    const bound = this.getBoundingClientRect();
    let clonedElement = this.cloneNode(true);
    clonedElement.style.borderRadius = '4px';
    clonedElement.style.border = '2px solid var(--accent)';
    clonedElement.style.height = this.clientHeight + 'px';
    clonedElement.style.width = this.clientWidth + 'px';
    clonedElement.style.top = bound.top + 'px';
    clonedElement.style.left = bound.left + 'px';
    clonedElement.style.zIndex = '-1';
    clonedElement.style.position = 'fixed';
    clonedElement.classList.add('cloned');
    document.body.appendChild(clonedElement);
    event.dataTransfer.setDragImage(
      clonedElement,
      event.offsetX,
      event.offsetY
    );

    // Then remove cloned element
    setTimeout(() => {
      clonedElement.parentElement.removeChild(clonedElement);
    }, 10);

    this.classList.add('dragging');
    setTimeout(() => {
      this.classList.add('dragging-hidden');
      this.placeholderPosition = 'down';
      this.dispatchEvent(
        new CustomEvent('dragthrough', { detail: this.placeholderPosition })
      );
    });
  }

  handleDragOver(event) {
    event.preventDefault();
    const bound = this.getBoundingClientRect();
    const position = event.pageY < bound.top + bound.height / 2 ? 'up' : 'down';
    if (position !== this.placeholderPosition) {
      this.placeholderPosition = position;
      this.dispatchEvent(
        new CustomEvent('dragthrough', { detail: this.placeholderPosition })
      );
    }
  }

  handleDragEnter() {
    this.classList.add('dragenter');
  }

  handleDragLeave() {
    this.classList.remove('dragenter');
  }

  handleEnd() {
    this.classList.remove('dragging');
    this.classList.remove('dragging-hidden');
    this.removeAttribute('style');
  }
}
