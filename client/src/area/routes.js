import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarAreasAppContainer from './components/ListarApp'

// AREAS.
import ListarAreasPage from './pages/ListarAreasPage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const areaRoutes = (
	<Route path='/dashboard/areas' component={ListarAreasAppContainer}>
		<IndexRoute component={ListarAreasPage}/>

		<Route path='/dashboard/areas/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default areaRoutes