import {CdgDocumentComponent} from '../../shared/document-component'
import template from './progress.html'

export class CdgProgressDemo extends CdgDocumentComponent {
  progress = 0
  progressBars
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.progressBars =
      this.querySelector('.sample-percentage').querySelectorAll('cdg-progress')
    this.countUp()
  }

  countUp() {
    this.progress += 1
    this.progressBars.forEach((element) => {
      element.percentage = this.progress
    })

    if (this.progress < 100) {
      setTimeout(() => {
        this.countUp()
      }, 20)
    } else {
      this.progress = 0
      this.countUp()
    }
  }
}
