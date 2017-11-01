import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarFarmaceuticasAppContainer from './components/ListarApp'

import ListarFarmaceuticasPage from './pages/ListarFarmaceuticasPage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const farmaceuticaRoutes = (
	<Route path='/dashboard/farmaceuticas' component={ListarFarmaceuticasAppContainer}>
		<IndexRoute component={ListarFarmaceuticasPage}/>

		<Route path='/dashboard/farmaceuticas/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default farmaceuticaRoutes