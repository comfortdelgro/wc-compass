import {CdgDropdownDemo} from './dropdown'
import {CdgDropdownColorPropertiesSection} from './properties/color-properties.section'
import {CdgDropdownPropertiesSection} from './properties/dropdown-properties.section'
import {CdgDropdownOptPropertiesSection} from './properties/opt-properties.section'

customElements.define('cdg-dropdown-demo', CdgDropdownDemo)
customElements.define(
  'cdg-dropdown-properties-section',
  CdgDropdownPropertiesSection,
)
customElements.define(
  'cdg-dropdown-opt-properties-section',
  CdgDropdownOptPropertiesSection,
)
customElements.define(
  'cdg-dropdown-color-properties-section',
  CdgDropdownColorPropertiesSection,
)

export {
  CdgDropdownDemo,
  CdgDropdownPropertiesSection,
  CdgDropdownOptPropertiesSection,
  CdgDropdownColorPropertiesSection,
}
