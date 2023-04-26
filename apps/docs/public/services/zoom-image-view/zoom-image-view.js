import {CdgDocumentComponent} from '../../shared/document-component'
import template from './zoom-image-view.html'

export class CdgZoomImageViewDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const zoomInButton = this.querySelector('#zoomIn')
    const zoomOutButton = this.querySelector('#zoomOut')
    const imageViewer = this.querySelector('#inlineImageViewer')

    zoomInButton.addEventListener('click', () => {
      imageViewer.zoomIn()
    })

    zoomOutButton.addEventListener('click', () => {
      imageViewer.zoomOut()
    })
  }
}
