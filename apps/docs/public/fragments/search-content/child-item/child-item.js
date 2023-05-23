import {CdgBaseComponent} from '@comfortdelgro/wc-compass/src/shared/base-component'

export class MenuChildItemDemo extends CdgBaseComponent {
  constructor() {
    super()
    this.template = `<cdg-list-item>
    <div class="cdg-list-item-info">
      <div class="cdg-list-item-name">{{item.name}}</div>
      <div class="cdg-list-item-description">{{item.slug}}</div>
    </div>
    <cdg-icon name="arrow-right" size="16"></cdg-icon>
  </cdg-list-item>`
  }

  connectedCallback() {
    this.tabIndex = 0
    this.addEventListener('click', () => {
      const popover = document.querySelector('#top-search-popover')
      if (popover) {
        popover.removeAttribute('open')
      }
      window.location.hash = '#' + this.slug
    })
  }

  afterViewInit() {}
}
