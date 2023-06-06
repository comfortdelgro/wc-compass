import {CdgDocumentComponent} from '../../shared/document-component'
import template from './search-content.html'

import {MenuListItemDemo} from './list-item/menu-list-item'
customElements.define('cdg-menu-list-item-demo', MenuListItemDemo)

import {CdgComponentListDemo} from './component-list/component-list'
customElements.define('cdg-component-list-demo', CdgComponentListDemo)

const PREVENT_CODE_KEY = ['ArrowUp', 'ArrowDown', 'Enter']

export class CdgSearchContentDemo extends CdgDocumentComponent {
  popoverContentEl
  selectedItemEl
  handleKeyUpFn
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

    if (!this.handleKeyUpFn) {
      this.handleKeyUpFn = this.handleKeyUp.bind(this)
    }

    this.inputEl.addEventListener('focus', () => {
      if (this.componentListDemoEl) {
        this.componentListDemoEl.setAttribute('focusing', '')
      }
      popover.setAttribute('open', 'true')
      this.inputEl.addEventListener('keyup', this.handleKeyUpFn)
    })

    this.inputEl.addEventListener('blur', () => {
      if (this.componentListDemoEl) {
        this.componentListDemoEl.removeAttribute('focusing')
      }
      // popover.removeAttribute('open')
      this.inputEl.removeEventListener('keypress', this.handleKeyUpFn)
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
      // event.stopPropagation()
    }
  }

  disconnectedCallback() {
    console.log('disconnected')
  }
}
