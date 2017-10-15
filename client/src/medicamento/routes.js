import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Listar.
import ListarMedicamentosAppContainer from './././../medicamento/components/ListarApp'
import ListarMedicamentosPage from './././../medicamento/pages/ListarMedicamentosPage'

// MOSTRAR MEDICAMENTO APP.
import MostrarMedicamentoAppContainer from './././../medicamento/components/MostrarApp'

// MEDICAMENTO X DROGA
import ListarMedicamentoDrogasContainer from './././../medicamentoDroga/components/Listar'


{/* Historial clínico. */}
const medicamentoRoutes = (
	<Route path='/dashboard/medicamentos' component={ListarMedicamentosAppContainer}>
		<IndexRoute component={ListarMedicamentosPage}/>

		<Route path='/dashboard/medicamentos/:idMedicamento' component={MostrarMedicamentoAppContainer}>
			<Route path='/dashboard/medicamentos/:idMedicamento/drogas' component={ListarMedicamentoDrogasContainer}/>
		</Route>

	</Route>
)

export default medicamentoRoutes