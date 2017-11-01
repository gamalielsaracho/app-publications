import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarParametrosPreConsultaAppContainer from './components/ListarApp'

// PARAMETROS PRE-CONSULTA.
import ListarParametrosPreConsultaPage from './pages/ListarParametrosPreConsultaPage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const parametroPreConsultaRoutes = (
	<Route path='/dashboard/parametros-preconsulta' component={ListarParametrosPreConsultaAppContainer}>
		<IndexRoute component={ListarParametrosPreConsultaPage}/>

		<Route path='/dashboard/parametros-preconsulta/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default parametroPreConsultaRoutes