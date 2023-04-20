import {CdgRTEAllControlsSection} from './all-controls/all-controls.section'
import {CdgRTEDefaultSection} from './default/default.section'
import {CdgRTEEventsSection} from './events/events.section'
import {CdgRTEHiddenItemsSection} from './hidden-items/hidden-items.section'
import {CdgRTEPropertiesSection} from './properties/properties.section'
import './rich-text-editor.html'

customElements.define('cdg-rte-events-section', CdgRTEEventsSection)
customElements.define('cdg-rte-properties-section', CdgRTEPropertiesSection)
customElements.define('cdg-rte-default-section', CdgRTEDefaultSection)
customElements.define('cdg-rte-hidden-items-section', CdgRTEHiddenItemsSection)
customElements.define('cdg-rte-all-controls-section', CdgRTEAllControlsSection)

export {
  CdgRTEEventsSection,
  CdgRTEPropertiesSection,
  CdgRTEAllControlsSection,
  CdgRTEDefaultSection,
  CdgRTEHiddenItemsSection,
}
