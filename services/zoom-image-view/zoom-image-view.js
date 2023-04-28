import {CdgDocumentComponent} from '../../shared/document-component'
import template from './zoom-image-view.html'

export class CdgZoomImageViewDemo extends CdgDocumentComponent {
  viewerGroup
  viewer
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const thumbnail = this.querySelector('#sample-thumbnail')
    thumbnail.addEventListener('click', this.showViewer.bind(this, null))
    this.initGrid()
  }

  initGrid() {
    const thumbnailGrid = this.querySelector('#sample-thumbnail-grid')
    const thumbs = thumbnailGrid.querySelectorAll('.sample-thumbnail')
    if (thumbs && thumbs.length) {
      thumbs.forEach((thumb) => {
        thumb.addEventListener('click', this.showViewer.bind(this, thumbs))
      })
    }
  }

  showViewer(images, event) {
    if (images) {
      cdgImageViewerService.showGroup(event.target, images)
    } else {
      cdgImageViewerService.showImage(event.target)
    }
  }
}
