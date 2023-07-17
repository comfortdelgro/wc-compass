import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './inline-viewer.section.html'

export class CdgInlineViewerSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const imageViewer = this.querySelector('#inlineImageViewer')

    const zoomInButton = this.querySelector('#zoomIn')
    const zoomOutButton = this.querySelector('#zoomOut')

    zoomInButton.addEventListener('click', () => {
      imageViewer.zoomIn()
    })

    zoomOutButton.addEventListener('click', () => {
      imageViewer.zoomOut()
    })
  }
}
