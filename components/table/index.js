import './table.html'

import {CdgTableEditableSection} from './editable/editable.section'
import {CdgTableEventsSection} from './events/events.section'
import {CdgTableLayoutSection} from './layouts/layout.section'
import {CdgTableSimpleSectionNested} from './nested-data/simple.section.nested'
import {CdgTableOptionsSection} from './options/options.section'
import {CdgTablePropertiesSection} from './properties/properties.section'
import {CdgTableSimpleSection} from './simple/simple.section'
import {CdgTableDemo} from './table'
import { CdgTableOptionsNestedHeaderSection } from './options-nested-header/options-nested-header.section'

customElements.define('cdg-table-options-section', CdgTableOptionsSection)
customElements.define('cdg-table-options-nested-header', CdgTableOptionsNestedHeaderSection)
customElements.define('cdg-table-simple-section', CdgTableSimpleSection)
customElements.define(
  'cdg-table-simple-section-nested',
  CdgTableSimpleSectionNested,
)
customElements.define('cdg-table-layout-section', CdgTableLayoutSection)
customElements.define('cdg-table-editable-section', CdgTableEditableSection)
customElements.define('cdg-table-properties-section', CdgTablePropertiesSection)
customElements.define('cdg-table-events-section', CdgTableEventsSection)
customElements.define('cdg-table-demo', CdgTableDemo)

export {
  CdgTableOptionsSection,
  CdgTableSimpleSection,
  CdgTableSimpleSectionNested,
  CdgTableLayoutSection,
  CdgTablePropertiesSection,
  CdgTableEventsSection,
  CdgTableDemo,
  CdgTableEditableSection,
}
