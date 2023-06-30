import {CdgBaseComponent} from '@comfortdelgro/wc-compass/src/shared/base-component'

export class MenuChildItemDemo extends CdgBaseComponent {
  static get observedAttributes() {
    return ['selected-slug']
  }

  constructor() {
    super()
    this.template = `<cdg-list-item selectable-item>
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

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return
    switch (attr) {
      case 'selected-slug':
        if (newValue === this.slug) {
          this.classList.add('selecting')
          this.scrollIntoView({behavior: 'smooth', block: 'center'})
        } else {
          this.classList.remove('selecting')
        }
        break

      default:
        break
    }
  }

  afterViewInit() {}
}
