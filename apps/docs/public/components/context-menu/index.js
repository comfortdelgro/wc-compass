import {CdgContextMenuDemo} from './context-menu'
import {CdgContextMenuPropertiesSection} from './properties/properties.section'
import {CdgQuickCtxSection} from './quick/quick-ctx.section'

customElements.define('cdg-context-menu-demo', CdgContextMenuDemo)
customElements.define(
  'cdg-context-menu-properties-section',
  CdgContextMenuPropertiesSection,
)

customElements.define('cdg-quick-ctx-section', CdgQuickCtxSection)

export {CdgContextMenuDemo, CdgContextMenuPropertiesSection, CdgQuickCtxSection}
