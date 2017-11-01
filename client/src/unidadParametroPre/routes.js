import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarUnidadesParametroPreAppContainer from './components/ListarApp'

// UNIDADES DE MEDIDA PRE-CONSULTA.
import ListarUnidadesParametroPrePage from './pages/ListarUnidadesParametroPrePage'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'


const unidadParametroPreRoutes = (
	<Route path='/dashboard/unidades-parametro-preconsulta' component={ListarUnidadesParametroPreAppContainer}>
		<IndexRoute component={ListarUnidadesParametroPrePage}/>

		<Route path='/dashboard/unidades-parametro-preconsulta/auditoria/:tableName' component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default unidadParametroPreRoutes