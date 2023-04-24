import {CdgBaseComponent} from './base-component'

export class CdgDocumentComponent extends CdgBaseComponent {
  constructor() {
    super()
  }

  registerPageIndex() {
    setTimeout(() => {
      document.querySelector('cdg-page-indexes').registerTableContent(this)
    }, 20) // Workaround for fully content rendered
  }
}
