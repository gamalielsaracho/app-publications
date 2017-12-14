import React from 'react'
import { Route, IndexRoute } from 'react-router'


import ListarPersonalesApp from './components/ListarApp'

import ListarPersonalesContainer from './components/Listar'

import MostrarPersonalContainer from './components/Mostrar'


const personalRoutes = (
	<Route path='/dashboard/personales' component={ListarPersonalesApp}>
		<IndexRoute component={ListarPersonalesContainer}/>
		
			<Route path='/dashboard/personales/:idPersonal' 
				component={MostrarPersonalContainer}/>
		{/*
		*/}
			
	</Route>
)

export default personalRoutes