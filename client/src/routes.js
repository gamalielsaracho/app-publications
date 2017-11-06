import React from 'react'
import { Route, IndexRoute } from 'react-router'

import farmaceuticaRoutes from './farmaceutica/routes'

import medicamentoRoutes from './medicamento/routes'

import pacienteRoutes from './paciente/routes'

import medicamentoEntregadoRoutes from './medicamentoEntregado/routes'

import citaRoutes from './cita/routes'

import departamentoRoutes from './departamento/routes'

import ciudadRoutes from './ciudad/routes'

import areaRoutes from './area/routes'

import alergiaRoutes from './alergia/routes'

import unidadParametroPreRoutes from './unidadParametroPre/routes'

import parametroPreConsultaRoutes from './parametroPreConsulta/routes'

import auditoriaModulo1Routes from './auditoriaModulo1/routes'

import nivelRoutes from './nivel/routes'

import diagnosticoRoutes from './diagnostico/routes'

import sintomaRoutes from './sintoma/routes'


import Estadistica1Container from './consulta/components/Estadistica1'


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

	
// LISTAR ANÁLISIS SOLICITADOS APP.
import ListarAppAnalisisSolicitadosContainer from '././analisisSolicitado/components/ListarApp'
import ListarAnalisisSolicitadosContainer from '././analisisSolicitado/components/Listar'

// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '././analisisSolicitado/components/MostrarApp'

// MOSTRAR ANÁLISIS APP.
import MostrarAnalisisAppContainer from '././analisis/components/MostrarApp'

// LISTAR ANÁLISIS X TIPOS.
import ListarAnalisisTiposContainer from '././analisisTipo/components/Listar'

// MOSTRAR ANÁLISIS X TIPOS.
import MostarAnalisisTipoContainer from '././analisisTipo/components/Mostrar'

import MostrarVistaPreviaContainer from '././analisis/components/MostrarVistaPrevia'



// CITAS.


// CONSULTAS APP.
import ListarConsultasAppContainer from '././consulta/components/ListarApp'

import ListarConsultasContainer from '././consulta/components/Listar'

				// Con todos los detalles.
// CONSULTA APP.
import MostrarConsultaAppContainer from '././consulta/components/MostrarApp'


import ListarSintomasConsultaContainer from '././consultaSintoma/components/Listar'

import ListarConsultaDiagnosticosContainer from '././consultaDiagnostico/components/Listar'


				// Módulo farmacia.
import ListarNombresMedicamentosPage from '././nombreMedicamento/pages/ListarNombresMedicamentosPage'
import ListarPresentacionesPage from '././presentacion/pages/ListarPresentacionesPage'
import ListarTiposConsumosPage from '././tipoConsumo/pages/ListarTiposConsumosPage'

// Estable.
import ListarDrogasPage from '././droga/pages/ListarDrogasPage'

import ListarUnidadesMedicamentosPage from '././unidadMedidaMedicamento/pages/ListarUnidadesMedicamentosPage'


import ListarAuditoria1MovimientosContainer from '././auditoriaModulo1/components/Listar'


import ListarProveedoresPage from '././proveedor/pages/ListarProveedoresPage'
// Agregar solamente. si piden.
// import ListarAccionesPage from '././accion/pages/ListarAccionesPage'


// Módulo laboratorio.
import ListarTiposExamenesPage from '././tipoExamen/pages/ListarTiposExamenesPage'
import ListarUnidadesAnalisisPage from '././unidadAnalisis/pages/ListarUnidadesAnalisisPage'

import ListarParametrosAnalisisPage from '././parametroAnalisis/pages/ListarParametrosAnalisisPage'
	
	// MOSTRAR PARAMETRO ANALISIS APP.
import MostrarParametroAnalisisAppContainer from '././parametroAnalisis/components/MostrarApp'

import ListarReferenciasContainer from '././referencia/components/Listar'


	// LISTAR TIPOS DE ANALISIS APP.
import ListarTiposAnalisisApp from '././tipoAnalisis/components/ListarApp'
import ListarTiposAnalisisPage from '././tipoAnalisis/pages/ListarTiposAnalisisPage'
	
	// MOSTRAR TIPO DE ANALISIS APP.
import MostrarTipoAnalisisAppContainer from '././tipoAnalisis/components/MostrarApp'

// LISTAR (TIPO ANALISIS X PARAMETROS).
import ListarTipoAnalisisParametrosContainer from '././tipoAnalisisParametro/components/Listar'



// ===================================================================
	

	// LISTAR LOTES-MEDICAMENTOS APP.
import ListarLotesMedicamentosAppContainer from '././loteMedicamento/components/ListarApp'
import ListarLotesMedicamentosPage from '././loteMedicamento/pages/ListarLotesMedicamentosPage'

import MostrarLoteMedicamentoAppContainer from '././loteMedicamento/components/MostrarApp'


// Estadística.
import EstadisticasAppContainer from '././consulta/components/EstadisticasApp'
import Estadistica1AppContainer from '././consulta/components/Estadistica1App'
import Estadistica2AppContainer from '././consulta/components/Estadistica2App'


export default (
	<Route path='/' component={AppContainer}>
		<IndexRoute component={HomePage}/>
		<Route path='/registrarse' component={RegistrarPage}/>
		<Route path='/entrar' component={AutenticarPage}/>

		<Route path='/dashboard' component={DashBoardContainer}>
			<Route path='/estadisticas' component={EstadisticasAppContainer}>
				<Route path='/estadisticas/diagnosticos-anuales' component={Estadistica1AppContainer}/>
				<Route path='/estadisticas/diagnosticos-anual' component={Estadistica2AppContainer}/>
			</Route>
			


			<Route path='/usuarios' component={ListarPage}/>
			<Route path='/roles' component={ListarRolesPage}/>
			<Route path='/especialidades' component={ListarEspecialidadesPage}/>
			

			<Route path='/dashboard/consultas' component={ListarConsultasAppContainer}>
				<IndexRoute component={ListarConsultasContainer}/>
				
				<Route path='/dashboard/consultas/:idConsulta' component={MostrarConsultaAppContainer}>
					<Route path='/dashboard/consultas/:idConsulta/sintomas' component={ListarSintomasConsultaContainer}/>
					<Route path='/dashboard/consultas/:idConsulta/diagnosticos' component={ListarConsultaDiagnosticosContainer}/>

					<Route path='/dashboard/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
						<Route path='/dashboard/consultas/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
					</Route>

				</Route>
			</Route>


			{ farmaceuticaRoutes }
			{ medicamentoRoutes }
			{ pacienteRoutes }
			{ medicamentoEntregadoRoutes }
			{ citaRoutes }
			{ departamentoRoutes }
			{ ciudadRoutes }
			{ areaRoutes }
			{ alergiaRoutes }
			{ unidadParametroPreRoutes }
			{ parametroPreConsultaRoutes }
			{ auditoriaModulo1Routes }
			{ nivelRoutes }
			{ diagnosticoRoutes }
			{ sintomaRoutes }

				{/* Módulo farmacia. */}
			<Route path='/dashboard/nombres-medicamentos' component={ListarNombresMedicamentosPage}/>
			<Route path='/dashboard/presentaciones' component={ListarPresentacionesPage}/>
			<Route path='/dashboard/tipos-consumos' component={ListarTiposConsumosPage}/>
			<Route path='/dashboard/drogas' component={ListarDrogasPage}/>
			<Route path='/dashboard/unidades-medicamentos' component={ListarUnidadesMedicamentosPage}/>


			<Route path='/dashboard/proveedores' component={ListarProveedoresPage}/>
			{/* Agregar solamente. si piden. (Acciones). */}
			{/* <Route path='/dashboard/acciones' component={ListarAccionesPage}/> */}
			
			
			<Route path='/dashboard/lotes-medicamentos' component={ListarLotesMedicamentosAppContainer}>
				<IndexRoute component={ListarLotesMedicamentosPage}/>
				<Route path='/dashboard/lotes-medicamentos/:idLoteMedicamento' component={MostrarLoteMedicamentoAppContainer}/>
			</Route>


				{/* Módulo laboratorio. */}
			<Route path='/dashboard/tipos-examenes' component={ListarTiposExamenesPage}/>
			<Route path='/dashboard/unidades-analisis' component={ListarUnidadesAnalisisPage}/>
			<Route path='/dashboard/parametros-analisis' component={ListarParametrosAnalisisPage}/>


			<Route path='/dashboard/solicitudes-laboratorio' component={ListarAppAnalisisSolicitadosContainer}>
				<IndexRoute component={ListarAnalisisSolicitadosContainer}/>
				<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
					<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/vista-general' component={MostrarVistaPreviaContainer}/>
					
					<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis' component={MostrarAnalisisAppContainer}>
						<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/analisis-tipos' component={ListarAnalisisTiposContainer}/>

						<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/analisis-tipos/:idAnalisisTipo' component={MostarAnalisisTipoContainer}/>
						
					</Route>
				</Route>
			</Route>


			<Route path='/dashboard/tipos-analisis' component={ListarTiposAnalisisApp}>
				<IndexRoute component={ListarTiposAnalisisPage}/>
				<Route path='/dashboard/tipos-analisis/:idTipoAnalisis' component={MostrarTipoAnalisisAppContainer}>
					<Route path='/dashboard/tipos-analisis/:idTipoAnalisis/parametros' component={ListarTipoAnalisisParametrosContainer}/>
					
					<Route path='/dashboard/tipos-analisis/:idTipoAnalisis/parametros/:idParametroAnalisis' component={MostrarParametroAnalisisAppContainer}>
						<Route path='/dashboard/tipos-analisis/:idTipoAnalisis/parametros/:idParametroAnalisis/referencias' component={ListarReferenciasContainer}/>						
					</Route>
				</Route>
			</Route>

		</Route>

	</Route>)