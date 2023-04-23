import {CdgListItemFullContentSection} from './full-content/full-content.section'
import {CdgListItemDemo} from './list-item'
import {CdgListItemNoDescriptionSection} from './no-description/no-description.section'
import {CdgListItemNoIconSection} from './no-icon/no-icon.section'
import {CdgListItemPropertiesSection} from './properties/properties.section'

customElements.define('cdg-list-item-demo', CdgListItemDemo)
customElements.define(
  'cdg-list-item-full-content-section',
  CdgListItemFullContentSection,
)
customElements.define(
  'cdg-list-item-no-description-section',
  CdgListItemNoDescriptionSection,
)
customElements.define('cdg-list-item-no-icon-section', CdgListItemNoIconSection)
customElements.define(
  'cdg-list-item-properties-section',
  CdgListItemPropertiesSection,
)

export {
  CdgListItemDemo,
  CdgListItemFullContentSection,
  CdgListItemNoDescriptionSection,
  CdgListItemNoIconSection,
  CdgListItemPropertiesSection,
}
