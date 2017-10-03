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

// LISTAR ANÁLISIS SOLICITADOS APP.
import ListarAppAnalisisSolicitadosContainer from '././analisisSolicitado/components/ListarApp'
import ListarAnalisisSolicitadosContainer from '././analisisSolicitado/components/Listar'

// MOSTRAR ANÁLISIS SOLICITADO APP.
import MostrarAnalisisSolicitadoAppContainer from '././analisisSolicitado/components/MostrarApp'

// MOSTRAR ANÁLISIS APP.
import MostrarAnalisisAppContainer from '././analisis/components/MostrarApp'

// LISTAR ANÁLISIS TIPOS.
import ListarAnalisisTiposContainer from '././analisisTipo/components/Listar'

// import  from '././analisisTipo/components/Mostrar'


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


// CONSULTAS APP.
import ListarConsultasApp from '././consulta/components/ListarApp'
import ListarConsultasPage from '././consulta/pages/ListarConsultasPage'

				// Con todos los detalles.
// CONSULTA APP.
import MostrarConsultaAppContainer from '././consulta/components/MostrarApp'


// ... Para cuando el médico realize la consulta.
import MostrarConsultaRellenandoAppContainer from '././consulta/components/MostrarRellenandoApp'


				// Módulo farmacia.
import ListarNombresMedicamentosPage from '././nombreMedicamento/pages/ListarNombresMedicamentosPage'
import ListarPresentacionesPage from '././presentacion/pages/ListarPresentacionesPage'
import ListarTiposConsumosPage from '././tipoConsumo/pages/ListarTiposConsumosPage'
import ListarDosisPage from '././dosis/pages/ListarDosisPage'
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
	// LISTAR MEDICAMENTOS APP.
import ListarMedicamentosApp from '././medicamento/components/ListarApp'
import ListarMedicamentosPage from '././medicamento/pages/ListarMedicamentosPage'
	
	// MOSTRAR MEDICAMENTO APP.
import MostrarMedicamentoAppContainer from '././medicamento/components/MostrarApp'

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

			<Route path='/dashboard/consultas' component={ListarConsultasApp}>
				<IndexRoute component={ListarConsultasPage}/>
				<Route path='/dashboard/consultas/:idConsulta' component={MostrarConsultaAppContainer}>
				</Route>
			</Route>



			{/* Historial clínico. */}
			<Route path='/dashboard/pacientes' component={ListarPacienteApp}>
				<IndexRoute component={ListarPacientesPage}/>
				
				<Route path='/dashboard/pacientes/:idPaciente' component={MostrarPacienteAppContainer}>
					<Route path='/dashboard/pacientes/:idPaciente/alergias' component={ListarPacienteAlergiasPage}/>
					
					<Route path='/dashboard/pacientes/:idPaciente/solicitudes-laboratorio' component={ListarAppAnalisisSolicitadosContainer}>
						<IndexRoute component={ListarAnalisisSolicitadosContainer}/>
						
						<Route path='/dashboard/pacientes/:idPaciente/solicitudes-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>

						</Route>
					</Route>

				</Route>
			</Route>


			<Route path='/dashboard/citas' component={ListarCitasApp}>
				<IndexRoute component={ListarCitasPage}/>
				<Route path='/dashboard/citas/:idCita' component={MostrarCitaAppContainer}>
					<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta' component={MostrarPreConsultaAppContainer}>

						<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta/consulta/:idConsulta' component={MostrarConsultaRellenandoAppContainer}>
							<Route path='/dashboard/citas/:idCita/preconsulta/:idPreConsulta/consulta/:idConsulta/solicitud-laboratorio/:idAnalisisSolicitado' component={MostrarAnalisisSolicitadoAppContainer}>
							
							</Route>
						</Route>
					</Route>
				</Route>
			</Route>


				{/* Módulo farmacia. */}
			<Route path='/dashboard/nombres-medicamentos' component={ListarNombresMedicamentosPage}/>
			<Route path='/dashboard/presentaciones' component={ListarPresentacionesPage}/>
			<Route path='/dashboard/tipos-consumos' component={ListarTiposConsumosPage}/>
			<Route path='/dashboard/dosis' component={ListarDosisPage}/>
			<Route path='/dashboard/unidades-medicamentos' component={ListarUnidadesMedicamentosPage}/>
			<Route path='/dashboard/farmaceuticas' component={ListarFarmaceuticasPage}/>
			<Route path='/dashboard/proveedores' component={ListarProveedoresPage}/>
			{/* Agregar solamente. si piden. (Acciones). */}
			{/* <Route path='/dashboard/acciones' component={ListarAccionesPage}/> */}
			
			<Route path='/dashboard/medicamentos' component={ListarMedicamentosApp}>
				<IndexRoute component={ListarMedicamentosPage}/>

				<Route path='/dashboard/medicamentos/:idMedicamento' component={MostrarMedicamentoAppContainer}/>
			</Route>

			
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
					<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis' component={MostrarAnalisisAppContainer}>
						<Route path='/dashboard/solicitudes-laboratorio/:idAnalisisSolicitado/analisis/:idAnalisis/tipos-analisis' component={ListarAnalisisTiposContainer}>

						</Route>
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