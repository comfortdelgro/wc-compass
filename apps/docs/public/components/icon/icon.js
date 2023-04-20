import {CdgDocumentComponent} from '../../shared/document-component'
import {iconList} from './icon-list'
import template from './icon.html'

export class CdgIconDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }
  onInit() {
    const iconGrid = document.querySelector('#icon-grid')

    for (let icon of iconList) {
      iconGrid.appendChild(this.createIcon(icon.trim()))
    }
  }

  createIcon(name) {
    const iconTemplate = `<cdg-icon name="{{name}}"></cdg-icon>
    <span class="icon-name">{{name}}</span>`

    const icon = iconTemplate.replace(/{{name}}/g, name)
    const template = document.createElement('div')
    template.classList.add('icon-sample')
    template.innerHTML = icon

    return template
  }
}
