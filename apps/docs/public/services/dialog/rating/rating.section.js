import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './rating.section.html'

export class CdgDialogRatingSection extends CdgBaseDocsComponent {
  value

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showRatingButton = this.querySelector('#showRatingButton')

    showRatingButton.addEventListener('click', this.showRating.bind(this))
  }

  showRating() {
    const content = document
      .querySelector('#showRating')
      .content.firstElementChild.cloneNode(true)

    const rating = content.querySelector('cdg-rating')
    rating.addEventListener('rate', (event) => {
      this.value = event.detail
    })

    const dialog = cdgDialogService.confirmCustom({
      content,
      executeLabel: 'Submit',
    })

    dialog.addEventListener('close', (event) => {
      cdgToastService.toast(
        event.detail ? 'Rated with value: ' + this.value + '' : 'Cancel',
      )
    })
  }
}
