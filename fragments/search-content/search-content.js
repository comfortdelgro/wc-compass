import {CdgDocumentComponent} from '../../shared/document-component'
import template from './search-content.html'

import {MenuListItemDemo} from './list-item/menu-list-item'
customElements.define('cdg-menu-list-item-demo', MenuListItemDemo)

import {CdgComponentListDemo} from './component-list/component-list'
customElements.define('cdg-component-list-demo', CdgComponentListDemo)

export const PREVENT_CODE_KEY = ['ArrowUp', 'ArrowDown', 'Enter']

export class CdgSearchContentDemo extends CdgDocumentComponent {
  popoverContentEl
  selectedItemEl
  handleKeyDownFn
  inputEl
  componentListDemoEl

  constructor() {
    super()
    this.useLoading = false
    this.template = template
  }

  onInit() {
    const popover = this.querySelector('cdg-popover')
    this.inputEl = this.querySelector('input.cdg-input')
    this.popoverContentEl = popover.cdgPopoverContentElement
    this.componentListDemoEl = this.popoverContentEl.querySelector(
      'cdg-component-list-demo',
    )

    if (this.componentListDemoEl) {
      this.componentListDemoEl.addEventListener('onSelectItem', () => {
        if (this.inputEl) {
          this.inputEl.blur()
        }
      })
    }

    if (!this.handleKeyDownFn) {
      this.handleKeyDownFn = this.handleKeyUp.bind(this)
    }

    this.inputEl.addEventListener('focus', () => {
      if (this.componentListDemoEl) {
        this.componentListDemoEl.setAttribute('focusing', 'true')
      }
      popover.setAttribute('open', 'true')
      this.inputEl.addEventListener('keydown', this.handleKeyDownFn)
    })

    this.inputEl.addEventListener('blur', () => {
      if (this.componentListDemoEl) {
        this.componentListDemoEl.removeAttribute('focusing')
      }
      popover.removeAttribute('open')
      this.inputEl.removeEventListener('keydown', this.handleKeyDownFn)
    })

    this.inputEl.addEventListener('input', (event) => {
      const list = document.querySelector('cdg-component-list-demo')
      if (list) {
        this.selectedItemEl = null
        list.setAttribute('filter', event.target.value)
      }
    })
  }

  handleKeyUp(event) {
    if (PREVENT_CODE_KEY.includes(event.code)) {
      event.preventDefault()
      return false
    }
  }

  disconnectedCallback() {
    console.log('disconnected')
  }
}
