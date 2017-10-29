import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarDepartamentosAppContainer from '../departamento/components/ListarApp'
import ListarDepartamentosPage from '../departamento/pages/ListarDepartamentosPage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const departamentoRoutes = (
	<Route path='/dashboard/departamentos' component={ListarDepartamentosAppContainer}>
		<IndexRoute component={ListarDepartamentosPage}/>
		<Route path='/dashboard/departamentos/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default departamentoRoutes