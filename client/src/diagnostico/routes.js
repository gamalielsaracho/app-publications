import React from 'react'
import { Route, IndexRoute } from 'react-router'

// DIAGNOSTICOS.
import ListarDiagnosticosPage from './pages/ListarDiagnosticosPage'

const diagnosticoRoutes = (
	<Route path='/dashboard/diagnosticos' component={ListarDiagnosticosPage}/>
)

export default diagnosticoRoutes