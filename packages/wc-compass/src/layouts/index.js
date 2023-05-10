import {CdgImageAbout} from './about/image-about'
import {CdgActionBar} from './action-bar/action-bar'
import {CdgCard} from './card/card'
import {CdgCardActions} from './card/card-actions'
import {CdgCardBody} from './card/card-body'
import {CdgCardCover} from './card/card-cover'
import {CdgCardHeader} from './card/card-header'
import {CdgCarousel} from './carousel/carousel'
import {CdgCarouselScroller} from './carousel/carousel-scroller'
import {CdgDotsIndicator} from './carousel/dots-indicator'
import {CdgSlide} from './carousel/slide'
import {CdgDashboardSideCard} from './dashboard-side-card/dashboard-side-card'
import {CdgCardActivity} from './dashboard-side-card/side-card-activity'
import {CdgGallery} from './gallery/gallery'
import {CdgGroupAvatar} from './group-avatar/group-avatar'
import {CdgGroupImageViewer} from './image-viewer/group-image-viewer'
import {CdgImageViewer} from './image-viewer/image-viewer'
import {CdgThumbnailBar} from './image-viewer/thumbnail-bar'
import {CdgDialogActions} from './modal/dialog-actions'
import {CdgDialogAlert} from './modal/dialog-alert'
import {CdgDialogConfirm} from './modal/dialog-confirm'
import {CdgDialogConfirmCustom} from './modal/dialog-confirm-custom'
import {CdgDialogStatus} from './modal/dialog-success'
import {CdgDialogWarning} from './modal/dialog-warning'
import {CdgModal} from './modal/modal'
import {CdgModalActions} from './modal/modal-actions'
import {CdgModalBody} from './modal/modal-body'
import {CdgModalHeader} from './modal/modal-header'
import {CdgNavRail} from './nav-rail/nav-rail'
import {CdgNavbar} from './navbar/navbar'
import {CdgPageActions} from './page-header/page-actions'
import {CdgPageHeader} from './page-header/page-header'
import {CdgPageHeaderRow} from './page-header/page-header-row'
import {CdgPageTitle} from './page-header/page-title'
import {CdgSubHeader} from './page-header/sub-header'
import {CdgPortalNavbar} from './portal-navbar/portal-navbar'
import {CdgSidebar} from './sidebar/sidebar'
import {CdgSidebarActions} from './sidebar/sidebar-actions'
import {CdgSidebarBody} from './sidebar/sidebar-body'
import {CdgSidebarHeader} from './sidebar/sidebar-header'
import {CdgSubNav} from './sub-nav/sub-nav'
import {CdgSubNavGroup} from './sub-nav/sub-nav-group'
import { CdgTableNew } from './table-new/table'
import {CdgTable} from './table/table'
import {CdgTableBody} from './table/table-body'
import {CdgTableCell} from './table/table-cell'
import {CdgTableHead} from './table/table-head'
import {CdgTableHeadCell} from './table/table-head-cell'
import {CdgTableRow} from './table/table-row'
import {CdgTestimonial} from './testimonial/testimonial'
import {CdgTestimonialItem} from './testimonial/testimonial-item'
import {CdgTimeline} from './timeline/timeline'
import {CdgTimelineCard} from './timeline/timeline-card'
import {CdgTimelineCardBody} from './timeline/timeline-card-body'
import {CdgTimelineCardHeader} from './timeline/timeline-card-header'
import {CdgTimelineCardTime} from './timeline/timeline-card-time'
import {CdgTimelineGroup} from './timeline/timeline-group'
import {CdgTimelineHeader} from './timeline/timeline-header'
import {CdgToast} from './toast/toast'
import {CdgToastHeader} from './toast/toast-header'
import {CdgToastMessage} from './toast/toast-message'
import {CdgToastTime} from './toast/toast-time'
import {CdgToastTitle} from './toast/toast-title'
import {CdgToastTopActions} from './toast/toast-top-actions'
import {CdgWizardStep} from './wizards/wizard-step'
import {CdgWizards} from './wizards/wizards'
import {CdgZoomImageView} from './zoom-image-view/zoom-image-view'

// Layouts
customElements.define('cdg-toolbar', CdgActionBar)
customElements.define('cdg-card', CdgCard)
customElements.define('cdg-card-header', CdgCardHeader)
customElements.define('cdg-card-body', CdgCardBody)
customElements.define('cdg-card-actions', CdgCardActions)
customElements.define('cdg-table', CdgTable)
customElements.define('cdg-table-new', CdgTableNew, { extends: 'table' })
customElements.define('cdg-table-head', CdgTableHead)
customElements.define('cdg-table-body', CdgTableBody)
customElements.define('cdg-table-cell', CdgTableCell)
customElements.define('cdg-table-head-cell', CdgTableHeadCell)
customElements.define('cdg-table-row', CdgTableRow)
customElements.define('cdg-card-cover', CdgCardCover)
customElements.define('cdg-page-title', CdgPageTitle)
customElements.define('cdg-page-header', CdgPageHeader)
customElements.define('cdg-page-header-row', CdgPageHeaderRow)
customElements.define('cdg-page-actions', CdgPageActions)
customElements.define('cdg-sub-header', CdgSubHeader)
customElements.define('cdg-navbar', CdgNavbar)
customElements.define('cdg-portal-navbar', CdgPortalNavbar)
customElements.define('cdg-nav-rail', CdgNavRail)
customElements.define('cdg-wizards', CdgWizards)
customElements.define('cdg-wizard-step', CdgWizardStep)
customElements.define('cdg-dashboard-side-card', CdgDashboardSideCard)
customElements.define('cdg-card-activity', CdgCardActivity)
customElements.define('cdg-gallery', CdgGallery)
customElements.define('cdg-group-avatar', CdgGroupAvatar)
customElements.define('cdg-carousel', CdgCarousel)
customElements.define('cdg-carousel-scroller', CdgCarouselScroller)
customElements.define('cdg-slide', CdgSlide)
customElements.define('cdg-dots-indicator', CdgDotsIndicator)
customElements.define('cdg-modal', CdgModal)
customElements.define('cdg-modal-header', CdgModalHeader)
customElements.define('cdg-modal-body', CdgModalBody)
customElements.define('cdg-modal-actions', CdgModalActions)
customElements.define('cdg-dialog-alert', CdgDialogAlert)
customElements.define('cdg-dialog-confirm', CdgDialogConfirm)
customElements.define('cdg-dialog-confirm-custom', CdgDialogConfirmCustom)
customElements.define('cdg-dialog-warning', CdgDialogWarning)
customElements.define('cdg-dialog-actions', CdgDialogActions)
customElements.define('cdg-dialog-status', CdgDialogStatus)
customElements.define('cdg-timeline', CdgTimeline)
customElements.define('cdg-timeline-header', CdgTimelineHeader)
customElements.define('cdg-image-about', CdgImageAbout)
customElements.define('cdg-timeline-group', CdgTimelineGroup)
customElements.define('cdg-timeline-card', CdgTimelineCard)
customElements.define('cdg-timeline-card-time', CdgTimelineCardTime)
customElements.define('cdg-timeline-card-header', CdgTimelineCardHeader)
customElements.define('cdg-timeline-card-body', CdgTimelineCardBody)
customElements.define('cdg-sub-nav', CdgSubNav)
customElements.define('cdg-sub-nav-group', CdgSubNavGroup)
customElements.define('cdg-toast', CdgToast)
customElements.define('cdg-toast-top-actions', CdgToastTopActions)
customElements.define('cdg-toast-time', CdgToastTime)
customElements.define('cdg-toast-message', CdgToastMessage)
customElements.define('cdg-toast-header', CdgToastHeader)
customElements.define('cdg-toast-title', CdgToastTitle)
customElements.define('cdg-sidebar', CdgSidebar)
customElements.define('cdg-sidebar-header', CdgSidebarHeader)
customElements.define('cdg-sidebar-body', CdgSidebarBody)
customElements.define('cdg-sidebar-actions', CdgSidebarActions)
customElements.define('cdg-testimonial', CdgTestimonial)
customElements.define('cdg-testimonial-box', CdgTestimonialItem)
customElements.define('cdg-zoom-image-view', CdgZoomImageView)
customElements.define('cdg-image-viewer', CdgImageViewer)
customElements.define('cdg-group-image-viewer', CdgGroupImageViewer)
customElements.define('cdg-thumbnail-bar', CdgThumbnailBar)

export const LAYOUT_COMPONENTS = [
  CdgGroupAvatar,
  CdgActionBar,
  CdgCarousel,
  CdgCarouselScroller,
  CdgDotsIndicator,
  CdgSlide,
  CdgCard,
  CdgCardHeader,
  CdgCardBody,
  CdgCardActions,
  CdgTable,
  CdgTableBody,
  CdgTableHead,
  CdgTableRow,
  CdgTableHeadCell,
  CdgTableCell,
  CdgCardCover,
  CdgDashboardSideCard,
  CdgCardActivity,
  CdgPageTitle,
  CdgPageHeader,
  CdgPageActions,
  CdgPageHeaderRow,
  CdgSubHeader,
  CdgNavbar,
  CdgPortalNavbar,
  CdgNavRail,
  CdgWizards,
  CdgWizardStep,
  CdgModal,
  CdgModalHeader,
  CdgModalBody,
  CdgModalActions,
  CdgDialogAlert,
  CdgDialogActions,
  CdgDialogWarning,
  CdgDialogConfirm,
  CdgDialogConfirmCustom,
  CdgDialogStatus,
  CdgTimeline,
  CdgTimelineHeader,
  CdgImageAbout,
  CdgTimelineGroup,
  CdgTimelineCard,
  CdgTimelineCardTime,
  CdgTimelineCardHeader,
  CdgTimelineCardBody,
  CdgSubNav,
  CdgSubNavGroup,
  CdgToast,
  CdgToastTopActions,
  CdgToastTime,
  CdgToastMessage,
  CdgToastHeader,
  CdgToastTitle,
  CdgSidebar,
  CdgSidebarHeader,
  CdgSidebarBody,
  CdgSidebarActions,
  CdgTestimonial,
  CdgTestimonialItem,
  CdgZoomImageView,
  CdgImageViewer,
  CdgGroupImageViewer,
  CdgThumbnailBar,
  CdgGallery,
]
