import React from 'react'
import { Route, IndexRoute } from 'react-router'


// Listar.
import ListarPacientesApp from '../../paciente/components/ListarApp'

// PACIENTES
import ListarPacientesPage from '../../paciente/pages/ListarPacientesPage'

import MostrarPacienteAppContainer from '../../paciente/components/MostrarApp'

// PACIENTE ALERGIAS.
	import ListarPacienteAlergiasPage from '../../pacienteAlergia/pages/ListarPacienteAlergiasPage'

// CONSULTAS APP.
import ListarConsultasAppContainer from '../../consulta/components/ListarApp'

import ListarConsultasContainer from '../../consulta/components/Listar'

// CONSULTA APP.
import MostrarConsultaAppContainer from '../../consulta/components/MostrarApp'

import ListarSintomasConsultaContainer from '../../consultaSintoma/components/Listar'

// LISTAR ANÁLISIS SOLICITADOS APP.
import ListarAppAnalisisSolicitadosContainer from '../../analisisSolicitado/components/ListarApp'
import ListarAnalisisSolicitadosContainer from '../../analisisSolicitado/components/Listar'

// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '../../analisisSolicitado/components/MostrarApp'

import MostrarVistaPreviaContainer from '../../analisis/components/MostrarVistaPrevia'

import ListarConsultaDiagnosticosContainer from '../../consultaDiagnostico/components/Listar'


{/* Historial clínico. */}
const pacienteRoutes = (
	<Route path='/dashboard/pacientes' component={ListarPacientesApp}>
		<IndexRoute component={ListarPacientesPage}/>
				
		<Route path='/dashboard/pacientes/:idPaciente' component={MostrarPacienteAppContainer}>
			<Route path='/dashboard/pacientes/:idPaciente/alergias' component={ListarPacienteAlergiasPage}/>
					
			<Route path='/dashboard/pacientes/:idPaciente/consultas' component={ListarConsultasAppContainer}>
				<IndexRoute component={ListarConsultasContainer}/>

				<Route path='/dashboard/pacientes/:idPaciente/consultas/:idConsulta' component={MostrarConsultaAppContainer}>
					<Route path='/dashboard/pacientes/:idPaciente/consultas/:idConsulta/sintomas' component={ListarSintomasConsultaContainer}/>
					<Route path='/dashboard/pacientes/:idPaciente/consultas/:idConsulta/diagnosticos' component={ListarConsultaDiagnosticosContainer}/>


					<Route path='/dashboard/pacientes/:idPaciente/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
						<Route path='/dashboard/pacientes/:idPaciente/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
					</Route>

				</Route>
			</Route>

			<Route path='/dashboard/pacientes/:idPaciente/solicitudes-laboratorio' component={ListarAppAnalisisSolicitadosContainer}>
				<IndexRoute component={ListarAnalisisSolicitadosContainer}/>
						
				<Route path='/dashboard/pacientes/:idPaciente/solicitudes-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
					<Route path='/dashboard/pacientes/:idPaciente/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
				</Route>
			</Route>

		</Route>
	</Route>
)

export default pacienteRoutes