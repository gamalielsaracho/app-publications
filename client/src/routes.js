import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './app/components/App'

// USUARIO.
import RegistrarPage from '././usuario/pages/RegistrarPage'
import AutenticarPage from '././usuario/pages/AutenticarPage'


export default (
	<Route path='/' component={AppContainer}>
		<Route path='/registrarse' component={RegistrarPage}/>
		<Route path='/entrar' component={AutenticarPage}/>
	</Route>)