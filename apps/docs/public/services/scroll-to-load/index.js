// import {CdgToastPropertiesSection} from './properties/properties.section'
import {CdgAnyElementSection} from './any-element/any-element.section'
import {CdgGridSection} from './grid/grid.section'
import {CdgListviewSection} from './listview/listview.section'
import {CdgScrollToLoadDemo} from './scroll-to-load'

// customElements.define('cdg-toast-properties-section', CdgToastPropertiesSection)
customElements.define('cdg-scroll-to-load-demo', CdgScrollToLoadDemo)
customElements.define('cdg-any-element-section', CdgAnyElementSection)
customElements.define('cdg-listview-section', CdgListviewSection)
customElements.define('cdg-grid-scroll-section', CdgGridSection)

export {
  CdgScrollToLoadDemo,
  CdgAnyElementSection,
  CdgListviewSection,
  CdgGridSection,
}
