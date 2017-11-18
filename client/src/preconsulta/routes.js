import React from 'react'
import { Route, IndexRoute } from 'react-router'

import FiltrosPreConsultasAppContainer from './components/FiltrosApp'

import ListarPreConsultasAppContainer from './components/ListarApp'

const preConsultaRoutes = (
	<Route path='/dashboard/pre-consultas' component={ListarPreConsultasAppContainer}>
		<IndexRoute component={FiltrosPreConsultasAppContainer}/>
		
		{/* <Route path='/dashboard/pre-consultas/:idPreConsulta' component={}/> */}

	</Route>
)

export default preConsultaRoutes