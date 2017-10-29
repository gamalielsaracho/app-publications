import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarCiudadesAppContainer from '../ciudad/components/ListarApp'

// CIUDADES.
import ListarCiudadesPage from '../ciudad/pages/ListarCiudadesPage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const ciudadRoutes = (
	<Route path='/dashboard/ciudades' component={ListarCiudadesAppContainer}>
		<IndexRoute component={ListarCiudadesPage}/>

		<Route path='/dashboard/ciudades/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default ciudadRoutes