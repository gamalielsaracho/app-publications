import {
	CERRAR_FORMULARIO_ANALISIS_SOLICITADO,

	LISTAR_ANALISIS_SOLICITADOS_REQUEST,
	LISTAR_ANALISIS_SOLICITADOS_EXITO,
	LISTAR_ANALISIS_SOLICITADOS_FALLO,

	ABRIR_FORMULARIO_CREAR_ANALISIS_SOLICITADO,

	CREAR_ANALISIS_SOLICITADO_REQUEST,
	CREAR_ANALISIS_SOLICITADO_EXITO,
	CREAR_ANALISIS_SOLICITADO_FALLO,

	MOSTRAR_ANALISIS_SOLICITADO_REQUEST,
	MOSTRAR_ANALISIS_SOLICITADO_EXITO,
	MOSTRAR_ANALISIS_SOLICITADO_FALLO,

	// Editar analisisSolicitado.
		// form to edit analisisSolicitado.
	ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_EXITO,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_FALLO,

	EDITAR_ANALISIS_SOLICITADO_REQUEST,
	EDITAR_ANALISIS_SOLICITADO_EXITO,
	EDITAR_ANALISIS_SOLICITADO_FALLO,

	ELIMINAR_ANALISIS_SOLICITADO_REQUEST,
	ELIMINAR_ANALISIS_SOLICITADO_EXITO,
	ELIMINAR_ANALISIS_SOLICITADO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		analisisSolicitado: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { analisisSolicitados:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, analisisSolicitado: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_ANALISIS_SOLICITADO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					analisisSolicitado: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					analisisSolicitado: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					analisisSolicitado: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					analisisSolicitado: null
				}
			})


		case CERRAR_FORMULARIO_ANALISIS_SOLICITADO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					analisisSolicitado: null
				}
			})


		// CREATE analisisSolicitado.
		case CREAR_ANALISIS_SOLICITADO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ANALISIS_SOLICITADO_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	analisisSolicitados: [ ...state.listar.analisisSolicitados, action.payload.datoInsertado ]
				// }
			})

		case CREAR_ANALISIS_SOLICITADO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_ANALISIS_SOLICITADOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_ANALISIS_SOLICITADOS_EXITO:
			return Object.assign({}, state, {
				listar: { analisisSolicitados: action.payload.analisisSolicitados, cargando: false, error: '' }
			})

		case LISTAR_ANALISIS_SOLICITADOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, analisisSolicitados:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_ANALISIS_SOLICITADO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_ANALISIS_SOLICITADO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					analisisSolicitado: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_ANALISIS_SOLICITADO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					analisisSolicitado: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		// EDITAR.
		case EDITAR_ANALISIS_SOLICITADO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_ANALISIS_SOLICITADO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_ANALISIS_SOLICITADO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_ANALISIS_SOLICITADO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_ANALISIS_SOLICITADO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_ANALISIS_SOLICITADO_FALLO:
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