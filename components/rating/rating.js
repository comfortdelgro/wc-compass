import {CdgDocumentComponent} from '../../shared/document-component'
import template from './rating.html'

export class CdgRatingDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const ratings = this.querySelectorAll('cdg-rating')
    ratings.forEach((element) => {
      element.addEventListener('rate', (event) => {
        cdgToastService.toast('Selected ' + event.detail)
      })
    })
  }
}
