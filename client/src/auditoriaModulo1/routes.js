import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarAuditoria1MovimientosAppContainer from './components/ListarApp'

import MostrarModulos from './components/MostrarModulos'

import ListarAuditoria1MovimientosContainer from '../auditoriaModulo1/components/Listar'

const auditoriaModulo1Routes = (
	<Route path='/dashboard/modulos-auditados' component={ListarAuditoria1MovimientosAppContainer}>
		<IndexRoute component={MostrarModulos}/>

		<Route path='/dashboard/modulos-auditados/:tableName' component={ListarAuditoria1MovimientosContainer}/>

		<Route
			path='/dashboard/modulos-auditados/:idTableFather/auditoria/:tableName' 
			component={ListarAuditoria1MovimientosContainer}/>

	</Route>
)

export default auditoriaModulo1Routes