// import usuarioRoutes from './personal/personal.routes.js'
// import rolRoutes from './rol/rol.routes.js'

import preConsultaParametroRoutes from './preConsultaParametro/preConsultaParametro.routes'
import tipoAnalisisParametroRoutes from './tipoAnalisisParametro/tipoAnalisisParametro.routes'
import referenciaRoutes from './referencia/referencia.routes'

import analisisSolicitadoTipoRoutes from './analisisSolicitadoTipo/analisisSolicitadoTipo.routes'
import analisisTipoRoutes from './analisisTipo/analisisTipo.routes'
import analisisTipoReferenciaRoutes from './analisisTipoReferencia/analisisTipoReferencia.routes'

// Vista previa.
import analisisRoutes from './analisis/analisis.routes'

import consultaSintomaRoutes from './consultaSintoma/consultaSintoma.routes'

import consultaDiagnosticoRoutes from './consultaDiagnostico/consultaDiagnostico.routes'

import medicamentoDrogaRoutes from './medicamentoDroga/medicamentoDroga.routes'


export default (app) => {
	// usuarioRoutes(app)
	// rolRoutes(app)
	preConsultaParametroRoutes(app)
	tipoAnalisisParametroRoutes(app)
	referenciaRoutes(app)
	analisisSolicitadoTipoRoutes(app)
	analisisTipoRoutes(app)
	analisisTipoReferenciaRoutes(app)

	// Vista previa.
	analisisRoutes(app)

	consultaSintomaRoutes(app)

	consultaDiagnosticoRoutes(app)

	medicamentoDrogaRoutes(app)
}