import {CdgProgressDemo} from './progress'
import {CdgProgressPropertiesSection} from './properties/properties.section'

customElements.define('cdg-progress-demo', CdgProgressDemo)
customElements.define(
  'cdg-progress-properties-section',
  CdgProgressPropertiesSection,
)

export {CdgProgressDemo, CdgProgressPropertiesSection}
