import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ListarDepartamentosPage from './pages/ListarDepartamentosPage'

const departamentoRoutes = (
	<Route path='/dashboard/departamentos' component={ListarDepartamentosPage}/>
)

export default departamentoRoutes