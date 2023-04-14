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
  }
}
