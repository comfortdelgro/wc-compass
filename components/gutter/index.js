import {CdgGutterDemo} from './gutter'
import {CdgGutterPropertiesSection} from './properties/properties.section'

customElements.define('cdg-gutter-demo', CdgGutterDemo)

customElements.define(
  'cdg-gutter-properties-section',
  CdgGutterPropertiesSection,
)

export {CdgGutterDemo, CdgGutterPropertiesSection}
