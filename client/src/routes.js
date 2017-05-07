import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app/components/App'

// USUARIO.
import RegistrarPage from '././usuario/pages/RegistrarPage'

export default (
	<Route path='/' component={App}>
		<Route path='/registrarse' component={RegistrarPage}/>
	</Route>)