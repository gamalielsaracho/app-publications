import {
	CERRAR_FORMULARIO_FARMACEUTICA,

	LISTAR_FARMACEUTICAS_REQUEST,
	LISTAR_FARMACEUTICAS_EXITO,
	LISTAR_FARMACEUTICAS_FALLO,

	ABRIR_FORMULARIO_CREAR_FARMACEUTICA,

	CREAR_FARMACEUTICA_REQUEST,
	CREAR_FARMACEUTICA_EXITO,
	CREAR_FARMACEUTICA_FALLO,

	MOSTRAR_FARMACEUTICA_REQUEST,
	MOSTRAR_FARMACEUTICA_EXITO,
	MOSTRAR_FARMACEUTICA_FALLO,

	CERRAR_MODAL_MOSTRAR_FARMACEUTICA,

	// Editar farmaceutica.
		// form to edit farmaceutica.
	ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_EXITO,
	ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_FALLO,

	EDITAR_FARMACEUTICA_REQUEST,
	EDITAR_FARMACEUTICA_EXITO,
	EDITAR_FARMACEUTICA_FALLO,

	ELIMINAR_FARMACEUTICA_REQUEST,
	ELIMINAR_FARMACEUTICA_EXITO,
	ELIMINAR_FARMACEUTICA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		farmaceutica: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { farmaceuticas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, farmaceutica: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_FARMACEUTICA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					farmaceutica: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					farmaceutica: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					farmaceutica: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					farmaceutica: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_FARMACEUTICA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					farmaceutica: {}
				}
			})

		// CREATE farmaceutica.
		case CREAR_FARMACEUTICA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_FARMACEUTICA_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	farmaceuticas: [ ...state.listar.farmaceuticas, action.payload.datoInsertado ]
				// }
			})

		case CREAR_FARMACEUTICA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_FARMACEUTICAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_FARMACEUTICAS_EXITO:
			return Object.assign({}, state, {
				listar: { farmaceuticas: action.payload.farmaceuticas, cargando: false, error: '' }
			})

		case LISTAR_FARMACEUTICAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, farmaceuticas:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_FARMACEUTICA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_FARMACEUTICA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					farmaceutica: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_FARMACEUTICA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					farmaceutica: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_FARMACEUTICA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					farmaceutica: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_FARMACEUTICA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_FARMACEUTICA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_FARMACEUTICA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_FARMACEUTICA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_FARMACEUTICA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_FARMACEUTICA_FALLO:
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