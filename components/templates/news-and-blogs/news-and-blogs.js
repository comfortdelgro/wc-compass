import {CdgDocumentComponent} from '../../../shared/document-component'
import {downloadHTMLContent} from '../../../shared/utils'
import '../contents/news-blogs.html'
import template from './news-and-blogs.html'

export class CdgNewsAndBlogsDemo extends CdgDocumentComponent {
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
    iframe.setAttribute(
      'src',
      './components/templates/contents/news-blogs.html',
    )
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
    downloadHTMLContent('./components/templates/contents/news-blogs.html').then(
      (result) => {
        const highlightedCode = hljs.highlightAuto(result).value
        code.innerHTML = highlightedCode
      },
    )
  }
}
