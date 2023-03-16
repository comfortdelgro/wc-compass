const RATING_ICONS = ['emoTear', 'emoFrown', 'emoMeh', 'emoSmile', 'emoHeart'];

export class CdgRating extends HTMLElement {
  get useIcon() {
    return this.hasAttribute('use-icon');
  }

  set useIcon(useIcon) {
    if (useIcon) {
      this.hasAttribute('use-icon', useIcon);
    } else {
      this.removeAttribute('use-icon');
    }
  }

  buttons = [];
  selectedButton;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-rating');
    this.tabIndex = 0;
    this.attachButton();
  }

  createRatingButton(number) {
    const button = document.createElement('button');
    button.classList.add('cdg-button');
    button.classList.add('rating');
    if (this.useIcon) {
      const icon = document.createElement('cdg-icon');
      icon.setAttribute('size', '32');
      icon.setAttribute('name', RATING_ICONS[number - 1]);
      button.appendChild(icon);
    } else {
      button.textContent = number;
    }

    button.addEventListener('click', this.handleSelect.bind(this, number));

    return button;
  }

  attachButton() {
    for (let i = 1; i <= 5; i++) {
      const button = this.createRatingButton(i);
      this.buttons.push(button);
      this.appendChild(button);
    }
  }

  handleSelect(number) {
    if (this.selectedButton) {
      this.selectedButton.classList.remove('active');
    }
    this.selectedButton = this.buttons[number - 1];
    this.selectedButton.classList.add('active');
    this.dispatchEvent(new CustomEvent('rate', { detail: number }));
  }
}
