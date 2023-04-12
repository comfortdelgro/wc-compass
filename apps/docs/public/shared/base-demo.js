import {CdgBaseComponent} from './base-component'

export class CdgDocsBaseComponent extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('cdg-docs-component')
  }
}
