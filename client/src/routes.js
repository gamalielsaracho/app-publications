import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppContainer from './app/components/App'

// USUARIO.
import RegistrarPage from '././usuario/pages/RegistrarPage'
import AutenticarPage from '././usuario/pages/AutenticarPage'
import ListarPage from '././usuario/pages/ListarPage'


export default (
	<Route path='/' component={AppContainer}>
		<Route path='/registrarse' component={RegistrarPage}/>
		<Route path='/usuarios' component={ListarPage}/>
		<Route path='/entrar' component={AutenticarPage}/>
	</Route>)