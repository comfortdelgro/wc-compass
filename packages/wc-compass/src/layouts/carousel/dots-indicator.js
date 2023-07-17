import {CdgBaseComponent} from '../../shared/base-component'

export class CdgDotsIndicator extends CdgBaseComponent {
  static get observedAttributes() {
    return ['current', 'length']
  }

  get current() {
    return Number(this.getAttribute('current')) || 0
  }

  set current(current) {
    this.setAttribute('current', current)
  }

  get length() {
    return Number(this.getAttribute('length')) || 0
  }

  set length(length) {
    this.setAttribute('length', length)
  }

  dots = []

  constructor() {
    super()
    this.attachDots()
  }

  connectedCallback() {
    this.classList.add('cdg-dots-indicator')
  }

  attributeChangedCallback(attr, oldValue) {
    switch (attr) {
      case 'current':
        if (this.dots[oldValue]) {
          this.dots[oldValue].classList.remove('current')
        }

        if (this.dots[this.current]) {
          this.dots[this.current].classList.add('current')
        }
        break

      case 'length':
        this.attachDots()
        break

      default:
        break
    }
  }

  createDot(index) {
    const dot = document.createElement('div')
    dot.classList.add('cdg-dot')
    dot.setAttribute('index', index)

    dot.addEventListener('click', this.handleDotClick.bind(this))

    return dot
  }

  attachDots() {
    this.dots = []
    this.textContent = ''
    for (let i = 0; i < this.length; i++) {
      const dot = this.createDot(i)
      this.appendChild(dot)
      this.dots.push(dot)
    }
  }

  handleDotClick(event) {
    this.dispatchEvent(
      new CustomEvent('dotClick', {
        detail: Number(event.target.getAttribute('index')),
      }),
    )
  }
}
