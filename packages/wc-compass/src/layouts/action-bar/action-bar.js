export class CdgActionBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-action-bar');
    this.attachElements();
  }

  attachElements() {
    const leftGroup = this.querySelector('#cdg-action-left-group');
    const leftGroupElement = document.createElement('div');
    leftGroupElement.classList.add('cdg-action-left-group');
    if (leftGroup) {
      leftGroupElement.appendChild(leftGroup.content);
    }
    this.appendChild(leftGroupElement);

    const centerGroup = this.querySelector('#cdg-action-center-group');
    const centerGroupElement = document.createElement('div');
    centerGroupElement.classList.add('cdg-action-center-group');
    if (centerGroup) {
      centerGroupElement.appendChild(centerGroup.content);
    }
    this.appendChild(centerGroupElement);

    const rightGroup = this.querySelector('#cdg-action-right-group');
    const rightGroupElement = document.createElement('div');
    rightGroupElement.classList.add('cdg-action-right-group');
    if (rightGroup) {
      rightGroupElement.appendChild(rightGroup.content);
    }
    this.appendChild(rightGroupElement);
  }
}
