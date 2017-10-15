import React from 'react'
import { Route, IndexRoute } from 'react-router'

import medicamentoRoutes from './medicamento/routes'

import pacienteRoutes from './routes/Paciente'

import medicamentoEntregadoRoutes from './medicamentoEntregado/routes'



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
	// Listar.
import ListarCitasApp from '././cita/components/ListarApp'

import ListarCitasPage from '././cita/pages/ListarCitasPage'

import MostrarCitaAppContainer from '././cita/components/MostrarApp'

// NIVELES.
import ListarNivelesPage from '././nivel/pages/ListarNivelesPage'

// PRE-CONSULTA APP.
import MostrarPreConsultaAppContainer from '././preconsulta/components/MostrarApp'


// PARAMETROS PRE-CONSULTA.
import ListarParametrosPreConsultaPage from '././parametroPreConsulta/pages/ListarParametrosPreConsultaPage'


// UNIDADES PARAMENTRO PRE-CONSULTA.
import ListarUnidadesParametroPrePage from '././unidadParametroPre/pages/ListarUnidadesParametroPrePage'

// DIAGNOSTICOS.
import ListarDiagnosticosPage from '././diagnostico/pages/ListarDiagnosticosPage'
import ListarSintomasPage from '././sintoma/pages/ListarSintomasPage'


// CONSULTAS APP.
import ListarConsultasAppContainer from '././consulta/components/ListarApp'

import ListarConsultasContainer from '././consulta/components/Listar'

				// Con todos los detalles.
// CONSULTA APP.
import MostrarConsultaAppContainer from '././consulta/components/MostrarApp'


// ... Para cuando el médico realize la consulta.
import MostrarConsultaRellenandoAppContainer from '././consulta/components/MostrarRellenandoApp'

import ListarSintomasConsultaContainer from '././consultaSintoma/components/Listar'

import ListarConsultaDiagnosticosContainer from '././consultaDiagnostico/components/Listar'


				// Módulo farmacia.
import ListarNombresMedicamentosPage from '././nombreMedicamento/pages/ListarNombresMedicamentosPage'
import ListarPresentacionesPage from '././presentacion/pages/ListarPresentacionesPage'
import ListarTiposConsumosPage from '././tipoConsumo/pages/ListarTiposConsumosPage'

// Estable.
import ListarDrogasPage from '././droga/pages/ListarDrogasPage'

import ListarUnidadesMedicamentosPage from '././unidadMedidaMedicamento/pages/ListarUnidadesMedicamentosPage'
import ListarFarmaceuticasPage from '././farmaceutica/pages/ListarFarmaceuticasPage'
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

			<Route path='/dashboard/niveles' component={ListarNivelesPage}/>

			<Route path='/dashboard/parametros-preconsulta' component={ListarParametrosPreConsultaPage}/>

			<Route path='/dashboard/unidades-parametro-preconsulta' component={ListarUnidadesParametroPrePage}/>

			<Route path='/dashboard/diagnosticos' component={ListarDiagnosticosPage}/>
			<Route path='/dashboard/sintomas' component={ListarSintomasPage}/>

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


			{ medicamentoRoutes }
			{ pacienteRoutes }
			{ medicamentoEntregadoRoutes }
			

			<Route path='/dashboard/citas' component={ListarCitasApp}>
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


				{/* Módulo farmacia. */}
			<Route path='/dashboard/nombres-medicamentos' component={ListarNombresMedicamentosPage}/>
			<Route path='/dashboard/presentaciones' component={ListarPresentacionesPage}/>
			<Route path='/dashboard/tipos-consumos' component={ListarTiposConsumosPage}/>
			<Route path='/dashboard/drogas' component={ListarDrogasPage}/>
			<Route path='/dashboard/unidades-medicamentos' component={ListarUnidadesMedicamentosPage}/>
			<Route path='/dashboard/farmaceuticas' component={ListarFarmaceuticasPage}/>
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