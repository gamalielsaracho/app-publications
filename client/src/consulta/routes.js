import React from 'react'
import { Route, IndexRoute } from 'react-router'

// CONSULTAS APP.
import ListarConsultasAppContainer from './components/ListarApp'

// FILTROS APP.
import FiltrosConsultasAppContainer from './components/FiltrosApp'


// CONSULTA APP.
import MostrarConsultaAppContainer from './components/MostrarApp'

import ListarSintomasConsultaContainer from '../consultaSintoma/components/Listar'

import ListarConsultaDiagnosticosContainer from '../consultaDiagnostico/components/Listar'

import MostrarTratamientoContainer from '../tratamiento/components/Mostrar'


// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '../analisisSolicitado/components/MostrarApp'

import MostrarVistaPreviaContainer from '../analisis/components/MostrarVistaPrevia'


import FiltrosAppReporteListaConsultasContainer from './components/FiltrosAppReporteListaConsultas'


{/* Módulo de consultas. */}
const consultaRoutes = (
	<Route path='/dashboard/consultas' component={ListarConsultasAppContainer}>
		<IndexRoute component={FiltrosConsultasAppContainer}/>
		
				
		<Route path='/dashboard/consultas/lista-consultas-vista-general-reportes' component={FiltrosAppReporteListaConsultasContainer}/>
					
		<Route path='/dashboard/consultas/:idConsulta' component={MostrarConsultaAppContainer}>
			<Route path='/dashboard/consultas/:idConsulta/sintomas' component={ListarSintomasConsultaContainer}/>
			<Route path='/dashboard/consultas/:idConsulta/diagnosticos' component={ListarConsultaDiagnosticosContainer}/>

			<Route path='/dashboard/consultas/:idConsulta/tratamiento/:idTratamiento' component={MostrarTratamientoContainer}/>


			<Route path='/dashboard/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
				<Route path='/dashboard/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
			</Route>

		</Route>
			
	</Route>
)

export default consultaRoutes