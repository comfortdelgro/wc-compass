import {CdgBaseComponent} from '../../../shared/base-component'
import template from './speed-dial-up.section.html'

export class CdgSpeedDialUpSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const speedDial = this.querySelector('#speedial')
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
