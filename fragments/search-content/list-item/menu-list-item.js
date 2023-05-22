import {CdgBaseComponent} from '@comfortdelgro/wc-compass/src/shared/base-component'
import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'

import {MenuChildItemDemo} from '../child-item/child-item'
customElements.define('cdg-menu-child-item', MenuChildItemDemo)

export class MenuListItemDemo extends CdgBaseComponent {
  constructor() {
    super()
    this.template = `<cdg-list-item class="parent-item">
    <div class="cdg-list-item-info">
      <div class="cdg-list-item-description">
        {{item.name}}
        <small>({{item.childList.length}} results)</small>
      </div>
    </div>
  </cdg-list-item>
  <cdg-list-view class="child-menu">
    <template>
      <cdg-menu-child-item></cdg-menu-child-item>
    </template>
  </cdg-list-view>`
  }

  afterViewInit() {
    const childListElement = this.querySelector('.child-menu')
    if (this.childList && this.childList.length) {
      const loop = new CdgLoop(childListElement)
      loop.loop(this.childList)
    } else {
      this.classList.add('no-child')
      this.removeChild(childListElement)
    }
  }
}
