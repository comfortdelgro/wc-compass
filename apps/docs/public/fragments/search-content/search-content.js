import {CdgDocumentComponent} from '../../shared/document-component'
import template from './search-content.html'

import {MenuListItemDemo} from './list-item/menu-list-item'
customElements.define('cdg-menu-list-item-demo', MenuListItemDemo)

import {CdgComponentListDemo} from './component-list/component-list'
customElements.define('cdg-component-list-demo', CdgComponentListDemo)

const PREVENT_CODE_KEY = ['ArrowUp', 'ArrowDown']

export class CdgSearchContentDemo extends CdgDocumentComponent {
  popoverContentEl
  selectedItemEl
  handleKeyUpFn
  inputEl

  constructor() {
    super()
    this.useLoading = false
    this.template = template
  }

  onInit() {
    const popover = this.querySelector('cdg-popover')
    this.inputEl = this.querySelector('input.cdg-input')
    this.popoverContentEl = popover.cdgPopoverContentElement

    if (!this.handleKeyUpFn) {
      this.handleKeyUpFn = this.handleKeyUp.bind(this)
    }

    this.inputEl.addEventListener('focus', () => {
      popover.setAttribute('open', 'true')
      this.inputEl.addEventListener('keyup', this.handleKeyUpFn)
    })

    this.inputEl.addEventListener('blur', () => {
      popover.removeAttribute('open')
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
    if (event.code === 'Enter' && this.selectedItemEl) {
      this.selectedItemEl.click()
      this.inputEl.blur()
      this.inputEl.removeEventListener('keypress', this.handleKeyUpFn)
      this.selectedItemEl = null
      return
    }
    if (PREVENT_CODE_KEY.includes(event.code)) {
      event.preventDefault()
      event.stopPropagation()
      this.selectableItems =
        this.popoverContentEl.querySelectorAll('[selectable-item]')
      if (this.selectableItems.length) {
        if (!this.selectedItemEl) {
          this.selectedItemEl = this.selectableItems.item(0)
        } else {
          this.selectedItemEl.classList.remove('selecting')

          for (let index = 0; index < this.selectableItems.length; index++) {
            const element = this.selectableItems.item(index)
            if (element === this.selectedItemEl) {
              switch (event.code) {
                case 'ArrowUp':
                  this.selectedItemEl =
                    this.selectableItems.item(index - 1) ||
                    this.selectableItems.item(this.selectableItems.length - 1)
                  break
                case 'ArrowDown':
                  this.selectedItemEl =
                    this.selectableItems.item(index + 1) ||
                    this.selectableItems.item(0)
                  break

                default:
                  break
              }
              break
            }
          }
        }
      }

      if (this.selectedItemEl) {
        this.selectedItemEl.classList.add('selecting')
        this.selectedItemEl.parentElement.scrollIntoView({behavior: 'smooth'})
      }
    }
  }

  disconnectedCallback() {
    console.log('disconnected')
  }
}
