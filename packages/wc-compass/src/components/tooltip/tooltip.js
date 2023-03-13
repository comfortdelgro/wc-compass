import {
  createFloating,
  DIRECTIONS,
} from '../floating-content/floating-content';

const HEIGHT_ARROW = 12;

const createTemplateHeader = function (type) {
  const templateHeader = document.createElement('template');
  templateHeader.innerHTML = `
  <div class="cdg-tooltip-header">
      <span class="header-title"></span>
      <button class="header-close-button cdg-button ${type}">
          <cdg-icon name="close" size="16" />
      </button>
  </div>
  `;

  return templateHeader;
};

export class CdgTooltip extends HTMLElement {
  floatingElement;
  anchorElement;
  cdgTooltipContentElement;
  _direction = 'top';
  _type = 'primary';
  event = 'hover';
  headerElement;
  bottomElement;
  title = '';

  get direction() {
    return this._direction ? 'top' : this._direction;
  }

  set direction(value) {
    this._direction = !DIRECTIONS.includes(value) ? 'top' : value;
    if (this.floatingElement) {
      this.floatingElement.setAttribute('placement', this._direction);
    }
  }

  get open() {
    return this._open;
  }

  set open(value) {
    if (this.floatingElement) {
      if (value) {
        this.floatingElement.setAttribute('opening', 'true');
      } else {
        this.removeAttribute('open');
        this.floatingElement.removeAttribute('opening');
      }
    }
    this._open = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  static get observedAttributes() {
    return ['direction', 'title', 'event', 'type', 'open'];
  }

  constructor() {
    super();
    this.title = this.getAttribute('title') || '';
    if (!this.anchorElement) {
      this.anchorElement = this.querySelector('[cdg-tooltip-header]');
    }
    if (!this.cdgTooltipContentElement) {
      this.cdgTooltipContentElement = this.querySelector(
        '[cdg-tooltip-content]'
      );
      if (!this.cdgTooltipContentElement) {
        this.cdgTooltipContentElement = document.createElement('div');
      }
      this.cdgTooltipContentElement.classList.add('cdg-tooltip-main-content');
      this.createHeaderAndBottomTooltip();
    }
  }

  connectedCallback() {
    this.classList.add('cdg-tooltip');
    if (!this.floatingElement) {
      this.floatingElement = createFloating.bind(this)(
        this.anchorElement,
        this.cdgTooltipContentElement,
        this.direction,
        'cdg-tooltip-floating-container',
        false,
        true,
        true,
        false
      );
      this.open = this.getAttribute('open');
      if (
        this.hasAttribute('direction') &&
        DIRECTIONS.includes(this.getAttribute('direction'))
      ) {
        this.direction = this.getAttribute('direction');
      } else {
        this.direction = 'top';
      }

      if (this.hasAttribute('type')) {
        this.type = this.getAttribute('type');
        this.floatingElement.classList.add(this.type);
      }

      this.bindEvents();
    }
  }

  createHeaderAndBottomTooltip() {
    // Create header of tooltip
    this.cdgTooltipContentElement.prepend(
      createTemplateHeader(this.type).content.cloneNode(true)
    );
    this.headerElement = this.cdgTooltipContentElement.querySelector(
      'div.cdg-tooltip-header'
    );
    const headerTitleElement =
      this.headerElement.querySelector('.header-title');
    headerTitleElement.textContent = this.title;
    this.headerElement
      .querySelector('.header-close-button')
      .addEventListener('click', () => {
        this.changeOpen(false);
      });
    // Create bottom of tooltip
    this.bottomElement = this.querySelector('[cdg-tooltip-bottom]');
    if (this.bottomElement) {
      this.cdgTooltipContentElement.append(this.bottomElement);
      const closeButtons =
        this.bottomElement.querySelectorAll('[click-to-close]');
      if (closeButtons) {
        const currentComponent = this;
        closeButtons.forEach((closeButton) => {
          closeButton.addEventListener('click', () => {
            currentComponent.changeOpen(false);
          });
        });
      }
    }
  }

  bindEvents() {
    if (
      this.hasAttribute('event') &&
      ['click', 'hover'].includes(this.getAttribute('event'))
    ) {
      this.event = this.getAttribute('event');
    }

    if (this.event === 'click') {
      this.anchorElement.addEventListener('click', () => {
        this.changeOpen(true);
      });
      this.anchorElement.addEventListener('blur', () => {
        this.changeOpen(false);
      });
    } else if (this.event === 'hover') {
      this.anchorElement.addEventListener('mouseenter', () => {
        this.changeOpen(true);
      });
      this.anchorElement.addEventListener(
        'mouseleave',
        this.handleAnchorMouseLeave.bind(this)
      );
      this.floatingElement.addEventListener(
        'mouseleave',
        this.handleFloatingMouseLeave.bind(this)
      );
    }
  }

  handleAnchorMouseLeave(event) {
    const floatingBound = this.floatingElement.getBoundingClientRect();
    const direction = this.getAttribute('direction') || 'top';
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    switch (direction) {
      case 'topLeft':
      case 'top':
      case 'topRight':
        left = floatingBound.left;
        right = floatingBound.right;
        top = floatingBound.top + HEIGHT_ARROW;
        bottom = floatingBound.bottom + HEIGHT_ARROW;
        break;
      case 'bottomLeft':
      case 'bottom':
      case 'bottomRight':
        left = floatingBound.left;
        right = floatingBound.right;
        top = floatingBound.top - HEIGHT_ARROW;
        bottom = floatingBound.bottom - HEIGHT_ARROW;
        break;
      case 'leftTop':
      case 'left':
      case 'leftBottom':
        left = floatingBound.left + HEIGHT_ARROW;
        right = floatingBound.right + HEIGHT_ARROW;
        top = floatingBound.top;
        bottom = floatingBound.bottom;
        break;
      case 'rightTop':
      case 'right':
      case 'rightBottom':
        left = floatingBound.left - HEIGHT_ARROW;
        right = floatingBound.right - HEIGHT_ARROW;
        top = floatingBound.top;
        bottom = floatingBound.bottom;
        break;
      default:
        break;
    }
    // related target is floating content
    const isContains =
      (left <= event.clientX &&
        event.clientX <= right &&
        top <= event.clientY &&
        event.clientY <= bottom) ||
      this.anchorElement.contains(event.relatedTarget);
    if (!isContains) {
      this.open = false;
    }
  }

  handleFloatingMouseLeave(event) {
    const direction = this.getAttribute('direction') || 'bottom';
    const anchorBound = this.anchorElement.getBoundingClientRect();
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    switch (direction) {
      case 'topLeft':
      case 'top':
      case 'topRight':
        left = anchorBound.left;
        right = anchorBound.right;
        top = anchorBound.top - HEIGHT_ARROW;
        bottom = anchorBound.bottom - HEIGHT_ARROW;
        break;
      case 'bottomLeft':
      case 'bottom':
      case 'bottomRight':
        left = anchorBound.left;
        right = anchorBound.right;
        top = anchorBound.top + HEIGHT_ARROW;
        bottom = anchorBound.bottom + HEIGHT_ARROW;
        break;
      case 'leftTop':
      case 'left':
      case 'leftBottom':
        left = anchorBound.left - HEIGHT_ARROW;
        right = anchorBound.right - HEIGHT_ARROW;
        top = anchorBound.top;
        bottom = anchorBound.bottom;
        break;
      case 'rightTop':
      case 'right':
      case 'rightBottom':
        left = anchorBound.left + HEIGHT_ARROW;
        right = anchorBound.right + HEIGHT_ARROW;
        top = anchorBound.top;
        bottom = anchorBound.bottom;
        break;

      default:
        break;
    }
    // related target is anchor element
    const isContains =
      (left <= event.clientX &&
        event.clientX <= right &&
        top <= event.clientY &&
        event.clientY <= bottom) ||
      this.anchorElement.contains(event.relatedTarget);
    if (!isContains) {
      this.open = false;
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[attr] = newValue;

    if (attr === 'title') {
      if (this.headerElement) {
        this.headerElement.querySelector('.header-title').textContent =
          newValue;
      }
    }
  }

  changeOpen(status) {
    if (status) {
      this.setAttribute('open', 'true');
    } else {
      this.removeAttribute('open');
    }
    this.open = status;
  }
}
