import React from 'react'
import { Route, IndexRoute } from 'react-router'

import FiltrosPreConsultasAppContainer from './components/FiltrosApp'

import ListarPreConsultasAppContainer from './components/ListarApp'

// PRE-CONSULTA APP.
import MostrarPreConsultaAppContainer from './components/MostrarApp'

// CONSULTAS APP.
import ListarConsultasAppContainer from '../consulta/components/ListarApp'

import ListarConsultasContainer from '../consulta/components/Listar'


const preConsultaRoutes = (
	<Route path='/dashboard/pre-consultas' component={ListarPreConsultasAppContainer}>
		<IndexRoute component={FiltrosPreConsultasAppContainer}/>
		
		<Route path='/dashboard/consultas' component={ListarConsultasAppContainer}>
			<IndexRoute component={ListarConsultasContainer}/>
		</Route>

		<Route path='/dashboard/pre-consultas/:idPreConsulta' component={MostrarPreConsultaAppContainer}>
			{/*  
				<IndexRoute component={}/>
			*/}
			<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas' component={ListarConsultasContainer}>
			</Route>			

		</Route>

		{/* <Route path='/dashboard/pre-consultas/:idPreConsulta' component={}/> */}

	</Route>
)

export default preConsultaRoutes