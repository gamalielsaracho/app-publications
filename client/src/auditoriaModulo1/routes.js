import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarAuditoria1MovimientosAppContainer from './components/ListarApp'

import MostrarModulos from './components/MostrarModulos'

import FiltrosAppContainer from './components/FiltrosApp'


const auditoriaModulo1Routes = (
	<Route path='/dashboard/modulos-auditados' component={ListarAuditoria1MovimientosAppContainer}>
		<IndexRoute component={MostrarModulos}/>

		<Route path='/dashboard/modulos-auditados/:tableName' component={FiltrosAppContainer}/>

		<Route
			path='/dashboard/modulos-auditados/:idTableFather/auditoria/:tableName' 
			component={FiltrosAppContainer}/>

	</Route>
)

export default auditoriaModulo1Routes