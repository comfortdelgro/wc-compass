import { CdgGroupAvatar } from './group-avatar/group-avatar';
import { CdgActionBar } from './action-bar/action-bar';
import { CdgCarousel } from './carousel/carousel';
import { CdgCarouselScroller } from './carousel/carousel-scroller';
import { CdgDotsIndicator } from './carousel/dots-indicator';
import { CdgSlide } from './carousel/slide';
import { CdgCard } from './card/card';
import { CdgCardHeader } from './card/card-header';
import { CdgCardBody } from './card/card-body';
import { CdgCardActions } from './card/card-actions';
import { CdgTable } from './table/table';
import { CdgTableBody } from './table/table-body';
import { CdgTableHead } from './table/table-header';
import { CdgTableRow } from './table/table-row';
import { CdgTableHeaderCell } from './table/table-header-cell';
import { CdgTableCell } from './table/table-cell';
import { CdgSortingAsc, CdgSortingDesc } from './table/table-sorting-indicator';
import { CdgCardCover } from './card/card-cover';
import { CdgDashboardSideCard } from './dashboard-side-card/dashboard-side-card';
import { CdgCardActivity } from './dashboard-side-card/side-card-activity';
import { CdgPageTitle } from './page-header/page-title';
import { CdgPageHeader } from './page-header/page-header';
import { CdgPageActions } from './page-header/page-actions';
import { CdgPageHeaderRow } from './page-header/page-header-row';
import { CdgSubHeader } from './page-header/sub-header';
import { CdgNavbar } from './navbar/navbar';
import { CdgPortalNavbar } from './portal-navbar/portal-navbar';
import { CdgNavRail } from './nav-rail/nav-rail';
import { CdgWizards } from './wizards/wizards';
import { CdgWizardStep } from './wizards/wizard-step';
import { CdgModal } from './modal/modal';
import { CdgModalHeader } from './modal/modal-header';
import { CdgModalBody } from './modal/modal-body';
import { CdgModalActions } from './modal/modal-actions';
import { CdgDialogAlert } from './modal/dialog-alert';
import { CdgDialogConfirm } from './modal/dialog-confirm';
import { CdgDialogConfirmCustom } from './modal/dialog-confirm-custom';
import { CdgDialogWarning } from './modal/dialog-warning';
import { CdgDialogActions } from './modal/dialog-actions';
import { CdgTimeline } from './timeline/timeline';
import { CdgTimelineGroup } from './timeline/timeline-group';
import { CdgTimelineHeader } from './timeline/timeline-header';
import { CdgTimelineCard } from './timeline/timeline-card';
import { CdgTimelineCardTime } from './timeline/timeline-card-time';
import { CdgTimelineCardHeader } from './timeline/timeline-card-header';
import { CdgTimelineCardBody } from './timeline/timeline-card-body';
import { CdgSubNav } from './sub-nav/sub-nav';
import { CdgSubNavGroup } from './sub-nav/sub-nav-group';

// Layouts
customElements.define('cdg-action-bar', CdgActionBar);
customElements.define('cdg-card', CdgCard);
customElements.define('cdg-card-header', CdgCardHeader);
customElements.define('cdg-card-body', CdgCardBody);
customElements.define('cdg-card-actions', CdgCardActions);
customElements.define('cdg-table', CdgTable);
customElements.define('cdg-table-head', CdgTableHead);
customElements.define('cdg-table-body', CdgTableBody);
customElements.define('cdg-table-cell', CdgTableCell);
customElements.define('cdg-table-header-cell', CdgTableHeaderCell);
customElements.define('cdg-table-row', CdgTableRow);
customElements.define('cdg-sorting-asc', CdgSortingAsc);
customElements.define('cdg-sorting-desc', CdgSortingDesc);
customElements.define('cdg-card-cover', CdgCardCover);
customElements.define('cdg-page-title', CdgPageTitle);
customElements.define('cdg-page-header', CdgPageHeader);
customElements.define('cdg-page-header-row', CdgPageHeaderRow);
customElements.define('cdg-page-actions', CdgPageActions);
customElements.define('cdg-sub-header', CdgSubHeader);
customElements.define('cdg-navbar', CdgNavbar);
customElements.define('cdg-portal-navbar', CdgPortalNavbar);
customElements.define('cdg-nav-rail', CdgNavRail);
customElements.define('cdg-wizards', CdgWizards);
customElements.define('cdg-wizard-step', CdgWizardStep);
customElements.define('cdg-dashboard-side-card', CdgDashboardSideCard);
customElements.define('cdg-card-activity', CdgCardActivity);
customElements.define('cdg-group-avatar', CdgGroupAvatar);
customElements.define('cdg-carousel', CdgCarousel);
customElements.define('cdg-carousel-scroller', CdgCarouselScroller);
customElements.define('cdg-slide', CdgSlide);
customElements.define('cdg-dots-indicator', CdgDotsIndicator);
customElements.define('cdg-modal', CdgModal);
customElements.define('cdg-modal-header', CdgModalHeader);
customElements.define('cdg-modal-body', CdgModalBody);
customElements.define('cdg-modal-actions', CdgModalActions);
customElements.define('cdg-dialog-alert', CdgDialogAlert);
customElements.define('cdg-dialog-confirm', CdgDialogConfirm);
customElements.define('cdg-dialog-confirm-custom', CdgDialogConfirmCustom);
customElements.define('cdg-dialog-warning', CdgDialogWarning);
customElements.define('cdg-dialog-actions', CdgDialogActions);
customElements.define('cdg-timeline', CdgTimeline);
customElements.define('cdg-timeline-header', CdgTimelineHeader);
customElements.define('cdg-timeline-group', CdgTimelineGroup);
customElements.define('cdg-timeline-card', CdgTimelineCard);
customElements.define('cdg-timeline-card-time', CdgTimelineCardTime);
customElements.define('cdg-timeline-card-header', CdgTimelineCardHeader);
customElements.define('cdg-timeline-card-body', CdgTimelineCardBody);
customElements.define('cdg-sub-nav', CdgSubNav);
customElements.define('cdg-sub-nav-group', CdgSubNavGroup);

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
  CdgTableHeaderCell,
  CdgTableCell,
  CdgSortingAsc,
  CdgSortingDesc,
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
  CdgTimeline,
  CdgTimelineHeader,
  CdgTimelineGroup,
  CdgTimelineCard,
  CdgTimelineCardTime,
  CdgTimelineCardHeader,
  CdgTimelineCardBody,
  CdgSubNav,
  CdgSubNavGroup,
];
