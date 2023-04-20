import {CdgLoadingGlobal} from './global/loading-global'
import {CdgLoadingServiceDemo} from './loading-service'
import {CdgLoadingLocal} from './local/loading-local'

customElements.define('cdg-loading-service-demo', CdgLoadingServiceDemo)
customElements.define('cdg-loading-local', CdgLoadingLocal)
customElements.define('cdg-loading-global', CdgLoadingGlobal)

export {CdgLoadingServiceDemo, CdgLoadingLocal, CdgLoadingGlobal}
