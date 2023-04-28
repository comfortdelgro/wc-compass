export class CdgImageModel {
  image

  constructor(image) {
    this.image = image
  }

  get src() {
    return this.image.getAttribute('src') || ''
  }

  get largeSrc() {
    return this.image.getAttribute('largeSrc') || this.src
  }
}

export class CdgImageViewerService {
  viewerGroup

  showImage(image) {
    this.viewerGroup = document.createElement('cdg-group-image-viewer')
    this.viewerGroup.images = [new CdgImageModel(image)]

    document.body.appendChild(this.viewerGroup)
  }

  showGroup(currentImage, images) {
    this.viewerGroup = document.createElement('cdg-group-image-viewer')
    const imageList = []

    if (images && images.length) {
      this.viewerGroup.currentIndex = Array.from(images).indexOf(currentImage)
      images.forEach((image) => {
        imageList.push(new CdgImageModel(image))
      })
    }

    this.viewerGroup.images = imageList

    document.body.appendChild(this.viewerGroup)
  }
}
