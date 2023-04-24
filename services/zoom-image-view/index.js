import {CdgImageViewerPropertiesSection} from './properties/properties.section'
import {CdgZoomImageViewDemo} from './zoom-image-view'

customElements.define('cdg-image-viewer-demo', CdgZoomImageViewDemo)
customElements.define(
  'cdg-image-viewer-properties-section',
  CdgImageViewerPropertiesSection,
)

export {CdgZoomImageViewDemo, CdgImageViewerPropertiesSection}
