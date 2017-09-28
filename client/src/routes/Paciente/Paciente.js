import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

// PACIENTES
		// Listar.
import ListarPacienteApp from '../../paciente/components/ListarApp'

import ListarPacientesPage from '../../paciente/pages/ListarPacientesPage'

import MostrarPacienteAppContainer from '../../paciente/components/MostrarApp'
	
	// PACIENTE ALERGIAS.
	import ListarPacienteAlergiasPage from '../../pacienteAlergia/pages/ListarPacienteAlergiasPage'

// ANÁLISIS SOLICITADOS.
import ListarAppAnalisisSolicitadosContainer from '../../analisisSolicitado/components/ListarApp'

// para obtener la lista de consultas realizadas.
// import ListarConsultasApp from '././consulta/components/ListarApp'

class Paciente extends Component {
	render() {
		return (<Route path='/dashboard/pacientes' component={ListarPacienteApp}>
				<IndexRoute component={ListarPacientesPage}/>
				
				<Route path='/dashboard/pacientes/:idPaciente' component={MostrarPacienteAppContainer}>
					<Route path='/dashboard/pacientes/:idPaciente/alergias' component={ListarPacienteAlergiasPage}/>
				</Route>
		</Route>)
	}
}

export default Paciente