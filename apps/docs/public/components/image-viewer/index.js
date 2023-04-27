import {CdgImageViewerDemo} from './image-viewer'
import {CdgInlineViewerSection} from './inline/inline-viewer.section'
import {CdgInlineImageViewerMethodsSection} from './methods/methods.section'
import {CdgInlineImageViewerPropertiesSection} from './properties/properties.section'

customElements.define('cdg-image-viewer-demo', CdgImageViewerDemo)
customElements.define('cdg-image-viewer-inline-section', CdgInlineViewerSection)
customElements.define(
  'cdg-inline-image-viewer-properties-section',
  CdgInlineImageViewerPropertiesSection,
)
customElements.define(
  'cdg-inline-image-viewer-methods-section',
  CdgInlineImageViewerMethodsSection,
)

export {
  CdgImageViewerDemo,
  CdgInlineViewerSection,
  CdgInlineImageViewerPropertiesSection,
  CdgInlineImageViewerMethodsSection,
}
