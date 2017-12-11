import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Listar APP.
import ListarMedicamentosEntregadosAppContainer from './././components/ListarApp'

// FILTROS MEDICAMENTOS ENTREGADOS
import FiltrosMedicamentosEntregadosAppContainer from './components/FiltrosApp'


// Mostrar App.
import MostrarMedicamentoEntregadoAppContainer from './././components/MostrarApp'


// MEDICAMENTOS X MEDICAMENTOS-ENTREGADOS.
import ListarMedicamentosAgregadosContainer from '../medicamentoXentregado/components/Listar'

import ReporteImpresionByIdContainer from './components/ReporteImpresionById'


const medicamentoEntregadoRoutes = (
	<Route path='/dashboard/medicamentos-entregados' component={ListarMedicamentosEntregadosAppContainer}>
		<IndexRoute component={FiltrosMedicamentosEntregadosAppContainer}/>
		
		

		<Route path='/dashboard/medicamentos-entregados/:idMedicamentoEntregado' component={MostrarMedicamentoEntregadoAppContainer}>
			<Route path='/dashboard/medicamentos-entregados/:idMedicamentoEntregado/vista-general-comprobante' 
				component={ReporteImpresionByIdContainer}/>

			<Route path='/dashboard/medicamentos-entregados/:idMedicamentoEntregado/medicamentos' component={ListarMedicamentosAgregadosContainer}/>
		</Route>
	</Route>
)

export default medicamentoEntregadoRoutes