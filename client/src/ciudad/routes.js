import React from 'react'
import { Route, IndexRoute } from 'react-router'

// CIUDADES.
import ListarCiudadesPage from './pages/ListarCiudadesPage'

const ciudadRoutes = (
	<Route path='/dashboard/ciudades' component={ListarCiudadesPage}/>
)

export default ciudadRoutes