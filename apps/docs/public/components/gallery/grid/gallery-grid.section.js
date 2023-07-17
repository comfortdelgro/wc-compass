import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './gallery-grid.section.html'

export class CdgGalleryGridSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const gallery = document.querySelector('cdg-gallery')
    gallery.images = [
      {
        alt: 'Image 1',
        thumbnail: 'https://picsum.photos/id/43/250/175',
        large: 'https://picsum.photos/id/43/2000/1400',
      },
      {
        alt: 'Image 2',
        thumbnail: 'https://picsum.photos/id/44/250/175',
        large: 'https://picsum.photos/id/44/2000/1400',
      },
      {
        alt: 'Image 3',
        thumbnail: 'https://picsum.photos/id/45/250/175',
        large: 'https://picsum.photos/id/45/2000/1400',
      },
      {
        alt: 'Image 4',
        thumbnail: 'https://picsum.photos/id/46/250/175',
        large: 'https://picsum.photos/id/46/2000/1400',
      },
      {
        alt: 'Image 5',
        thumbnail: 'https://picsum.photos/id/47/250/175',
        large: 'https://picsum.photos/id/47/2000/1400',
      },
      {
        alt: 'Image 6',
        thumbnail: 'https://picsum.photos/id/48/250/175',
        large: 'https://picsum.photos/id/48/2000/1400',
      },
      {
        alt: 'Image 7',
        thumbnail: 'https://picsum.photos/id/49/250/175',
        large: 'https://picsum.photos/id/49/2000/1400',
      },
      {
        alt: 'Image 8',
        thumbnail: 'https://picsum.photos/id/50/250/175',
        large: 'https://picsum.photos/id/50/2000/1400',
      },
      {
        alt: 'Image 9',
        thumbnail: 'https://picsum.photos/id/51/250/175',
        large: 'https://picsum.photos/id/51/2000/1400',
      },
      {
        alt: 'Image 10',
        thumbnail: 'https://picsum.photos/id/52/250/175',
        large: 'https://picsum.photos/id/52/2000/1400',
      },
    ]
  }
}
