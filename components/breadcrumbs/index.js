import {CdgBreadcrumbsDemo} from './breadcrumbs'
import {CdgDefaultBreadcrumbsSection} from './default/default-breadcrumbs.section'
import {CdgHomeBreadcrumbsSection} from './home/home-breadcrumbs.section'
import {CdgMoreBreadcrumbsSection} from './more/more-breadcrumbs.section'

customElements.define('cdg-breadcrumbs-demo', CdgBreadcrumbsDemo)
customElements.define(
  'cdg-default-breadcrumbs-section',
  CdgDefaultBreadcrumbsSection,
)
customElements.define('cdg-more-breadcrumbs-section', CdgMoreBreadcrumbsSection)
customElements.define('cdg-home-breadcrumbs-section', CdgHomeBreadcrumbsSection)

export {
  CdgBreadcrumbsDemo,
  CdgDefaultBreadcrumbsSection,
  CdgMoreBreadcrumbsSection,
  CdgHomeBreadcrumbsSection,
}
