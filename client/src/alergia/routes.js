import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarAlergiasAppContainer from './components/ListarApp'

// ALERGIAS.
import ListarAlergiasPage from './pages/ListarAlergiasPage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const alergiaRoutes = (
	<Route path='/dashboard/alergias' component={ListarAlergiasAppContainer}>
		<IndexRoute component={ListarAlergiasPage}/>

		<Route path='/dashboard/alergias/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default alergiaRoutes