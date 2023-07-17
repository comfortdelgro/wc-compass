import {CdgBaseDocsComponent} from './base-component'

export class CdgDocumentComponent extends CdgBaseDocsComponent {
  useTableOfContent = true

  constructor() {
    super()
  }

  onInit() {
    if (!this.useTableOfContent) {
      document.querySelector('.table-of-content').setAttribute('hidden', '')
    } else {
      document.querySelector('.table-of-content').removeAttribute('hidden')
    }
  }

  registerPageIndex() {
    setTimeout(() => {
      document.querySelector('cdg-page-indexes').registerTableContent(this)
    }, 20) // Workaround for fully content rendered
  }
}
