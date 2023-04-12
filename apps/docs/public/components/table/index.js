import {CdgTableLayoutSection} from './layouts/layout.section'
import {CdgTableOptionsSection} from './options/options.section'
import {CdgTableSimpleSection} from './simple/simple.section'

customElements.define('cdg-table-options-section', CdgTableOptionsSection)
customElements.define('cdg-table-simple-section', CdgTableSimpleSection)
customElements.define('cdg-table-layout-section', CdgTableLayoutSection)

export {CdgTableOptionsSection, CdgTableSimpleSection, CdgTableLayoutSection}
