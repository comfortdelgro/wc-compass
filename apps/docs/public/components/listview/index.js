import {CdgListviewDefaultSection} from './default/listview-default.section'
import {CdgListviewDraggableSection} from './draggable/draggable.section'
import {CdgListViewDemo} from './list-view'
import {CdgListviewPropertiesSection} from './properties/properties.section'

customElements.define('cdg-listview-demo', CdgListViewDemo)
customElements.define('cdg-listview-default-section', CdgListviewDefaultSection)
customElements.define(
  'cdg-listview-draggable-section',
  CdgListviewDraggableSection,
)
customElements.define(
  'cdg-listview-properties-section',
  CdgListviewPropertiesSection,
)

export {
  CdgListViewDemo,
  CdgListviewDefaultSection,
  CdgListviewDraggableSection,
  CdgListviewPropertiesSection,
}
