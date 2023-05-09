import {CdgGalleryDemo} from './gallery'
import {CdgGalleryGridSection} from './grid/gallery-grid.section'
import {CdgGalleryPropertiesSection} from './properties/properties.section'

customElements.define('cdg-gallery-demo', CdgGalleryDemo)
customElements.define('cdg-gallery-grid-section', CdgGalleryGridSection)
customElements.define(
  'cdg-gallery-properties-section',
  CdgGalleryPropertiesSection,
)

export {CdgGalleryDemo, CdgGalleryGridSection, CdgGalleryPropertiesSection}
