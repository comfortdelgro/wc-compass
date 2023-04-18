import {CdgCardCoverPropertiesSection} from './cover/cover.section'
import {CdgCardHeaderPropertiesSection} from './header/header.section'
import {CdgCardsPropertiesSection} from './properties/properties.section'
import {CdgCardStylesSection} from './styles/styles.section'

customElements.define('cdg-cards-properties-section', CdgCardsPropertiesSection)
customElements.define('cdg-card-styles-properties-section', CdgCardStylesSection)
customElements.define(
  'cdg-card-header-properties-section',
  CdgCardHeaderPropertiesSection,
)
customElements.define(
  'cdg-card-cover-properties-section',
  CdgCardCoverPropertiesSection,
)

export {
  CdgCardsPropertiesSection,
  CdgCardHeaderPropertiesSection,
  CdgCardCoverPropertiesSection,
}
