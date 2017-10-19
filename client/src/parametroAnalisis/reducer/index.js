import {
	CERRAR_FORMULARIO_PARAMETRO_ANALISIS,

	LISTAR_PARAMETROS_ANALISIS_REQUEST,
	LISTAR_PARAMETROS_ANALISIS_EXITO,
	LISTAR_PARAMETROS_ANALISIS_FALLO,

	ABRIR_FORMULARIO_CREAR_PARAMETRO_ANALISIS,

	CREAR_PARAMETRO_ANALISIS_REQUEST,
	CREAR_PARAMETRO_ANALISIS_EXITO,
	CREAR_PARAMETRO_ANALISIS_FALLO,

	MOSTRAR_PARAMETRO_ANALISIS_REQUEST,
	MOSTRAR_PARAMETRO_ANALISIS_EXITO,
	MOSTRAR_PARAMETRO_ANALISIS_FALLO,

	// Editar parametroAnalisis.
		// form to edit parametroAnalisis.
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_FALLO,

	EDITAR_PARAMETRO_ANALISIS_REQUEST,
	EDITAR_PARAMETRO_ANALISIS_EXITO,
	EDITAR_PARAMETRO_ANALISIS_FALLO,

	ELIMINAR_PARAMETRO_ANALISIS_REQUEST,
	ELIMINAR_PARAMETRO_ANALISIS_EXITO,
	ELIMINAR_PARAMETRO_ANALISIS_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		parametroAnalisis: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { parametrosAnalisis:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, parametroAnalisis: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PARAMETRO_ANALISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					parametroAnalisis: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					parametroAnalisis: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					parametroAnalisis: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					parametroAnalisis: null
				}
			})


		case CERRAR_FORMULARIO_PARAMETRO_ANALISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					parametroAnalisis: null
				}
			})


		// CREATE parametroAnalisis.
		case CREAR_PARAMETRO_ANALISIS_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PARAMETRO_ANALISIS_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	parametrosAnalisis: [ ...state.listar.parametrosAnalisis, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PARAMETRO_ANALISIS_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_PARAMETROS_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_PARAMETROS_ANALISIS_EXITO:
			return Object.assign({}, state, {
				listar: { parametrosAnalisis: action.payload.parametrosAnalisis, cargando: false, error: '' }
			})

		case LISTAR_PARAMETROS_ANALISIS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, parametrosAnalisis:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PARAMETRO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_PARAMETRO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroAnalisis: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PARAMETRO_ANALISIS_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroAnalisis: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		// EDITAR.
		case EDITAR_PARAMETRO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PARAMETRO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PARAMETRO_ANALISIS_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PARAMETRO_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PARAMETRO_ANALISIS_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PARAMETRO_ANALISIS_FALLO:
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