import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'
import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './custom-item.section.html'
import {LoopItem} from './loop-item'
customElements.define('loop-item', LoopItem)

export class CdgCustomItemSection extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const container = this.querySelector('.custom-for-loop')
    const data = [
      {
        id: 1,
        user: {
          name: 'Michael',
          job: {
            title: 'Software Developer',
            location: 'FPT',
          },
        },
      },
      {
        id: 2,
        user: {
          name: 'Jordan',
          job: {
            title: 'Software Tester',
            location: 'Nba',
          },
        },
      },
      {
        id: 3,
        user: {
          name: 'Kurma',
          job: {
            title: 'Business Analyst',
            location: 'India',
          },
        },
      },
      {
        id: 4,
        user: {
          name: 'Denis',
          job: {
            title: 'Solution Architect',
            location: 'Singapore',
          },
        },
      },
      {
        id: 5,
        user: {
          name: 'Wade',
          job: {
            title: 'Product Owner',
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
