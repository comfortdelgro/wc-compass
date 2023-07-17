import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimelineCardTime extends CdgBaseComponent {
  textElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-card-time')
    const text = this.textContent
    this.textContent = ''

    const icon = document.createElement('cdg-icon')
    icon.setAttribute('name', 'clock')
    icon.setAttribute('size', '16')
    this.appendChild(icon)

    this.textElement = document.createElement('span')
    this.textElement.textContent = text
    this.appendChild(this.textElement)
  }
}
