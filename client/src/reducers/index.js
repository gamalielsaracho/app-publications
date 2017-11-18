import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import personalReducer from '../usuario/reducer'
import rolReducer from '../rol/reducer'
import especialidadReducer from '../especialidades/reducer'
import ciudadReducer from '../ciudad/reducer'
import departamentoReducer from '../departamento/reducer'

import areaReducer from '../area/reducer'
import alergiaReducer from '../alergia/reducer'

import pacienteReducer from '../paciente/reducer'
import pacienteAlergiaReducer from '../pacienteAlergia/reducer'

import citaReducer from '../cita/reducer'
import nivelReducer from '../nivel/reducer'
import preConsultaReducer from '../preconsulta/reducer'

import parametroPreConsultaReducer from '../parametroPreConsulta/reducer'

import preConsultaParametroReducer from '../preConsultaParametro/reducer'

import diagnosticoReducer from '../diagnostico/reducer'
import consultaReducer from '../consulta/reducer'
import sintomaReducer from '../sintoma/reducer'

import consultaSintomaReducer from '../consultaSintoma/reducer'

import consultaDiagnosticoReducer from '../consultaDiagnostico/reducer'


// Farmacia.
import nombreMedicamentoReducer from '../nombreMedicamento/reducer'
import presentacionReducer from '../presentacion/reducer'
import tipoConsumoReducer from '../tipoConsumo/reducer'
import unidadMedidaMedicamentoReducer from '../unidadMedidaMedicamento/reducer'
import proveedorReducer from '../proveedor/reducer'
import accionReducer from '../accion/reducer'
import loteMedicamentoReducer from '../loteMedicamento/reducer'


// Estable Farmacia.
import farmaceuticaReducer from '../farmaceutica/reducer'
import drogaReducer from '../droga/reducer'
import medicamentoReducer from '../medicamento/reducer'
import medicamentoDrogaReducer from '../medicamentoDroga/reducer'

// Medicamentos entregados.
import medicamentoEntregadoReducer from '../medicamentoEntregado/reducer'

import medicamentoAgregadoReducer from '../medicamentoXentregado/reducer'


// Laboratorio
import tipoExamenReducer from '../tipoExamen/reducer'
import unidadAnalisisReducer from '../unidadAnalisis/reducer'
import parametroAnalisisReducer from '../parametroAnalisis/reducer'
import tipoAnalisisReducer from '../tipoAnalisis/reducer'
import tipoAnalisisParametroReducer from '../tipoAnalisisParametro/reducer'
import referenciaReducer from '../referencia/reducer'

		// Análisis. 
import analisisSolicitadoReducer from '../analisisSolicitado/reducer'
import analisisSolicitadoTipoReducer from '../analisisSolicitadoTipo/reducer'
import analisisReducer from '../analisis/reducer'
import analisisTipoReducer from '../analisisTipo/reducer'
import analisisTipoReferenciaReducer from '../analisisTipoReferencia/reducer'



// Auditoría
import auditoriaModulo1Reducer from '../auditoriaModulo1/reducer'


const rootReducer = combineReducers({
	form: formReducer,
	personal: personalReducer,
	rol: rolReducer,
	especialidad: especialidadReducer,
	ciudad: ciudadReducer,
	departamento: departamentoReducer,
	area: areaReducer,
	alergia: alergiaReducer,
	paciente: pacienteReducer,
	alergiaPaciente: pacienteAlergiaReducer,
	cita: citaReducer,
	nivel: nivelReducer,

	// Los tres relacionados.
	preConsulta: preConsultaReducer,
	parametroPreConsulta: parametroPreConsultaReducer,
	preConsultaParametro: preConsultaParametroReducer,

	diagnostico: diagnosticoReducer,
	consulta: consultaReducer,
	sintoma: sintomaReducer,
	consultaSintoma: consultaSintomaReducer,
	consultaDiagnostico: consultaDiagnosticoReducer,


	
	// Farmacia.
	tipoConsumo: tipoConsumoReducer,
	unidadMedicamento: unidadMedidaMedicamentoReducer,
	proveedor: proveedorReducer,
	accion: accionReducer,
	loteMedicamento: loteMedicamentoReducer,

		// Farmacia estable.
	presentacion: presentacionReducer,
	nombreMedicamento: nombreMedicamentoReducer,
	medicamento: medicamentoReducer,
	farmaceutica: farmaceuticaReducer,
	droga: drogaReducer,
	medicamentoDroga: medicamentoDrogaReducer,

	medicamentoEntregado: medicamentoEntregadoReducer,
	medicamentoAgregado: medicamentoAgregadoReducer,


	// Laboratorio
	tipoExamen: tipoExamenReducer,
	unidadAnalisis: unidadAnalisisReducer,
	parametroAnalisis: parametroAnalisisReducer,
	tipoAnalisis: tipoAnalisisReducer,
	tipoAnalisisParametro: tipoAnalisisParametroReducer,
	referencia: referenciaReducer,


	// Análisis.
	analisisSolicitado: analisisSolicitadoReducer,
	analisisSolicitadoTipo: analisisSolicitadoTipoReducer,
	analisis: analisisReducer,
	analisisTipo: analisisTipoReducer,
	analisisTipoReferencia: analisisTipoReferenciaReducer,


	// Auditoría.
	auditoriaModulo1: auditoriaModulo1Reducer
})

export default rootReducer