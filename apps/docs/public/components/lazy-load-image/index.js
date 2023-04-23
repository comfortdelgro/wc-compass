import {CdgLazyLoadImageDemo} from './lazy-load-image'
import {CdgLazyLoadImagePropertiesSection} from './properties/properties.section'

customElements.define('cdg-lazy-load-image-demo', CdgLazyLoadImageDemo)

customElements.define(
  'cdg-lazy-load-image-properties-section',
  CdgLazyLoadImagePropertiesSection,
)

export {CdgLazyLoadImageDemo, CdgLazyLoadImagePropertiesSection}
