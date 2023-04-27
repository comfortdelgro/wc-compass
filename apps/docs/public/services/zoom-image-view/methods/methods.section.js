import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgImageViewerServiceMethodsSection extends CdgTableComponentSection {
  constructor() {
    super('Methods')
    this.data = [
      {
        name: '<code>showImage</code>',
        arguments: '<code>image</code>',
        description: 'Image element',
      },
      {
        name: '<code>showGroup</code>',
        arguments: '<code>(currentImage, images)</code>',
        description: `<code>currentImage</code>: image element that user clicked on<br/>
                      <code>images</code>: Array of images elements`,
      },
    ]
  }
}
