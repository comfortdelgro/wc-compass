import {CdgBaseComponent} from '@comfortdelgro/wc-compass/src/shared/base-component'
import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'

import {MenuChildItemDemo} from '../child-item/child-item'
customElements.define('cdg-menu-child-item', MenuChildItemDemo)

const PREVENT_CODE_KEY = ['ArrowUp', 'ArrowDown', 'Enter']

export class MenuListItemDemo extends CdgBaseComponent {
  displayData = []
  selectedSlug = ''

  static get observedAttributes() {
    return ['focusing', 'filter']
  }

  constructor() {
    super()
    this.template = `<cdg-list-item class="parent-item">
    <div class="cdg-list-item-info">
      <div class="cdg-list-item-description">
        {{item.name}}
        <small>({{item.childList.length}})</small>
      </div>
    </div>
  </cdg-list-item>
  <cdg-list-view class="child-menu">
    <template>
      <cdg-menu-child-item></cdg-menu-child-item>
    </template>
  </cdg-list-view>`
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'focusing':
        if (!this.handleKeyUpFn) {
          this.handleKeyUpFn = this.handleKeyUp.bind(this)
        }
        const isFocusing = this.hasAttribute('focusing')
        if (isFocusing) {
          window.addEventListener('keyup', this.handleKeyUpFn)
        } else {
          window.removeEventListener('keyup', this.handleKeyUpFn)
        }
        break

      default:
        break
    }
  }

  handleKeyUp(event) {
    // if (event.code === 'Enter' && this.selectedItemEl) {
    //   this.selectedItemEl.click()
    //   this.inputEl.blur()
    //   this.inputEl.removeEventListener('keypress', this.handleKeyUpFn)
    //   this.selectedItemEl = null
    //   return
    // }
    if (PREVENT_CODE_KEY.includes(event.code)) {
      event.preventDefault()
      event.stopPropagation()
      const selectableItems = this.displayData.reduce((result, item) => {
        return [...result, ...item.childList]
      }, [])
      if (selectableItems.length) {
        if (!this.selectedSlug) {
          this.selectedSlug = selectableItems[0].slug
        } else {
          for (let index = 0; index < selectableItems.length; index++) {
            const data = selectableItems[index]
            if (data.slug === this.selectedSlug) {
              switch (event.code) {
                case 'ArrowUp':
                  this.selectedSlug = selectableItems[index - 1]
                    ? selectableItems[index - 1].slug
                    : selectableItems[selectableItems.length - 1].slug
                  break
                case 'ArrowDown':
                  this.selectedSlug = selectableItems[index + 1]
                    ? selectableItems[index + 1].slug
                    : selectableItems[0].slug
                  break
                default:
                  break
              }
              break
            }
          }
        }
      } else {
        this.selectedSlug = ''
      }
      console.log(this.selectedSlug)
      // if (this.selectedItemEl) {
      // this.selectedItemEl.classList.add('selecting')
      // this.selectedItemEl.parentElement.scrollIntoView({behavior: 'smooth'})
      // }
    }
  }

  afterViewInit() {
    const childListElement = this.querySelector('.child-menu')
    if (this.childList && this.childList.length) {
      const loop = new CdgLoop(childListElement)
      loop.loop(this.childList)
    } else {
      this.classList.add('no-child')
      this.removeChild(childListElement)
    }
  }
}
