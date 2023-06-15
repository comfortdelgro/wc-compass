import {CdgDocumentComponent} from '../../shared/document-component'
import template from './tooltip.html'

export class CdgTooltipDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template

    setTimeout(() => {
      const placements = document.querySelector(
        'cdg-dropdown[name="placements"]',
      )
      const cdgPopovers = document.querySelectorAll('cdg-tooltip')

      cdgPopovers.forEach((cdgPopover) => {
        if (cdgPopover) {
          cdgPopover.addEventListener('onOpenChange', function(event) {
              console.log('onOpenChange: ', event.detail);
          })
        }
      })

      placements.addEventListener('onchangevalue', function (event) {
        cdgPopovers.forEach((cdgPopover) => {
          if (cdgPopover) {
            cdgPopover.setAttribute('placement', event.detail)
          }
        })
      })
      const types = document.querySelector('cdg-dropdown[name="type-tooltip"]')
      types.addEventListener('onchangevalue', function (event) {
        cdgPopovers.forEach((cdgPopover) => {
          if (cdgPopover) {
            cdgPopover.setAttribute('type', event.detail)
          }
        })
      })
    }, 1000)
  }
}
