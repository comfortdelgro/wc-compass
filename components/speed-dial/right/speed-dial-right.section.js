import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './speed-dial-right.section.html'

export class CdgSpeedDialRightSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const speedDial = this.querySelector('cdg-speed-dial')
    const speedDialButton = this.querySelector('#speedDialButton')
    const editButton = this.querySelector('#editButton')
    const removeButton = this.querySelector('#removeButton')
    speedDialButton.addEventListener('click', () => {
      speedDial.toggle()
    })
    editButton.addEventListener('click', () => {
      cdgToastService.toast('Clicked on edit button')
      speedDial.close()
    })
    removeButton.addEventListener('click', () => {
      cdgToastService.toast('Clicked on remove button')
      speedDial.close()
    })
  }
}
