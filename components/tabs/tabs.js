import {CdgDocumentComponent} from '../../shared/document-component'
import template from './tabs.html'

export class CdgTabsDemo extends CdgDocumentComponent {
  activeIndex = 0
  tabContent

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const tab = this.querySelector('#sample-tab')
    this.tabContent = this.querySelector('[for="sample-tab"]')
    tab.addEventListener('switchTab', this.onSwitchTab.bind(this))
  }

  onSwitchTab = (event) => {
    this.tabContent.children[this.activeIndex].classList.remove('active')
    this.activeIndex = event.detail
    this.tabContent.children[this.activeIndex].classList.add('active')
  }
}
