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
    const thumbnail = this.querySelector('#sample-thumbnail')

    zoomInButton.addEventListener('click', () => {
      imageViewer.zoomIn()
    })

    zoomOutButton.addEventListener('click', () => {
      imageViewer.zoomOut()
    })

    thumbnail.addEventListener('click', (event) => {
      const imageViewerWrapper = document.createElement(
        'cdg-group-image-viewer',
      )

      const fixedImageViewer = document.createElement('cdg-image-viewer')

      imageViewerWrapper.appendChild(fixedImageViewer)
      document.body.appendChild(imageViewerWrapper)

      fixedImageViewer.setImage(thumbnail)
    })
  }
}
