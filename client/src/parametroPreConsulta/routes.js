import React from 'react'
import { Route, IndexRoute } from 'react-router'

// PARAMETROS PRE-CONSULTA.
import ListarParametrosPreConsultaPage from './pages/ListarParametrosPreConsultaPage'

const parametroPreConsultaRoutes = (
	<Route path='/dashboard/parametros-preconsulta' component={ListarParametrosPreConsultaPage}/>
)

export default parametroPreConsultaRoutes