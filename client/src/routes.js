import React from 'react'
import { Route, IndexRoute } from 'react-router'

// App Principal de la aplicación.
import AppContainer from './app/components/App'

import HomePage from './app/pages/HomePage'

// DashBoard App.
import DashBoardContainer from './dashboard/components/DashBoard'

// USUARIO.
import RegistrarPage from '././usuario/pages/RegistrarPage'
import AutenticarPage from '././usuario/pages/AutenticarPage'
import ListarPage from '././usuario/pages/ListarPage'

// ROL.
import ListarRolesPage from '././rol/pages/ListarRolesPage'

// ESPECIALIDAD.
import ListarEspecialidadesPage from '././especialidades/pages/ListarEspecialidadesPage'

// CIUDADES.
import ListarCiudadesPage from '././ciudad/pages/ListarCiudadesPage'

// DEPARTAMENTOS.
import ListarDepartamentosPage from '././departamento/pages/ListarDepartamentosPage'

// AREAS.
import ListarAreasPage from '././area/pages/ListarAreasPage'

// ALERGIAS.
import ListarAlergiasPage from '././alergia/pages/ListarAlergiasPage'

// PACIENTES
		// Listar.
import ListarPacienteApp from '././paciente/components/ListarApp'

import ListarPacientesPage from '././paciente/pages/ListarPacientesPage'

import MostrarPacienteAppContainer from '././paciente/components/MostrarApp'
	
	// PACIENTE ALERGIAS.
	import ListarPacienteAlergiasPage from '././pacienteAlergia/pages/ListarPacienteAlergiasPage'


export default (
	<Route path='/' component={AppContainer}>
		<IndexRoute component={HomePage}/>
		<Route path='/registrarse' component={RegistrarPage}/>
		<Route path='/entrar' component={AutenticarPage}/>

		<Route path='/dashboard' component={DashBoardContainer}>
			<Route path='/usuarios' component={ListarPage}/>
			<Route path='/roles' component={ListarRolesPage}/>
			<Route path='/especialidades' component={ListarEspecialidadesPage}/>
			<Route path='/ciudades' component={ListarCiudadesPage}/>
			<Route path='/departamentos' component={ListarDepartamentosPage}/>
			
			<Route path='/areas' component={ListarAreasPage}/>
			<Route path='/alergias' component={ListarAlergiasPage}/>


			<Route path='/dashboard/pacientes' component={ListarPacienteApp}>
				<IndexRoute component={ListarPacientesPage}/>
				<Route path='/dashboard/pacientes/:idPaciente' component={MostrarPacienteAppContainer}>
					<Route path='/dashboard/pacientes/:idPaciente/alergias' component={ListarPacienteAlergiasPage}/>

				</Route>
			</Route>
		</Route>

	</Route>)