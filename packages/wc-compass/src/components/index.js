import { CdgAccordion } from './accordion/accordion';
import { CdgAccordionHeader } from './accordion/accordion-header';
import { CdgAccordionContent } from './accordion/accordion-content';
import { CdgAlert } from './alert/alert';
import { CdgAlertBadge } from './alert-badge/alert-badge';
import { CdgAlertContent } from './alert/alert-content';
import { CdgAvatar } from './avatar/avatar';
import { CdgIcon } from './icon/icon';
import { CdgInlineLoading } from './inline-loading/inline-loading';
import { CdgFile } from './file/file';
import { CdgFileUpload } from './file/file-upload';
import { CdgLoading } from './loading/loading';
import { CdgPagination } from './pagination/pagination';
import { CdgLinkPagination } from './pagination/link-pagination';
import { CdgPillBadge } from './pill-badge/pill-badge';
import { CdgStatus } from './status/status';
import { CdgTab } from './tab/tab';
import { CdgTabs } from './tab/tabs';
import { CdgDropdown } from './dropdown/dropdown';
import { CdgDropdownSelect } from './dropdown/dropdown-select';
import { CdgDropdownOption } from './dropdown/dropdown-option';
import { CdgFloatingContent } from './floating-content/floating-content';
import { CdgPopover } from './popover/popover';
import { CdgPopoverContent } from './popover/popover-content';
import { CdgProgress } from './progress/progress';
import { CdgCalendar } from './calendar/calendar';
import { CdgDatePicker } from './datepicker/datepicker';
import { CdgListview } from './list-view/list-view';
import { CdgListItem } from './list-view/list-item';
import { CdgTooltip } from './tooltip/tooltip';
import { CdgRangeSlider } from './range-slider/range-slider';
import { CdgQuantityToggle } from './quantity-toggle/quantity-toggle';
import { CdgTagBoxContainer } from './tag-box/tag-box';
import { CdgTagBoxItem } from './tag-box/tag-box-item';
import { CdgVideoPlayer } from './video/video';
import { CdgVideoControls } from './video/video-controls';
import { CdgVolume } from './volume/volume';
import { CdgRating } from './rating/rating';

customElements.define('cdg-accordion', CdgAccordion);
customElements.define('cdg-accordion-header', CdgAccordionHeader);
customElements.define('cdg-accordion-content', CdgAccordionContent);
customElements.define('cdg-alert', CdgAlert);
customElements.define('cdg-alert-badge', CdgAlertBadge);
customElements.define('cdg-alert-content', CdgAlertContent);
customElements.define('cdg-avatar', CdgAvatar);
customElements.define('cdg-icon', CdgIcon);
customElements.define('cdg-inline-loading', CdgInlineLoading);
customElements.define('cdg-file', CdgFile);
customElements.define('cdg-file-upload', CdgFileUpload);
customElements.define('cdg-loading', CdgLoading);
customElements.define('cdg-pagination', CdgPagination);
customElements.define('cdg-link-pagination', CdgLinkPagination);
customElements.define('cdg-pill-badge', CdgPillBadge);
customElements.define('cdg-status', CdgStatus);
customElements.define('cdg-tab', CdgTab);
customElements.define('cdg-tabs', CdgTabs);
customElements.define('cdg-dropdown', CdgDropdown);
customElements.define('cdg-dropdown-select', CdgDropdownSelect);
customElements.define('cdg-floating-content', CdgFloatingContent);
customElements.define('cdg-dropdown-option', CdgDropdownOption);
customElements.define('cdg-popover', CdgPopover);
customElements.define('cdg-popover-content', CdgPopoverContent);
customElements.define('cdg-progress', CdgProgress);
customElements.define('cdg-calendar', CdgCalendar);
customElements.define('cdg-datepicker', CdgDatePicker);
customElements.define('cdg-list-view', CdgListview);
customElements.define('cdg-list-item', CdgListItem);
customElements.define('cdg-tooltip', CdgTooltip);
customElements.define('cdg-range-slider', CdgRangeSlider);
customElements.define('cdg-quantity-toggle', CdgQuantityToggle);
customElements.define('cdg-tag-box-container', CdgTagBoxContainer);
customElements.define('cdg-tag-box-item', CdgTagBoxItem);
customElements.define('cdg-video-player', CdgVideoPlayer);
customElements.define('cdg-video-controls', CdgVideoControls);
customElements.define('cdg-volume', CdgVolume);
customElements.define('cdg-rating', CdgRating);

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
  CdgVideoPlayer,
  CdgVideoControls,
  CdgVolume,
  CdgRating,
];
