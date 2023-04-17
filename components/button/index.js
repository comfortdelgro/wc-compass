import {CdgButtonDefaultSection} from './default/default.section'
import {CdgButtonLargeSection} from './large/large.section'
import {CdgButtonPropertiesSection} from './properties/properties.section'
import {CdgButtonSmallSection} from './small/small.section'
import {CdgButtonStylesSection} from './styles/styles.section'

customElements.define('cdg-button-default-section', CdgButtonDefaultSection)
customElements.define('cdg-button-large-section', CdgButtonLargeSection)
customElements.define('cdg-button-small-section', CdgButtonSmallSection)
customElements.define(
  'cdg-button-properties-section',
  CdgButtonPropertiesSection,
)
customElements.define('cdg-button-styles-section', CdgButtonStylesSection)

export {
  CdgButtonDefaultSection,
  CdgButtonLargeSection,
  CdgButtonSmallSection,
  CdgButtonPropertiesSection,
  CdgButtonStylesSection,
}
