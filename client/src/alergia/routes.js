import React from 'react'
import { Route, IndexRoute } from 'react-router'

// ALERGIAS.
import ListarAlergiasPage from './pages/ListarAlergiasPage'

const alergiaRoutes = (
	<Route path='/dashboard/alergias' component={ListarAlergiasPage}/>
)

export default alergiaRoutes