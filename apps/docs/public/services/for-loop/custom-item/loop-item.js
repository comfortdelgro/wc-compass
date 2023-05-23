import {CdgBaseComponent} from '@comfortdelgro/wc-compass/src/shared/base-component'

export class LoopItem extends CdgBaseComponent {
  constructor() {
    super()
    this.template = `
    <cdg-list-item>
      <div class="cdg-list-item-icon">
        <cdg-avatar name="{{item.user.name}}" size="40"></cdg-avatar>
      </div>
      <div class="cdg-list-item-info">
        <div class="cdg-list-item-title">{{item.user.name}}</div>
        <div class="cdg-list-item-description">{{item.user.job.title}}</div>
        <div class="cdg-list-item-description">{{item.user.job.location}}</div>
      </div>
      <div class="cdg-list-item-right-col">
        <div class="cdg-list-item-button">
          Details<cdg-icon name="arrow-right" size="18"></cdg-icon>
        </div>
      </div>
    </cdg-list-item>`
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      cdgToastService.toast('Clicked')
    })
  }
}
