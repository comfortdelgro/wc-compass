export class CdgRangeSlider extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'buffering'];
  }

  get width() {
    return this.offsetWidth - this.thumb.offsetWidth;
  }

  // Define getters and setters for value, min, and max attributes
  get value() {
    return Number(this.getAttribute('value'));
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get buffering() {
    return Number(this.getAttribute('buffering'));
  }

  set buffering(buffering) {
    this.setAttribute('buffering', buffering);
  }

  get min() {
    return Number(this.getAttribute('min'));
  }

  set min(val) {
    this.setAttribute('min', val);
  }

  get max() {
    return Number(this.getAttribute('max'));
  }

  set max(val) {
    this.setAttribute('max', val);
  }

  thumb;
  slider;
  dragging;
  bufferingBar;

  constructor() {
    super();

    // Create range slider elements
    this.classList.add('cdg-range-slider');
    this.tabIndex = 0;

    this.slider = document.createElement('div');
    this.slider.classList.add('range-slider');

    this.updateBufferingBar();

    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb');
    this.slider.appendChild(this.thumb);

    // Attach range slider to root
    this.appendChild(this.slider);

    // Initialize state
    this.min = this.getAttribute('min') || 0;
    this.max = this.getAttribute('max') || 100;
    this.value = this.getAttribute('value') || 0;
    this.updatePosition();
    this.thumb.setAttribute('value', this.getAttribute('value'));
    // Bind event listeners
    this.thumb.addEventListener('pointerdown', this.handleMouseDown.bind(this));
    this.addEventListener('click', this.handleClick.bind(this));
    // let isMouseDown = fasle;
  }

  updateBufferingBar() {
    if (!this.buffering) {
      return;
    }

    if (!this.bufferingBar) {
      this.bufferingBar = document.createElement('div');
      this.bufferingBar.classList.add('cdg-buffering-bar');
      this.appendChild(this.bufferingBar);
    }

    this.bufferingBar.style.width = this.buffering + '%';
  }

  // Dispatch a custom event with the new value whenever it changes
  dispatchChangeEvent() {
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        value: this.value,
      },
    });
    this.dispatchEvent(event);
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'value':
        if (!this.dragging) {
          this.updatePosition();
        }
        break;

      case 'buffering':
        this.updateBufferingBar();
        break;

      default:
        break;
    }
  }

  // Update thumb position based on current value
  updatePosition() {
    this.thumb.setAttribute('value', this.getAttribute('value'));
    const percent = (this.value - this.min) / (this.max - this.min);
    this.slider.style.width = percent * this.width + 'px';
  }

  // Handle thumb drag
  handleMouseDown(event) {
    this.thumb.setPointerCapture(event.pointerId);
    this.isMouseDown = true;
    const startX = event.clientX;
    const sliderRect = this.slider.getBoundingClientRect();
    const thumbRect = this.thumb.getBoundingClientRect();
    const thumbX = thumbRect.left - sliderRect.left;
    const moveHandler = (event) => {
      this.dragging = true;
      const deltaX = event.clientX - startX;
      const newThumbX = Math.min(Math.max(thumbX + deltaX, 0), this.width);
      const percent = newThumbX / this.width;
      this.value = Math.round(percent * (this.max - this.min) + this.min);
      this.updatePosition();
      this.dispatchChangeEvent();
    };
    const upHandler = () => {
      this.dragging = false;
      this.removeEventListener('pointermove', moveHandler);
      this.removeEventListener('pointerup', upHandler);
    };
    this.addEventListener('pointermove', moveHandler);
    this.addEventListener('pointerup', upHandler);
  }

  // Handle click on slider
  handleClick(event) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
    } else {
      const percent = event.offsetX / this.width;
      this.value = Math.round(percent * (this.max - this.min) + this.min);
      this.updatePosition();
      this.dispatchChangeEvent();
    }
  }
}
