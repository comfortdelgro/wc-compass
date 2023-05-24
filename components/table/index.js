import './table.html'

import { CdgTableEditableSection2 } from './editable-v2/editable-v2.section'
import { CdgTableEditableSection } from './editable/editable.section'
import { CdgTableEventsSection } from './events/events.section'
import { CdgTableLayoutSection } from './layouts/layout.section'
import { CdgTableSimpleSectionNested } from './nested-data/simple.section.nested'
import { CdgTableOptionsNestedHeaderSection } from './options-nested-header/options-nested-header.section'
import { CdgTableOptionsSection } from './options/options.section'
import { CdgTablePropertiesSection } from './properties/properties.section'
import { CdgTableSimpleSection } from './simple/simple.section'
import { CdgTableDemo } from './table'

customElements.define('cdg-table-options-section', CdgTableOptionsSection)
customElements.define('cdg-table-options-nested-header', CdgTableOptionsNestedHeaderSection)
customElements.define('cdg-table-simple-section', CdgTableSimpleSection)
customElements.define(
  'cdg-table-simple-section-nested',
  CdgTableSimpleSectionNested,
)
customElements.define('cdg-table-layout-section', CdgTableLayoutSection)
customElements.define('cdg-table-editable-section', CdgTableEditableSection)
customElements.define('cdg-table-editable-section2', CdgTableEditableSection2)
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
  CdgTableEditableSection2,
  CdgTableEditableSection,
}


