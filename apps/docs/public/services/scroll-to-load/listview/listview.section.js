import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './listview.section.html'

import {listenOnBottom} from '@comfortdelgro/wc-compass/src/shared/dom'
import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'

export class CdgListviewSection extends CdgBaseDocsComponent {
  data = []
  last = 0
  fetching = false
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.appendData()

    const wrapper = this.querySelector('cdg-list-view')
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
            this.appendData()
            loop.loop(this.data)
            this.fetching = false
            cdgLoadingService.hide(loadingId)
          }, 1000)
        }
      })

      const loop = new CdgLoop(wrapper)
      loop.loop(this.data)
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
