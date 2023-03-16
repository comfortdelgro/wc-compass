import { Pointer } from '../../shared/pointer';

const ARROW_RIGHT = `<cdg-icon name="arrowRight" size="32"></cdg-icon>`;
const ARROW_LEFT = `<cdg-icon name="arrowLeft" size="32"></cdg-icon>`;
const ARROW_RIGHT_TEXT = `Next`;
const ARROW_LEFT_TEXT = `Prev`;

export class CdgCarousel extends HTMLElement {
  static get observedAttributes() {
    return ['current', 'useArrow', 'autoSwitch'];
  }

  get current() {
    return Number(this.getAttribute('current')) || 0;
  }

  set current(current) {
    this.setAttribute('current', current);
  }

  get useArrow() {
    return this.getAttribute('useArrow') === 'true';
  }

  set useArrow(useArrow) {
    this.setAttribute('useArrow', useArrow);
  }

  get autoSwitch() {
    return this.getAttribute('autoSwitch') === 'true';
  }

  set autoSwitch(autoSwitch) {
    this.setAttribute('autoSwitch', autoSwitch);
  }

  get length() {
    return this.scroller.children.length;
  }

  container;
  scroller;
  controller;
  indicator;
  timer;
  navigationBar;
  btnNext;
  btnPrev;

  pointer = new Pointer();
  scrollerPosition = 0;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-carousel');
    this.wrapContent();
    if (!this.hasAttribute('current')) {
      this.switchSlide();
    }
  }

  wrapContent() {
    this.container = document.createElement('div');
    this.container.classList.add('cdg-carousel-container');

    this.scroller = document.createElement('cdg-carousel-scroller');
    this.scroller.addEventListener(
      'updatePosition',
      this.handleUpdatePositon.bind(this)
    );

    this.indicator = document.createElement('cdg-dots-indicator');
    this.indicator.addEventListener('dotClick', this.handleDotClick.bind(this));

    // Element that contains dot, socials
    this.controller = document.createElement('div');
    this.controller.classList.add('cdg-carousel-controllers');

    const actions = this.querySelector('.cdg-mobile-actions');
    this.scroller.innerHTML = this.innerHTML;

    this.controller.appendChild(this.indicator);
    this.container.appendChild(this.scroller);
    this.container.appendChild(this.controller);

    this.textContent = '';

    this.appendChild(this.container);
    if (actions) {
      this.appendChild(actions);
    }

    // Should get length after mobile actions has removed
    this.indicator.length = this.length;
    this.indicator.current = this.current;

    // Init first state of scroller
    this.scroller.current = this.current;

    this.attachNavigation();
    this.listenEvents();
  }

  listenEvents() {
    this.scroller.addEventListener(
      'pointerdown',
      this.handlePointerDown.bind(this)
    );
  }

  createButton() {
    const button = document.createElement('button');
    button.setAttribute('size', 'large');
    button.classList.add('cdg-button');
    button.classList.add('ghost');
    button.classList.add(this.useArrow ? 'icon' : 'text');

    return button;
  }

  attachNavigation() {
    this.navigationBar = document.createElement('div');
    this.navigationBar.classList.add('cdg-carousel-navigation');

    this.btnNext = this.createButton();
    this.btnNext.classList.add('next');
    this.btnNext.innerHTML = this.useArrow ? ARROW_RIGHT : ARROW_RIGHT_TEXT;
    this.btnNext.addEventListener('click', this.next.bind(this));

    this.btnPrev = this.createButton();
    this.btnPrev.classList.add('prev');
    this.btnPrev.innerHTML = this.useArrow ? ARROW_LEFT : ARROW_LEFT_TEXT;
    this.btnPrev.addEventListener('click', this.prev.bind(this));

    this.navigationBar.appendChild(this.btnPrev);
    this.navigationBar.appendChild(this.btnNext);
    this.container.appendChild(this.navigationBar);
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'current':
        this.scroller.current = this.current;
        this.indicator.current = this.current;
        this.switchSlide();
        break;
      case 'autoSwitch':
        if (this.autoSwitch) {
          this.switchSlide();
        } else {
          this.stop();
        }
        break;

      default:
        break;
    }
  }

  switchSlide() {
    this.stop();
    if (this.autoSwitch) {
      this.timer = setTimeout(() => {
        this.current = (this.current + 1) % this.length;
        this.switchSlide();
      }, 3000);
    }
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  next() {
    this.stop();
    this.current = (this.current + 1) % this.length;
  }

  prev() {
    this.stop();
    this.current = (this.length + (this.current - 1)) % this.length;
  }

  handleUpdatePositon(event) {
    this.scrollerPosition = event.detail;
  }

  handleDotClick(event) {
    const target = event.detail || 0;
    this.stop();
    this.current = target;
  }

  handlePointerDown(event) {
    // Stop the auto play
    this.stop();

    // Stop transition timer
    this.scroller.style.transition = 'none';

    // Buttons will not trigger click event if we set pointer capture
    // This is to ignore buttons
    if (event.target.tagName !== 'BUTTON') {
      this.setPointerCapture(event.pointerId);
    }

    this.pointer = new Pointer();
    this.pointer.start({ x: event.pageX, y: event.pageY });

    this.addEventListener('pointermove', this.handlePointerMove);
    this.addEventListener('touchmove', this.handleTouchMove);
    this.addEventListener('pointerup', this.handlePointerUp, {
      once: true,
    });
    this.addEventListener('pointercancel', this.handlePointerUp, {
      once: true,
    });
  }

  /**
   * To prevent page scroll on mobile when user is dragging
   * @param {TouchEvent} event
   */
  handleTouchMove(event) {
    if (Math.abs(this.pointer.distance.x) > 10) {
      event.preventDefault();
    }
  }

  handlePointerMove(event) {
    event.preventDefault();
    this.pointer.update({ x: event.pageX, y: event.pageY });
    this.scroller.position = this.scrollerPosition - this.pointer.distance.x;
  }

  handlePointerUp() {
    this.removeEventListener('pointermove', this.handlePointerMove);

    // Make it transition smoother again
    this.scroller.style.transition = 'all 0.3s ease-in-out';

    if (Math.abs(this.pointer.distance.x) / this.clientWidth > 0.2) {
      if (this.pointer.distance.x < 0) {
        this.next();
      } else {
        this.prev();
      }
    } else {
      this.scroller.position = this.scrollerPosition;
    }
  }
}
