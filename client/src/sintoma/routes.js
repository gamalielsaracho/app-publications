import React from 'react'
import { Route, IndexRoute } from 'react-router'

// SINTOMAS.
import ListarSintomasPage from './pages/ListarSintomasPage'

const sintomaRoutes = (
	<Route path='/dashboard/sintomas' component={ListarSintomasPage}/>
)

export default sintomaRoutes