import {
	CERRAR_FORMULARIO_PRESENTACION,

	LISTAR_PRESENTACIONES_REQUEST,
	LISTAR_PRESENTACIONES_EXITO,
	LISTAR_PRESENTACIONES_FALLO,

	ABRIR_FORMULARIO_CREAR_PRESENTACION,

	CREAR_PRESENTACION_REQUEST,
	CREAR_PRESENTACION_EXITO,
	CREAR_PRESENTACION_FALLO,

	MOSTRAR_PRESENTACION_REQUEST,
	MOSTRAR_PRESENTACION_EXITO,
	MOSTRAR_PRESENTACION_FALLO,

	CERRAR_MODAL_MOSTRAR_PRESENTACION,

	// Editar presentacion.
		// form to edit presentacion.
	ABRIR_FORMULARIO_EDITAR_PRESENTACION_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRESENTACION_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRESENTACION_FALLO,

	EDITAR_PRESENTACION_REQUEST,
	EDITAR_PRESENTACION_EXITO,
	EDITAR_PRESENTACION_FALLO,

	ELIMINAR_PRESENTACION_REQUEST,
	ELIMINAR_PRESENTACION_EXITO,
	ELIMINAR_PRESENTACION_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		presentacion: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { presentaciones:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, presentacion: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PRESENTACION:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					presentacion: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PRESENTACION_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					presentacion: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PRESENTACION_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					presentacion: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PRESENTACION_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					presentacion: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_PRESENTACION:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					presentacion: {}
				}
			})

		// CREATE presentacion.
		case CREAR_PRESENTACION_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PRESENTACION_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	presentaciones: [ ...state.listar.presentaciones, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PRESENTACION_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PRESENTACIONES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_PRESENTACIONES_EXITO:
			return Object.assign({}, state, {
				listar: { presentaciones: action.payload.presentaciones, cargando: false, error: '' }
			})


		case LISTAR_PRESENTACIONES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, presentaciones:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PRESENTACION_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PRESENTACION_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					presentacion: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PRESENTACION_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					presentacion: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_PRESENTACION:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					presentacion: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_PRESENTACION_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PRESENTACION_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PRESENTACION_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PRESENTACION_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PRESENTACION_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PRESENTACION_FALLO:
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