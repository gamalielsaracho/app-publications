import {
	ABRIR_FORMULARIO_CREAR_ROL,
	CERRAR_FORMULARIO_CREAR_ROL,

	LISTAR_ROLES_REQUEST,
	LISTAR_ROLES_EXITO,
	LISTAR_ROLES_FALLO,

	CREAR_ROL_REQUEST,
	CREAR_ROL_EXITO,
	CREAR_ROL_FALLO,

	MOSTRAR_ROL_REQUEST,
	MOSTRAR_ROL_EXITO,
	MOSTRAR_ROL_FALLO,

	CERRAR_MODAL_MOSTRAR_ROL,

	// Editar Rol.
	MOSTRAR_EDITAR_ROL_REQUEST,
	MOSTRAR_EDITAR_ROL_EXITO,
	MOSTRAR_EDITAR_ROL_FALLO,

	EDITAR_ROL_REQUEST,
	EDITAR_ROL_EXITO,
	EDITAR_ROL_FALLO,

	CERRAR_MODAL_EDITAR_ROL,

	ELIMINAR_ROL_REQUEST,
	ELIMINAR_ROL_EXITO,
	ELIMINAR_ROL_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		mostrar: false,
		nombre: ''
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { roles:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, rol: {}, error: '', abierto: false },
	
	mostrarEditar: { cargando: false, rol: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
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
				}
				// listar: { 
				// 	roles: [ ...state.listar.roles, action.payload.datoInsertado ]
				// }
			})

		case CREAR_ROL_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
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

		// MOSTRAR.
		case MOSTRAR_ROL_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true }
			})

		case MOSTRAR_ROL_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					rol: action.payload,
					abierto: true
				}
			})

		case MOSTRAR_ROL_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					rol: {},
					error: action.payload,
					abierto: true
				}
			})

		case CERRAR_MODAL_MOSTRAR_ROL:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					rol: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case MOSTRAR_EDITAR_ROL_REQUEST:
			return Object.assign({}, state, {
				mostrarEditar: { cargando: true, abierto: true },
				mostrar: { abierto: false }
			})

		case MOSTRAR_EDITAR_ROL_EXITO:
			return Object.assign({}, state, {
				mostrarEditar: {
					cargando: false,
					abierto: true,
					rol: action.payload
				},
				mostrar: { abierto: false }
			})

		case MOSTRAR_EDITAR_ROL_FALLO:
			return Object.assign({}, state, {
				mostrarEditar: {
					cargando: false,
					abierto: true,
					rol: {},
					error: action.payload
				},
				mostrar: { abierto: false }
			})

		case EDITAR_ROL_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_ROL_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				mostrarEditar: { abierto: false, rol: {} }
			})

		case EDITAR_ROL_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload,
					abierto: true
				}
			})

		case CERRAR_MODAL_EDITAR_ROL:
			return Object.assign({}, state, {
				mostrarEditar: {
					cargando: false,
					abierto: false,
					rol: {},
					error: ''
				}
			})

		

		// ELIMINAR.
		case ELIMINAR_ROL_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_ROL_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					rol: action.payload
				}
			})

		case ELIMINAR_ROL_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					rol: {}
				}
			})


		default: 
			return state
	}

}