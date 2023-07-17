import {CdgBaseDocsComponent} from './base-component'

export class CdgDocsBaseComponent extends CdgBaseDocsComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('cdg-docs-component')
  }
}
