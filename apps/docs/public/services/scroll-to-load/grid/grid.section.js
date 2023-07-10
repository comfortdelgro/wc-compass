import {CdgBaseComponent} from '../../../shared/base-component'
import template from './grid.section.html'

import {listenOnBottom} from '@comfortdelgro/wc-compass/src/shared/dom'

export class CdgGridSection extends CdgBaseComponent {
  data = []
  last = 0
  fetching = false
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.appendData()

    const table = this.querySelector('#sampleSimpleTable')
    table.data = [
      {
        first: 'Row 1',
        second: 'Second column data',
        third: 'Third column data with longer text than the others - row 1',
      },
      {
        first: 'Row 2',
        second: 'Second column',
        third: 'Third column data with longer text than the others - row 2',
      },
      {
        first: 'Row 3',
        second: 'Second of row 3',
        third: 'Third column data with longer text than the others - row 3',
      },
      {
        first: 'Row 4',
        second: 'Second of row 4',
        third: 'Third column data with longer text than the others - row 3',
      },
      {
        first: 'Row 5',
        second: 'Second of row 5',
        third: 'Third column data with longer text than the others - row 3',
      },
      {
        first: 'Row 6',
        second: 'Second of row 6',
        third: 'Third column data with longer text than the others - row 3',
      },
      {
        first: 'Row 7',
        second: 'Second of row 7',
        third: 'Third column data with longer text than the others - row 3',
      },
      {
        first: 'Row 8',
        second: 'Second of row 8',
        third: 'Third column data with longer text than the others - row 3',
      },
      {
        first: 'Row 8',
        second: 'Second of row 8',
        third: 'Third column data with longer text than the others - row 3',
      },
    ]

    const wrapper = document.querySelector('.page-container')
    if (wrapper) {
      listenOnBottom(wrapper)

      wrapper.addEventListener('bottom', () => {
        if (!this.fetching) {
          this.fetching = true

          const loadingId = cdgLoadingService.show(
            'local',
            wrapper.parentElement,
          )

          setTimeout(() => {
            this.fetching = false
            cdgLoadingService.hide(loadingId)
          }, 1000)
        }
      })
    }
  }

  createListItem(index) {
    return {
      id: index,
      user: {
        name: 'Michael ' + index,
        job: {
          title: 'developer',
          location: 'FPT',
        },
      },
    }
  }

  appendData() {
    for (let i = this.last; i < this.last + 10; i++) {
      this.data.push(this.createListItem(i + 1))
    }
    this.last = this.last + 10
  }
}
