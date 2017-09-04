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
	preConsultaParametro: preConsultaParametroReducer

})

export default rootReducer