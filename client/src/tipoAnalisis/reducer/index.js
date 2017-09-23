import {
	CERRAR_FORMULARIO_TIPO_ANALISIS,

	LISTAR_TIPOS_ANALISIS_REQUEST,
	LISTAR_TIPOS_ANALISIS_EXITO,
	LISTAR_TIPOS_ANALISIS_FALLO,

	ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS,

	CREAR_TIPO_ANALISIS_REQUEST,
	CREAR_TIPO_ANALISIS_EXITO,
	CREAR_TIPO_ANALISIS_FALLO,

	MOSTRAR_TIPO_ANALISIS_REQUEST,
	MOSTRAR_TIPO_ANALISIS_EXITO,
	MOSTRAR_TIPO_ANALISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_TIPO_ANALISIS,

	// Editar tipoAnalisis.
		// form to edit tipoAnalisis.
	ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_FALLO,

	EDITAR_TIPO_ANALISIS_REQUEST,
	EDITAR_TIPO_ANALISIS_EXITO,
	EDITAR_TIPO_ANALISIS_FALLO,

	ELIMINAR_TIPO_ANALISIS_REQUEST,
	ELIMINAR_TIPO_ANALISIS_EXITO,
	ELIMINAR_TIPO_ANALISIS_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		tipoAnalisis: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { tiposAnalisis:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, tipoAnalisis: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					tipoAnalisis: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})


		case ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					tipoAnalisis: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					tipoAnalisis: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					tipoAnalisis: null
				}
			})


		case CERRAR_FORMULARIO_TIPO_ANALISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					tipoAnalisis: null
				}
			})

		// CREATE tipoAnalisis.
		case CREAR_TIPO_ANALISIS_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_TIPO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	tiposAnalisis: [ ...state.listar.tiposAnalisis, action.payload.datoInsertado ]
				// }
			})

		case CREAR_TIPO_ANALISIS_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_TIPOS_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_TIPOS_ANALISIS_EXITO:
			return Object.assign({}, state, {
				listar: { tiposAnalisis: action.payload.tiposAnalisis, cargando: false, error: '' }
			})

		case LISTAR_TIPOS_ANALISIS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, tiposAnalisis:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_TIPO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoAnalisis: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_ANALISIS_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoAnalisis: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})


		case CERRAR_MODAL_MOSTRAR_TIPO_ANALISIS:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoAnalisis: null,
					error: ''
				}
			})


		// EDITAR.
		case EDITAR_TIPO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_TIPO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_TIPO_ANALISIS_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_TIPO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_TIPO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_TIPO_ANALISIS_FALLO:
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