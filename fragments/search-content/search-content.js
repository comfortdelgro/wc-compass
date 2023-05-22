import {CdgDocumentComponent} from '../../shared/document-component'
import template from './search-content.html'

import {MenuListItemDemo} from './list-item/menu-list-item'
customElements.define('cdg-menu-list-item-demo', MenuListItemDemo)

import {CdgComponentListDemo} from './component-list/component-list'
customElements.define('cdg-component-list-demo', CdgComponentListDemo)

export class CdgSearchContentDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useLoading = false
    this.template = template
  }

  onInit() {
    const popover = this.querySelector('cdg-popover')
    const input = this.querySelector('input.cdg-input')

    input.addEventListener('focus', () => {
      popover.setAttribute('open', 'true')
    })

    input.addEventListener('blur', () => {
      popover.removeAttribute('open')
    })

    input.addEventListener('input', (event) => {
      const list = document.querySelector('cdg-component-list-demo')
      if (list) {
        list.setAttribute('filter', event.target.value)
      }
    })
  }

  disconnectedCallback() {
    console.log('disconnected')
  }
}
