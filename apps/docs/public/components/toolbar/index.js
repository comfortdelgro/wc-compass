import {CdgToolbarPropertiesSection} from './properties/properties.section'
import {CdgToolbarDemo} from './toolbar'

customElements.define('cdg-toolbar-demo', CdgToolbarDemo)

customElements.define(
  'cdg-toolbar-properties-section',
  CdgToolbarPropertiesSection,
)

export {CdgToolbarDemo, CdgToolbarPropertiesSection}
