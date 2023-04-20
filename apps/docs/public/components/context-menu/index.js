import {CdgContextMenuDemo} from './context-menu'
import {CdgContextMenuPropertiesSection} from './properties/properties.section'

customElements.define('cdg-context-menu-demo', CdgContextMenuDemo)

customElements.define(
  'cdg-context-menu-properties-section',
  CdgContextMenuPropertiesSection,
)

export {CdgContextMenuDemo, CdgContextMenuPropertiesSection}
