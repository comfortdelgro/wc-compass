import './list-view.html'

import {CdgListviewDefaultSection} from './default/listview-default.section'
import {CdgListviewDraggableSection} from './draggable/draggable.section'
import {CdgListviewPropertiesSection} from './properties/properties.section'

customElements.define('cdg-listview-default-section', CdgListviewDefaultSection)
customElements.define(
  'cdg-listview-draggable-section',
  CdgListviewDraggableSection,
)
customElements.define(
  'cdg-listview-properties-section',
  CdgListviewPropertiesSection,
)

export {CdgListviewDefaultSection, CdgListviewDraggableSection, CdgListviewPropertiesSection}
