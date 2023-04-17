import {CdgTableEventsSection} from './events/events.section'
import {CdgTableLayoutSection} from './layouts/layout.section'
import {CdgTableOptionsSection} from './options/options.section'
import {CdgTablePropertiesSection} from './properties/properties.section'
import {CdgTableSimpleSection} from './simple/simple.section'

customElements.define('cdg-table-options-section', CdgTableOptionsSection)
customElements.define('cdg-table-simple-section', CdgTableSimpleSection)
customElements.define('cdg-table-layout-section', CdgTableLayoutSection)
customElements.define('cdg-table-properties-section', CdgTablePropertiesSection)
customElements.define('cdg-table-events-section', CdgTableEventsSection)

export {
  CdgTableOptionsSection,
  CdgTableSimpleSection,
  CdgTableLayoutSection,
  CdgTablePropertiesSection,
  CdgTableEventsSection,
}
