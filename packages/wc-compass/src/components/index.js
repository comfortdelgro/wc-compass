import {CdgAccordion} from './accordion/accordion'
import {CdgAccordionContent} from './accordion/accordion-content'
import {CdgAccordionHeader} from './accordion/accordion-header'
import {CdgAlertBadge} from './alert-badge/alert-badge'
import {CdgAlert} from './alert/alert'
import {CdgAlertContent} from './alert/alert-content'
import {CdgAvatar} from './avatar/avatar'
import {CdgCalendar} from './calendar/calendar'
import {CdgChart} from './chart/chart'
import {CdgContextMenu} from './context-menu/context-menu'
import {CdgDatePicker} from './datepicker/datepicker'
import {CdgDropdown} from './dropdown/dropdown'
import {CdgDropdownOption} from './dropdown/dropdown-option'
import {CdgDropdownSelect} from './dropdown/dropdown-select'
import {CdgFadeIn} from './fade-in/fade-in'
import {CdgFile} from './file/file'
import {CdgFileUpload} from './file/file-upload'
import {CdgFloatingContent} from './floating-content/floating-content'
import {CdgGutter} from './gutter/gutter'
import {CdgIcon} from './icon/icon'
import {CdgInlineLoading} from './inline-loading/inline-loading'
import {CdgLazyImage} from './lazy-image/lazy-image'
import {CdgListItem} from './list-view/list-item'
import {CdgListview} from './list-view/list-view'
import {CdgLoading} from './loading/loading'
import {CdgMultiLevelDropdown} from './multi-level-dropdown/multi-level-dropdown'
import {CdgLinkPagination} from './pagination/link-pagination'
import {CdgPagination} from './pagination/pagination'
import {CdgPillBadge} from './pill-badge/pill-badge'
import {CdgPopover} from './popover/popover'
import {CdgPopoverContent} from './popover/popover-content'
import {CdgProgress} from './progress/progress'
import {CdgQuantityToggle} from './quantity-toggle/quantity-toggle'
import {CdgRangeSlider} from './range-slider/range-slider'
import {CdgRating} from './rating/rating'
import {CdgRichTextEditor} from './rich-text-editor/rich-text-editor'
import {CdgRichTextEditorToolbar} from './rich-text-editor/rte-toolbar'
import {CdgSelectColor} from './select-color/select-color'
import {CDGServiceCard} from './service-card/service-card'
import {CdgStatus} from './status/status'
import {CdgTab} from './tab/tab'
import {CdgTabs} from './tab/tabs'
import {CdgTagBoxContainer} from './tag-box/tag-box'
import {CdgTagBoxItem} from './tag-box/tag-box-item'
import {CdgTooltip} from './tooltip/tooltip'
import {CdgVideoPlayer} from './video/video'
import {CdgVideoControls} from './video/video-controls'
import {CdgVolume} from './volume/volume'

customElements.define('cdg-accordion', CdgAccordion)
customElements.define('cdg-accordion-header', CdgAccordionHeader)
customElements.define('cdg-accordion-content', CdgAccordionContent)
customElements.define('cdg-alert', CdgAlert)
customElements.define('cdg-alert-badge', CdgAlertBadge)
customElements.define('cdg-alert-content', CdgAlertContent)
customElements.define('cdg-avatar', CdgAvatar)
customElements.define('cdg-icon', CdgIcon)
customElements.define('cdg-inline-loading', CdgInlineLoading)
customElements.define('cdg-file', CdgFile)
customElements.define('cdg-file-upload', CdgFileUpload)
customElements.define('cdg-loading', CdgLoading)
customElements.define('cdg-pagination', CdgPagination)
customElements.define('cdg-link-pagination', CdgLinkPagination)
customElements.define('cdg-pill-badge', CdgPillBadge)
customElements.define('cdg-status', CdgStatus)
customElements.define('cdg-tab', CdgTab)
customElements.define('cdg-tabs', CdgTabs)
customElements.define('cdg-dropdown', CdgDropdown)
customElements.define('cdg-dropdown-select', CdgDropdownSelect)
customElements.define('cdg-floating-content', CdgFloatingContent)
customElements.define('cdg-dropdown-option', CdgDropdownOption)
customElements.define('cdg-popover', CdgPopover)
customElements.define('cdg-popover-content', CdgPopoverContent)
customElements.define('cdg-progress', CdgProgress)
customElements.define('cdg-calendar', CdgCalendar)
customElements.define('cdg-datepicker', CdgDatePicker)
customElements.define('cdg-list-view', CdgListview)
customElements.define('cdg-list-item', CdgListItem)
customElements.define('cdg-tooltip', CdgTooltip)
customElements.define('cdg-range-slider', CdgRangeSlider)
customElements.define('cdg-quantity-toggle', CdgQuantityToggle)
customElements.define('cdg-service-card', CDGServiceCard)
customElements.define('cdg-tag-box-container', CdgTagBoxContainer)
customElements.define('cdg-tag-box-item', CdgTagBoxItem)
customElements.define('cdg-video-player', CdgVideoPlayer)
customElements.define('cdg-video-controls', CdgVideoControls)
customElements.define('cdg-volume', CdgVolume)
customElements.define('cdg-rating', CdgRating)
customElements.define('cdg-rich-text-editor', CdgRichTextEditor)
customElements.define('cdg-rte-toolbar', CdgRichTextEditorToolbar)
customElements.define('cdg-dropdown-menu', CdgMultiLevelDropdown)
customElements.define('cdg-context-menu', CdgContextMenu)
customElements.define('cdg-chart', CdgChart)
customElements.define('cdg-gutter', CdgGutter)
customElements.define('cdg-select-color', CdgSelectColor)
customElements.define('cdg-lazy-img', CdgLazyImage)
customElements.define('cdg-fade-in', CdgFadeIn)

export const CONTROL_COMPONENTS = [
  CdgAccordion,
  CdgAccordionHeader,
  CdgAccordionContent,
  CdgAlert,
  CdgAlertContent,
  CdgAlertBadge,
  CdgAvatar,
  CdgIcon,
  CdgFile,
  CdgFileUpload,
  CdgInlineLoading,
  CdgLoading,
  CdgPagination,
  CdgLinkPagination,
  CdgPillBadge,
  CdgStatus,
  CdgTab,
  CdgTabs,
  CdgDropdown,
  CdgProgress,
  CdgListview,
  CdgListItem,
  CdgTooltip,
  CdgDatePicker,
  CdgRangeSlider,
  CdgQuantityToggle,
  CDGServiceCard,
  CdgVideoPlayer,
  CdgVideoControls,
  CdgVolume,
  CdgRating,
  CdgRichTextEditor,
  CdgRichTextEditorToolbar,
  CdgMultiLevelDropdown,
  CdgContextMenu,
  CdgChart,
  CdgGutter,
  CdgSelectColor,
  CdgLazyImage,
  CdgFadeIn,
]
