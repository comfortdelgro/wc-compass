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

    thumbnail.addEventListener('click', this.showViewer.bind(this, null))

    this.viewerGroup = document.createElement('cdg-group-image-viewer')

    this.viewer = document.createElement('cdg-image-viewer')

    this.viewerGroup.appendChild(this.viewer)

    this.initGrid()
  }

  initGrid() {
    const urls = []
    const thumbnailGrid = this.querySelector('#sample-thumbnail-grid')
    const thumbs = thumbnailGrid.querySelectorAll('.sample-thumbnail')
    if (thumbs && thumbs.length) {
      thumbs.forEach((thumb) => {
        thumb.addEventListener('click', this.showViewer.bind(this, thumbs))
        urls.push({
          src: thumb.getAttribute('src'),
          largeSrc: thumb.getAttribute('largeSrc'),
        })
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
