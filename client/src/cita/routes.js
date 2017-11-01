import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Listar.
// import  from './././components/ListarApp'
import ListarCitasAppContainer from '././components/ListarApp'

import ListarCitasPage from '././pages/ListarCitasPage'

import MostrarCitaAppContainer from '././components/MostrarApp'

// PRE-CONSULTA APP.
import MostrarPreConsultaAppContainer from '../preconsulta/components/MostrarApp'

// ... Para cuando el médico realize la consulta.
import MostrarConsultaRellenandoAppContainer from '../consulta/components/MostrarRellenandoApp'

// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '../analisisSolicitado/components/MostrarApp'

// CONSULTA X SINTOMAS.
import ListarSintomasConsultaContainer from '../consultaSintoma/components/Listar'

// CONSULTA X DIAGNÓSTICOS.
import ListarConsultaDiagnosticosContainer from '../consultaDiagnostico/components/Listar'

				
const citaRoutes = (
	<Route path='/dashboard/citas' component={ListarCitasAppContainer}>
		<IndexRoute component={ListarCitasPage}/>
		<Route path='/dashboard/citas/:idCita' component={MostrarCitaAppContainer}>
			<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta' component={MostrarPreConsultaAppContainer}>

				


				<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta/consulta/:idConsulta' component={MostrarConsultaRellenandoAppContainer}>
					<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta/consulta/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
							
					</Route>

					<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta/consulta/:idConsulta/sintomas' component={ListarSintomasConsultaContainer}/>
					<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta/consulta/:idConsulta/diagnosticos' component={ListarConsultaDiagnosticosContainer}/>

				</Route>
			</Route>
		</Route>
	</Route>
)

export default citaRoutes