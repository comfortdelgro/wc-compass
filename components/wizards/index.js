import {CdgWizardsPropertiesSection} from './properties/properties.section'
import {CdgWizardsDemo} from './wizards'

customElements.define('cdg-wizards-demo', CdgWizardsDemo)

customElements.define(
  'cdg-wizards-properties-section',
  CdgWizardsPropertiesSection,
)

export {CdgWizardsDemo, CdgWizardsPropertiesSection}
