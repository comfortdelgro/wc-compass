import {CdgCarouselAnyContentSection} from './any-content/any-content.section'
import {CdgCarouselCardsCentralSection} from './cards-central/cards-central.section'
import {CdgCarouselCardsSection} from './cards/cards.section'
import {CdgCarouselDemo} from './carousel'
import {CdgCarouselFloattingContentSection} from './floatting-content/floatting-content.section'
import {CdgCarouselImagesSection} from './images/images.section'
import {CdgCarouselMobileSection} from './mobile/mobile.section'
import {CdgCarouselPromotionSection} from './promotion/promotion.section'
import {CdgCarouselPropertiesSection} from './properties/properties.section'

customElements.define('cdg-carousel-demo', CdgCarouselDemo)
customElements.define(
  'cdg-carousel-any-content-section',
  CdgCarouselAnyContentSection,
)
customElements.define('cdg-carousel-images-section', CdgCarouselImagesSection)
customElements.define(
  'cdg-carousel-promotion-section',
  CdgCarouselPromotionSection,
)
customElements.define('cdg-carousel-cards-section', CdgCarouselCardsSection)
customElements.define(
  'cdg-carousel-cards-central-section',
  CdgCarouselCardsCentralSection,
)
customElements.define(
  'cdg-carousel-floatting-content-section',
  CdgCarouselFloattingContentSection,
)
customElements.define('cdg-carousel-mobile-section', CdgCarouselMobileSection)
customElements.define(
  'cdg-carousel-properties-section',
  CdgCarouselPropertiesSection,
)

export {
  CdgCarouselDemo,
  CdgCarouselAnyContentSection,
  CdgCarouselImagesSection,
  CdgCarouselPromotionSection,
  CdgCarouselCardsSection,
  CdgCarouselCardsCentralSection,
  CdgCarouselFloattingContentSection,
  CdgCarouselMobileSection,
  CdgCarouselPropertiesSection,
}
