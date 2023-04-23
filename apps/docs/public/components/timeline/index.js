import {CdgTimelineFullWidthSection} from './full-width/timeline-full-width.section'
import {CdgTimelineHorizontalReverseSection} from './horizontal-reverse/timeline-horizontal-reverse.section'
import {CdgTimelineHorizontalSection} from './horizontal/timeline-horizontal.section'
import {CdgTimelineLeftSection} from './left/timeline-left.section'
import {CdgTimelineRightSection} from './right/timeline-right.section'
import {CdgTimelineDemo} from './timeline'
import {CdgTimelineZigzagSection} from './zigzag/timeline-zigzag.section'

customElements.define('cdg-timeline-demo', CdgTimelineDemo)
customElements.define('cdg-timeline-left-section', CdgTimelineLeftSection)
customElements.define('cdg-timeline-right-section', CdgTimelineRightSection)
customElements.define('cdg-timeline-zigzag-section', CdgTimelineZigzagSection)
customElements.define(
  'cdg-timeline-horizontal-section',
  CdgTimelineHorizontalSection,
)
customElements.define(
  'cdg-timeline-horizontal-reverse-section',
  CdgTimelineHorizontalReverseSection,
)
customElements.define(
  'cdg-timeline-full-width-section',
  CdgTimelineFullWidthSection,
)

export {
  CdgTimelineDemo,
  CdgTimelineLeftSection,
  CdgTimelineRightSection,
  CdgTimelineFullWidthSection,
  CdgTimelineZigzagSection,
  CdgTimelineHorizontalSection,
  CdgTimelineHorizontalReverseSection,
}
