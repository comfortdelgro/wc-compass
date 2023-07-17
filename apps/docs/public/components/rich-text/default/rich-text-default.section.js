import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './rich-text-default.section.html'

export class CdgRichTextDefaultSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const example1 = this.querySelector('#rte-example-1')
    example1.addEventListener('onRichTextEditorUpdate', (event) => {
      // get the content with event.detail
      console.log(event.detail)
    })
  }
}
