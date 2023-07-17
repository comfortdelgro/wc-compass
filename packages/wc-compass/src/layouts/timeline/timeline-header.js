import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimelineHeader extends CdgBaseComponent {
  static get observedAttributes() {
    return ['text', 'color']
  }

  get text() {
    return this.getAttribute('text') || ''
  }

  set text(text) {
    this.setAttribute('text', text)
  }

  get color() {
    return this.getAttribute('color') || ''
  }

  set color(color) {
    this.setAttribute('color', color)
  }

  iconWrapper
  textElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-header')

    this.iconWrapper = document.createElement('div')
    this.iconWrapper.classList.add('cdg-timeline-header-icon')
    this.iconWrapper.style.backgroundColor = this.color

    const icon = document.createElement('cdg-icon')
    icon.setAttribute('name', 'calendar')
    // icon.setAttribute('source', 'host');
    icon.setAttribute('size', '16')

    this.iconWrapper.appendChild(icon)
    this.appendChild(this.iconWrapper)

    this.textElement = document.createElement('span')
    this.textElement.classList.add('cdg-timeline-header-text')
    this.textElement.textContent = this.text
    this.appendChild(this.textElement)
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'text':
        if (this.textElement) {
          this.textElement.textContent = this.text
        }
        break
      case 'color':
        if (this.iconWrapper) {
          this.iconWrapper.style.backgroundColor = this.color
        }
        break

      default:
        break
    }
  }
}
