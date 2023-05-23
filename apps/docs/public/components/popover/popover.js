import {CdgDocumentComponent} from '../../shared/document-component'
import template from './popover.html'

export class CdgPopoverDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template

    setTimeout(() => {
      const directions = this.querySelector('cdg-dropdown[name="directions"]')
      const cdgPopover = this.querySelector('cdg-popover')
      if (cdgPopover) {
        directions.addEventListener('onchangevalue', function (event) {
          cdgPopover.setAttribute('direction', event.detail)
        })
        const buttonPopover = cdgPopover.querySelector('button#buttonPopover')
        buttonPopover.addEventListener('click', function (event) {
          cdgPopover.setAttribute('open', 'true')
        })
      }
    }, 1000)
  }
}
