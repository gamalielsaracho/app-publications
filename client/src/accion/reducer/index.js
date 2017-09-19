import {
	CERRAR_FORMULARIO_ACCION,

	LISTAR_ACCIONES_REQUEST,
	LISTAR_ACCIONES_EXITO,
	LISTAR_ACCIONES_FALLO,

	ABRIR_FORMULARIO_CREAR_ACCION,

	CREAR_ACCION_REQUEST,
	CREAR_ACCION_EXITO,
	CREAR_ACCION_FALLO,

	MOSTRAR_ACCION_REQUEST,
	MOSTRAR_ACCION_EXITO,
	MOSTRAR_ACCION_FALLO,

	CERRAR_MODAL_MOSTRAR_ACCION,

	// Editar accion.
		// form to edit accion.
	ABRIR_FORMULARIO_EDITAR_ACCION_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ACCION_EXITO,
	ABRIR_FORMULARIO_EDITAR_ACCION_FALLO,

	EDITAR_ACCION_REQUEST,
	EDITAR_ACCION_EXITO,
	EDITAR_ACCION_FALLO,

	ELIMINAR_ACCION_REQUEST,
	ELIMINAR_ACCION_EXITO,
	ELIMINAR_ACCION_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		accion: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { acciones:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, accion: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_ACCION:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					accion: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ACCION_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					accion: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ACCION_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					accion: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ACCION_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					accion: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_ACCION:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					accion: {}
				}
			})

		// CREATE accion.
		case CREAR_ACCION_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ACCION_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	acciones: [ ...state.listar.acciones, action.payload.datoInsertado ]
				// }
			})

		case CREAR_ACCION_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_ACCIONES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_ACCIONES_EXITO:
			return Object.assign({}, state, {
				listar: { acciones: action.payload.acciones, cargando: false, error: '' }
			})

		case LISTAR_ACCIONES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, acciones:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_ACCION_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_ACCION_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					accion: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_ACCION_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					accion: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_ACCION:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					accion: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_ACCION_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_ACCION_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_ACCION_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_ACCION_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_ACCION_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_ACCION_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload
				}
			})


		default: 
			return state
	}

}