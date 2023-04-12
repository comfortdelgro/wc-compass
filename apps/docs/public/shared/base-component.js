import {downloadHTMLContent} from './utils'

export class CdgBaseComponent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    if (this.template) {
      downloadHTMLContent(this.template).then((response) => {
        this.innerHTML = response
        this.onInit()
      })
    } else if (this.htmlContent) {
      this.innerHTML = this.htmlContent
      this.onInit()
    }
  }

  onInit() {}
}
