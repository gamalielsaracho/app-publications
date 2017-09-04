import {
	CERRAR_FORMULARIO_PARAMETRO_PRECONSULTA,

	LISTAR_PARAMETROS_PRECONSULTA_REQUEST,
	LISTAR_PARAMETROS_PRECONSULTA_EXITO,
	LISTAR_PARAMETROS_PRECONSULTA_FALLO,

	ABRIR_FORMULARIO_CREAR_PARAMETRO_PRECONSULTA,

	CREAR_PARAMETRO_PRECONSULTA_REQUEST,
	CREAR_PARAMETRO_PRECONSULTA_EXITO,
	CREAR_PARAMETRO_PRECONSULTA_FALLO,

	MOSTRAR_PARAMETRO_PRECONSULTA_REQUEST,
	MOSTRAR_PARAMETRO_PRECONSULTA_EXITO,
	MOSTRAR_PARAMETRO_PRECONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_PARAMETRO_PRECONSULTA,

	// Editar parametro.
		// form to edit a parametro.
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_FALLO,

	EDITAR_PARAMETRO_PRECONSULTA_REQUEST,
	EDITAR_PARAMETRO_PRECONSULTA_EXITO,
	EDITAR_PARAMETRO_PRECONSULTA_FALLO,

	ELIMINAR_PARAMETRO_PRECONSULTA_REQUEST,
	ELIMINAR_PARAMETRO_PRECONSULTA_EXITO,
	ELIMINAR_PARAMETRO_PRECONSULTA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		parametro: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { parametros:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, parametro: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PARAMETRO_PRECONSULTA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					parametro: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					parametro: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					parametro: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					parametro: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_PARAMETRO_PRECONSULTA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					parametro: {}
				}
			})

		// CREATE parametro.
		case CREAR_PARAMETRO_PRECONSULTA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PARAMETRO_PRECONSULTA_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	parametros: [ ...state.listar.parametros, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PARAMETRO_PRECONSULTA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PARAMETROS_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_PARAMETROS_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				listar: { parametros: action.payload.parametros, cargando: false, error: '' }
			})


		case LISTAR_PARAMETROS_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, parametros:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PARAMETRO_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PARAMETRO_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametro: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PARAMETRO_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametro: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_PARAMETRO_PRECONSULTA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametro: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_PARAMETRO_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PARAMETRO_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PARAMETRO_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PARAMETRO_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PARAMETRO_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					parametro: action.payload
				}
			})

		case ELIMINAR_PARAMETRO_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					parametro: {}
				}
			})


		default: 
			return state
	}

}