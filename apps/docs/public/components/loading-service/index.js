import './loading-service.html'

import {CdgLoadingGlobal} from './global/loading-global'
import {CdgLoadingLocal} from './local/loading-local'

customElements.define('cdg-loading-local', CdgLoadingLocal)
customElements.define('cdg-loading-global', CdgLoadingGlobal)

export {CdgLoadingLocal, CdgLoadingGlobal}
