import React from 'react'
import { Route, IndexRoute } from 'react-router'


import FiltrosPreConsultasAppContainer from './components/FiltrosApp'

import ListarPreConsultasAppContainer from './components/ListarApp'

// PRE-CONSULTA APP.
import MostrarPreConsultaAppContainer from './components/MostrarApp'


// CONSULTAS APP.
import ListarConsultasAppContainer from '../consulta/components/ListarApp'

// FILTROS CONSULTAS APP.
import FiltrosConsultasAppContainer from '../consulta/components/FiltrosApp'


// CONSULTA APP.
import MostrarConsultaAppContainer from '../consulta/components/MostrarApp'

// SINTOMAS. 
import ListarSintomasConsultaContainer from '../consultaSintoma/components/Listar'

// DIAGNÓSTICOS.
import ListarConsultaDiagnosticosContainer from '../consultaDiagnostico/components/Listar'

// TRATAMIENTO.
import MostrarTratamientoContainer from '../tratamiento/components/Mostrar'


// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '../analisisSolicitado/components/MostrarApp'

// VISTA GENERAL.
import MostrarVistaPreviaContainer from '../analisis/components/MostrarVistaPrevia'


const preConsultaRoutes = (
	<Route path='/dashboard/pre-consultas' component={ListarPreConsultasAppContainer}>
		<IndexRoute component={FiltrosPreConsultasAppContainer}/>
		

		<Route path='/dashboard/pre-consultas/:idPreConsulta' component={MostrarPreConsultaAppContainer}>
			{/*  
				<IndexRoute component={}/>
			*/}
			
			
			<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas' component={ListarConsultasAppContainer}>
				<IndexRoute component={FiltrosConsultasAppContainer}/>
				
				<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas/:idConsulta' component={MostrarConsultaAppContainer}>
					<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas/:idConsulta/sintomas' component={ListarSintomasConsultaContainer}/>
					<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas/:idConsulta/diagnosticos' component={ListarConsultaDiagnosticosContainer}/>


					<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas/:idConsulta/tratamiento/:idTratamiento' component={MostrarTratamientoContainer}/>


					<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
						<Route path='/dashboard/pre-consultas/:idPreConsulta/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
					</Route>
				</Route>			
			</Route>



		</Route>

		{/* <Route path='/dashboard/pre-consultas/:idPreConsulta' component={}/> */}

	</Route>
)

export default preConsultaRoutes