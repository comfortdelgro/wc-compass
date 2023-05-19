import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'
import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './advanced-for-loop.section.html'

export class CdgAdvancedForLoopDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const container = this.querySelector('.cdg-advanced-for-loop')
    const data = [
      {
        id: 1,
        user: {
          name: 'Michael',
          job: {
            title: 'developer',
            location: 'FPT',
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
      {
        id: 3,
        user: {
          name: 'Kurma',
          job: {
            title: 'BA',
            location: 'India',
          },
        },
      },
      {
        id: 4,
        user: {
          name: 'Denis',
          job: {
            title: 'SA',
            location: 'SG',
          },
        },
      },
      {
        id: 5,
        user: {
          name: 'Wade',
          job: {
            title: 'PO',
            location: 'US',
          },
        },
      },
    ]

    if (container) {
      const loop = new CdgLoop(container)
      loop.loop(data)
    }
  }
}
