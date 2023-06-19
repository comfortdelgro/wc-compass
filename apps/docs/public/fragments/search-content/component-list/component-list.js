import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'
import {DOCUMENT_CONTENT} from '../../../constants/document-content'
import {CdgDocumentComponent} from '../../../shared/document-component'
import {PREVENT_CODE_KEY} from '../search-content'

export class CdgComponentListDemo extends CdgDocumentComponent {
  menuListItemDemoEl
  listViewEl
  selectedSlug = ''

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
      if (listView && listView.children && listView.children.length) {
        for (let index = 0; index < listView.children.length; index++) {
          const menuListItemDemo = listView.children.item(index)
          menuListItemDemo.setAttribute('selected-slug', this.selectedSlug)
        }
      }
    })

    this.dispatchEvent(new CustomEvent('showPopover'))
  }

  disconnectedCallback() {
    window.removeEventListener('keyup', this.handleKeyUpFn)
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'filter':
        this.selectedSlug = ''
        this.displayData = this.filterList()
        this.loop.loop(this.displayData)
        this.dispatchEvent(new CustomEvent('onFiltered'))
        break
      case 'focusing':
        setTimeout(() => {
          const isFocusing = this.hasAttribute('focusing')
          if (!this.handleKeyUpFn) {
            this.handleKeyUpFn = this.handleKeyUp.bind(this)
          }
          if (isFocusing) {
            window.addEventListener('keyup', this.handleKeyUpFn)
          } else {
            window.removeEventListener('keyup', this.handleKeyUpFn)
          }
        })
        break

      default:
        break
    }
  }

  handleKeyUp(event) {
    const listView = this.querySelector('cdg-list-view')
    if (event.code === 'Enter' && this.selectedSlug) {
      const selectingEl = listView.querySelector(
        '.child-menu cdg-menu-child-item.selecting',
      )
      selectingEl.click()
      this.dispatchEvent(new CustomEvent('onSelectItem'))
      return
    }
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
      for (let index = 0; index < listView.children.length; index++) {
        const menuListItemDemo = listView.children.item(index)
        menuListItemDemo.setAttribute('selected-slug', this.selectedSlug)
      }
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
