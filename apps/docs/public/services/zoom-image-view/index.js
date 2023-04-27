import {CdgImageViewerServiceMethodsSection} from './methods/methods.section'
import {CdgImageViewerPropertiesSection} from './properties/properties.section'
import {CdgZoomImageViewDemo} from './zoom-image-view'

customElements.define('cdg-image-viewer-service-demo', CdgZoomImageViewDemo)
customElements.define(
  'cdg-image-viewer-methods-section',
  CdgImageViewerServiceMethodsSection,
)
customElements.define(
  'cdg-image-viewer-properties-section',
  CdgImageViewerPropertiesSection,
)

export {
  CdgZoomImageViewDemo,
  CdgImageViewerPropertiesSection,
  CdgImageViewerServiceMethodsSection,
}
