import {CdgAdvancedForLoopDemo} from './advanced-for-loop/advanced-for-loop.section'
import {CdgCustomItemSection} from './custom-item/custom-item.section'
import {CdgForLoopDefaultDemo} from './default-for-loop/default-for-loop.section'
import {CdgForLoopDemo} from './for-loop'
import {CdgForloopPropertiesSection} from './properties/properties.section'

customElements.define('cdg-for-loop-default-demo', CdgForLoopDefaultDemo)
customElements.define('cdg-for-loop-advanced-demo', CdgAdvancedForLoopDemo)
customElements.define(
  'cdg-for-loop-properties-demo',
  CdgForloopPropertiesSection,
)

customElements.define('cdg-custom-item-section', CdgCustomItemSection)
customElements.define('cdg-for-loop-demo', CdgForLoopDemo)

export {
  CdgForLoopDefaultDemo,
  CdgAdvancedForLoopDemo,
  CdgForloopPropertiesSection,
  CdgCustomItemSection,
}
