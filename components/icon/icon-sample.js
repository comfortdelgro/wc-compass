import {CdgBaseComponent} from '@comfortdelgro/wc-compass/src/shared/base-component'

const TEMPLATE = `<cdg-icon name="{{item}}"></cdg-icon>
  <span class="item-name">{{item}}</span>`
export class IconSample extends CdgBaseComponent {
  constructor() {
    super()
    this.template = TEMPLATE
    this.classList.add('item-sample')
  }
  connectedCallback() {
    this.addEventListener('click', () => {
      let icon = `<cdg-icon name="${this.textContent.trim()}"></cdg-icon>`
      navigator.clipboard.writeText(icon)
      cdgToastService.toast('Copied to clipboard!')
    })
  }
}
