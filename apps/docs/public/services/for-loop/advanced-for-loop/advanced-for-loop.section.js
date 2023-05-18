import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './advanced-for-loop.section.html'

export class CdgAdvancedForLoopDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const forLoop = this.querySelector('.cdg-advanced-for-loop')
    forLoop.items = [
      {
        id: 1,
        user: {
          name: 'Michael',
          job: {
            title: 'developer',
            location: 'fpt',
          },
        },
      },
      {
        id: 2,
        user: {
          name: 'Jordan',
          job: {
            title: 'tester',
            location: 'nba',
          },
        },
      },
    ]
  }
}
