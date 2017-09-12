// import usuarioRoutes from './personal/personal.routes.js'
// import rolRoutes from './rol/rol.routes.js'

import preConsultaParametroRoutes from './preConsultaParametro/preConsultaParametro.routes'

export default (app) => {
	// usuarioRoutes(app)
	// rolRoutes(app)
	preConsultaParametroRoutes(app)
}