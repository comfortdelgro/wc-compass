import {CdgBaseComponent} from '../../../shared/base-component'
import template from './draggable.section.html'

export class CdgListviewDraggableSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const listView = this.querySelector('#dragsample')
    listView.addEventListener('dragitem', (event) => {
      console.log(event.detail)
    })

    let draggable = true

    const toggleButton = this.querySelector('#toggleDraggable')
    toggleButton.addEventListener('click', () => {
      draggable = !draggable
      if (draggable) {
        listView.setAttribute('allow-drag', '')
      } else {
        listView.removeAttribute('allow-drag')
      }
    })

    const bindingListViews = this.querySelectorAll('[draggableName="dragsample1"]')
    bindingListViews.forEach(list => {
      list.addEventListener('onAddItem', (event) => {
        console.log(`${list.id} fired onAddItem event: `, event.detail);
      })
      list.addEventListener('onRemoveItem', (event) => {
        console.log(`${list.id} fired onRemoveItem event: `, event.detail);
      })
    })
  }
}
