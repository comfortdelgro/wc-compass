import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTabs extends CdgBaseComponent {
  activeIndex = 0

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-tabs')
    this.activeTab(this.activeIndex)
    Array.from(this.children).forEach((tab, index) => {
      if (tab && !tab.hasAttribute('disabled')) {
        tab.addEventListener('click', () => {
          this.activeTab(index)
        })
      }
    })
  }

  activeTab(index) {
    this.children[this.activeIndex].removeAttribute('activated')
    this.activeIndex = index
    this.children[this.activeIndex].setAttribute('activated', '')
    const event = new CustomEvent('switchTab', {detail: this.activeIndex})
    this.dispatchEvent(event)
  }
}
