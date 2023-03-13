export class CdgListview extends HTMLElement {
  static get observedAttributes() {
    return ['draggable'];
  }

  get draggable() {
    return this.hasAttribute('draggable');
  }

  set draggable(draggable) {
    if (draggable) {
      this.setAttribute('draggable', '');
    } else {
      this.removeAttribute('draggable');
    }
  }

  placeholder;
  dragElement;
  draggingIndex;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-list-view');
    this.placeholder = document.createElement('div');
    this.placeholder.classList.add('cdg-list-placeholder-item');
    this.placeholder.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    this.placeholder.addEventListener('dragenter', (event) => {
      event.preventDefault();
    });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'draggable') {
      this.setDraggableChildren();
    }
  }

  setDraggableChildren() {
    this.querySelectorAll('cdg-list-item').forEach((listItem, index) => {
      if (listItem) {
        listItem.draggable = this.draggable;
      }
      if (this.draggable) {
        listItem.addEventListener(
          'dragthrough',
          this.handleDragThrough.bind(this)
        );
        listItem.addEventListener('dragstart', this.handleDragStart.bind(this));
        listItem.addEventListener('dragend', this.handleDragend.bind(this));
      } else {
        listItem.removeEventListener(
          'dragthrough',
          this.handleDragThrough.bind(this)
        );
        listItem.removeEventListener(
          'dragstart',
          this.handleDragStart.bind(this)
        );
        listItem.removeEventListener('dragend', this.handleDragend.bind(this));
      }
    });
  }

  handleDragStart(event) {
    this.placeholder.style.height = event.target.clientHeight + 'px';
    this.draggingIndex = Array.from(this.children).indexOf(event.target);
    this.dragElement = event.target;
    this.classList.add('dragging');
  }

  handleDragThrough(event) {
    const index = Array.from(this.children).indexOf(event.target);

    if (event.detail && event.detail === 'up') {
      this.insertBefore(this.placeholder, this.children[index]);
    } else {
      this.insertBefore(this.placeholder, this.children[index + 1]);
    }
  }

  handleDragend() {
    const children = Array.from(this.children);
    const index = children.indexOf(this.placeholder);
    const elementIndex = children.indexOf(this.dragElement);

    // To find placeholder index without dragging element
    const clone = this.cloneNode(true);
    const clonePlaceholder = clone.children[index];
    clone.removeChild(Array.from(clone.children)[elementIndex]);
    const dragTo = Array.from(clone.children).indexOf(clonePlaceholder);

    if (this.contains(this.placeholder)) {
      this.removeChild(this.placeholder);
    }

    if (dragTo !== this.draggingIndex) {
      this.swapItem(this.draggingIndex, dragTo);
      this.dispatchEvent(
        new CustomEvent('dragitem', {
          detail: {
            draggIndex: this.draggingIndex,
            dragElement: this.dragElement,
            dragTo,
          },
        })
      );
    }
    this.classList.remove('dragging');
  }

  swapItem(from, to) {
    const original = this.children[from];
    const target = this.children[to];
    if (to > from) {
      this.insertBefore(original, target.nextElementSibling);
    } else {
      this.insertBefore(original, target);
    }
  }
}
