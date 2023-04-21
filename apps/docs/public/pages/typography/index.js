import {CdgTypographyBodySection} from './body/body.section'
import {CdgTypographyDisplaySection} from './display/display.section'
import {CdgTypographyHeadingSection} from './heading/heading.section'
import {CdgTypographyLabelSection} from './label/label.section'
import {CdgTypographyDemo} from './typography'

customElements.define('cdg-typography-demo', CdgTypographyDemo)
customElements.define(
  'cdg-typography-display-section',
  CdgTypographyDisplaySection,
)
customElements.define(
  'cdg-typography-heading-section',
  CdgTypographyHeadingSection,
)
customElements.define('cdg-typography-body-section', CdgTypographyBodySection)
customElements.define('cdg-typography-label-section', CdgTypographyLabelSection)

export {
  CdgTypographyDemo,
  CdgTypographyDisplaySection,
  CdgTypographyHeadingSection,
  CdgTypographyBodySection,
  CdgTypographyLabelSection,
}
