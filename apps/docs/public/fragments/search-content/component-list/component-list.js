import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'
import {DOCUMENT_CONTENT} from '../../../constants/document-content'
import {CdgDocumentComponent} from '../../../shared/document-component'

export class CdgComponentListDemo extends CdgDocumentComponent {
  menuListItemDemoEl

  static get observedAttributes() {
    return ['filter', 'focusing']
  }

  get filter() {
    return this.getAttribute('filter')
  }

  set filter(filter) {
    this.setAttribute('filter', filter)
  }

  displayData = DOCUMENT_CONTENT

  loop
  constructor() {
    super()
    this.htmlContent = `<cdg-list-view>
    <template>
      <cdg-menu-list-item-demo></cdg-menu-list-item-demo>
    </template>
  </cdg-list-view>`
  }

  onInit() {
    const listView = this.querySelector('cdg-list-view')
    this.loop = new CdgLoop(listView)
    this.loop.loop(this.displayData)
    setTimeout(() => {
      this.menuListItemDemoEl = this.querySelector('cdg-menu-list-item-demo')
      if (this.menuListItemDemoEl) {
        this.menuListItemDemoEl.displayData = this.displayData
      }
    })

    this.dispatchEvent(new CustomEvent('showPopover'))
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'filter':
        this.displayData = this.filterList()
        if (this.menuListItemDemoEl) {
          this.menuListItemDemoEl.displayData = this.displayData
        }
        this.loop.loop(this.displayData)
        this.dispatchEvent(new CustomEvent('onFiltered'))
        break
      case 'focusing':
        setTimeout(() => {
          if (!this.menuListItemDemoEl) {
            this.menuListItemDemoEl = this.querySelector(
              'cdg-menu-list-item-demo',
            )
          }
          const isFocusing = this.hasAttribute('focusing')
          if (isFocusing) {
            this.menuListItemDemoEl.setAttribute('focusing', '')
          } else {
            this.menuListItemDemoEl.removeAttribute('focusing', '')
          }
        })
        break

      default:
        break
    }
  }

  filterList() {
    const list = []
    JSON.parse(JSON.stringify(DOCUMENT_CONTENT)).forEach((item) => {
      const cloneItem = item
      const filtered = item.childList.filter((child) => {
        if (child.name.toLowerCase().includes(this.filter.toLowerCase())) {
          return child
        }
      })
      if (filtered && filtered.length) {
        cloneItem.childList = filtered
        list.push(cloneItem)
      }
    })

    return list
  }
}
