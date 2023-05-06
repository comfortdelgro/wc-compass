import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgInlineImageViewerMethodsSection extends CdgTableComponentSection {
  constructor() {
    super('Methods')
    this.data = [
      {
        name: '<code>zoomIn</code>',
        arguments: '',
        description: 'To zoom in for 50% per step',
      },
      {
        name: '<code>zoomOut</code>',
        arguments: '',
        description: 'To zoom out for 50% per step',
      },
      {
        name: '<code>setImage</code>',
        arguments: '<code>HTMLImageElement</code>',
        description: 'To update the image from external events',
      },
      {
        name: '<code>setImageUrl</code>',
        arguments: '<code>url</code>',
        description: 'To update the image by url',
      },
    ]
  }
}
