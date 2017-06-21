import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './app/components/App'

import DashBoardContainer from './dashboard/components/DashBoard'

// USUARIO.
import RegistrarPage from '././usuario/pages/RegistrarPage'
import AutenticarPage from '././usuario/pages/AutenticarPage'
import ListarPage from '././usuario/pages/ListarPage'


export default (
	<Route path='/' component={AppContainer}>
		<Route path='/registrarse' component={RegistrarPage}/>
		<Route path='/usuarios' component={ListarPage}/>
		<Route path='/entrar' component={AutenticarPage}/>

		<Route path='/dashboard' component={DashBoardContainer}>
			<Route path='/registrarse' component={RegistrarPage}/>
		</Route>
	</Route>)