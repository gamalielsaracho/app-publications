import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NIVELES.
import ListarNivelesPage from './pages/ListarNivelesPage'

const tratamientoRoutes = (
	<Route path='/dashboard/niveles' component={ListarNivelesPage}/>
)

export default tratamientoRoutes