import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarFarmaceuticasPage from './pages/ListarFarmaceuticasPage'

const farmaceuticaRoutes = (
	<Route path='/dashboard/farmaceuticas' component={ListarFarmaceuticasPage}/>
)

export default farmaceuticaRoutes

