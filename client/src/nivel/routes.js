import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NIVELES.
import ListarNivelesPage from './pages/ListarNivelesPage'

const nivelRoutes = (
	<Route path='/dashboard/niveles' component={ListarNivelesPage}/>
)

export default nivelRoutes