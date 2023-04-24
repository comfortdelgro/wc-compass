import {CdgLoadingDemo} from './loading'
import {CdgLoadingPropertiesSection} from './properties/properties.section'

customElements.define('cdg-loading-demo', CdgLoadingDemo)
customElements.define(
  'cdg-loading-properties-section',
  CdgLoadingPropertiesSection,
)

export {CdgLoadingDemo, CdgLoadingPropertiesSection}
