import React from 'react'
import { Route, IndexRoute } from 'react-router'

// AREAS.
import ListarAreasPage from './pages/ListarAreasPage'

const areaRoutes = (
	<Route path='/dashboard/areas' component={ListarAreasPage}/>		
)

export default areaRoutes