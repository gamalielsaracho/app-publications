import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Listar.
import ListarMedicamentosEntregadosAppContainer from './././components/ListarApp'
import ListarMedicamentosEntregadosPage from './././pages/ListarMedicamentosEntregadosPage'

// Mostrar App.
import MostrarMedicamentoEntregadoAppContainer from './././components/MostrarApp'

// MEDICAMENTOS X MEDICAMENTOS-ENTREGADOS.
import ListarMedicamentosAgregadosContainer from '../medicamentoXentregado/components/Listar'


const medicamentoEntregadoRoutes = (
	<Route path='/dashboard/medicamentos-entregados' component={ListarMedicamentosEntregadosAppContainer}>
		<IndexRoute component={ListarMedicamentosEntregadosPage}/>
		
		<Route path='/dashboard/medicamentos-entregados/:idMedicamentoEntregado' component={MostrarMedicamentoEntregadoAppContainer}>
			<Route path='/dashboard/medicamentos-entregados/:idMedicamentoEntregado/medicamentos' component={ListarMedicamentosAgregadosContainer}/>
		</Route>
	</Route>
)

export default medicamentoEntregadoRoutes