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
import ListarPacientesPage from '././paciente/pages/ListarPacientesPage'

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
			<Route path='/pacientes' component={ListarPacientesPage}/>
		</Route>
	</Route>)