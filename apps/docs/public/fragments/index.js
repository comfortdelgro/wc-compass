import {CdgDemoContainer} from './container/container'
import {CdgSearchContentDemo} from './search-content/search-content'
import {CdgDemoSidebar} from './sidebar/sidebar'

customElements.define('cdg-demo-container', CdgDemoContainer)
customElements.define('cdg-demo-sidebar', CdgDemoSidebar)
customElements.define('cdg-demo-search-content', CdgSearchContentDemo)

export {CdgDemoContainer, CdgDemoSidebar, CdgSearchContentDemo}
