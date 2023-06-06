import {CdgDocumentComponent} from '../../../shared/document-component'
import {downloadHTMLContent} from '../../../shared/utils'
import '../contents/portal.html'
import template from './portal-demo.html'

export class CdgPortalDemo extends CdgDocumentComponent {
  content
  codeModal

  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }

  onInit() {
    super.onInit()
    this.content = this.querySelector('#demo-content')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', './components/templates/contents/portal.html')
    this.content.appendChild(iframe)

    this.codeModal =
      this.querySelector(
        '[for="codeModal"]',
      ).content.firstElementChild.cloneNode(true)

    const largeOkButton = this.codeModal.querySelector('#largeOkButton')

    largeOkButton.addEventListener('click', () => {
      this.codeModal.close()
    })

    const codeDemo = this.querySelector('#codeModal')
    codeDemo.addEventListener('click', this.showCode.bind(this))
  }

  showCode() {
    cdgDialogService.show('codeSampleModal', this.codeModal)
    const code = this.codeModal.querySelector('#code')
    downloadHTMLContent('./components/templates/contents/portal.html').then(
      (result) => {
        const highlightedCode = hljs.highlightAuto(result).value
        code.innerHTML = highlightedCode
      },
    )
  }
}
