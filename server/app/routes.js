// import usuarioRoutes from './personal/personal.routes.js'
// import rolRoutes from './rol/rol.routes.js'

import preConsultaParametroRoutes from './preConsultaParametro/preConsultaParametro.routes'
import tipoAnalisisParametroRoutes from './tipoAnalisisParametro/tipoAnalisisParametro.routes'
import referenciaRoutes from './referencia/referencia.routes'

export default (app) => {
	// usuarioRoutes(app)
	// rolRoutes(app)
	preConsultaParametroRoutes(app)
	tipoAnalisisParametroRoutes(app)
	referenciaRoutes(app)
}