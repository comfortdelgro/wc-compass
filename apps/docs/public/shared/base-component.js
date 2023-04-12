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
        this.complieSampleCode()
      })
    } else if (this.htmlContent) {
      this.innerHTML = this.htmlContent
      this.onInit()
      this.complieSampleCode()
    }
  }

  onInit() {}

  complieSampleCode() {
    if (hljs) {
      hljs.highlightAll()
    }
  }
}
