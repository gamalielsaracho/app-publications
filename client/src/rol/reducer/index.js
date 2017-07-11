import {
	ABRIR_FORMULARIO_CREAR_ROL,
	CERRAR_FORMULARIO_CREAR_ROL,

	CREAR_ROL_REQUEST,
	CREAR_ROL_EXITO,
	CREAR_ROL_FALLO,

	LISTAR_ROLES_REQUEST,
	LISTAR_ROLES_EXITO,
	LISTAR_ROLES_FALLO

} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		mostrar: false,
		nombre: ''
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { roles:[], cargando: false, error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_ROL:
			return Object.assign({}, state, {
				formulario: { mostrar: true }
			})

		case CERRAR_FORMULARIO_CREAR_ROL:
			return Object.assign({}, state, {
				formulario: { mostrar: false },
				crear: { mensaje: '', error: '' }
			})

		case CREAR_ROL_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ROL_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				listar: { 
					roles: [ ...state.listar.roles, action.payload.datoInsertado ]
				}
			})

		case CREAR_ROL_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload.error }
			})

		// LISTAR.
		case LISTAR_ROLES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})


		case LISTAR_ROLES_EXITO:
			return Object.assign({}, state, {
				listar: { roles: action.payload.roles, cargando: false, error: '' }
			})


		case LISTAR_ROLES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, roles:[], cargando: false }
			})

		default: 
			return state
	}

}