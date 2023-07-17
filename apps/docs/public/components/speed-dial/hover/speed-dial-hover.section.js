import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './speed-dial-hover.section.html'

export class CdgSpeedDialHoverSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const editButton = this.querySelector('#editButton')
    const removeButton = this.querySelector('#removeButton')

    editButton.addEventListener('click', () => {
      cdgToastService.toast('Clicked on edit button')
    })
    removeButton.addEventListener('click', () => {
      cdgToastService.toast('Clicked on remove button')
    })
  }
}
