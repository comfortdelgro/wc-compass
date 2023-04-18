import {CdgDropdownColorPropertiesSection} from './properties/color-properties.section'
import {CdgDropdownPropertiesSection} from './properties/dropdown-properties.section'
import {CdgDropdownOptPropertiesSection} from './properties/opt-properties.section'

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
  CdgDropdownPropertiesSection,
  CdgDropdownOptPropertiesSection,
  CdgDropdownColorPropertiesSection,
}
