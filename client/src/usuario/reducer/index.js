import {
	REGISTRAR_USUARIO_REQUEST,
	REGISTRAR_USUARIO_EXITO,
	REGISTRAR_USUARIO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	registro:{ mensaje:'', error:'', cargando:false },
	mostrar: { mensaje:'', error:'', cargando:false },
	actualizar:{ mensaje:'', error:'', cargando:false },
	usuario: {
		autenticado:false,
		datosToken:{}
	}
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case REGISTRAR_USUARIO_REQUEST:
			return Object.assign({}, state, { registro: { cargando: true } }) 

		case REGISTRAR_USUARIO_EXITO:
			return Object.assign({}, state, { 
				registro: { cargando:false, error:'', mensaje: action.payload.mensaje } 
			})

		case REGISTRAR_USUARIO_FALLO:
			return Object.assign({}, state, { 
				registro:{ cargando:false, error: action.payload.error, mensaje:'' }
			})
	
		default:
			return state
	}
}