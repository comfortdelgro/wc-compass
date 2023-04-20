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
        this.onAfterViewInit()
      })
    } else if (this.htmlContent) {
      this.innerHTML = this.htmlContent
      this.onInit()
      this.complieSampleCode()
      this.onAfterViewInit()
    }
  }

  onInit() {}

  complieSampleCode() {
    if (hljs) {
      hljs.highlightAll()
    }
  }

  onAfterViewInit() {
    if (this.parentElement && this.parentElement.registerPageIndex) {
      this.parentElement.registerPageIndex()
    }
  }
}
