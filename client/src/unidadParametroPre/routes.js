import React from 'react'
import { Route, IndexRoute } from 'react-router'

// UNIDADES DE MEDIDA PRE-CONSULTA.
import ListarUnidadesParametroPrePage from './pages/ListarUnidadesParametroPrePage'

const unidadParametroPreRoutes = (
	<Route path='/dashboard/unidades-parametro-preconsulta' component={ListarUnidadesParametroPrePage}/>
)

export default unidadParametroPreRoutes