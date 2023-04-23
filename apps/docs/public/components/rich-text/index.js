import {CdgAllControlsSection} from './all-controls/all-controls.section'
import {CdgRichTextDefaultSection} from './default/rich-text-default.section'
import {CdgRichTextEventsSection} from './events/events.section'
import {CdgHiddenItemSection} from './hidden-item/hidden-item.section'
import {CdgRichTextPropertiesSection} from './properties/properties.section'
import {CdgRichTextDemo} from './rich-text'

customElements.define('cdg-rich-text-demo', CdgRichTextDemo)
customElements.define(
  'cdg-rich-text-default-section',
  CdgRichTextDefaultSection,
)
customElements.define('cdg-all-controls-section', CdgAllControlsSection)
customElements.define('cdg-hidden-item-section', CdgHiddenItemSection)
customElements.define(
  'cdg-rich-text-properties-section',
  CdgRichTextPropertiesSection,
)
customElements.define('cdg-rich-text-events-section', CdgRichTextEventsSection)

export {
  CdgRichTextDemo,
  CdgRichTextDefaultSection,
  CdgHiddenItemSection,
  CdgAllControlsSection,
  CdgRichTextPropertiesSection,
  CdgRichTextEventsSection,
}
