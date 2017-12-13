import {
	LISTAR_ANALISIS_REQUEST,
	LISTAR_ANALISIS_EXITO,
	LISTAR_ANALISIS_FALLO,

	CREAR_ANALISIS_REQUEST,
	CREAR_ANALISIS_EXITO,
	CREAR_ANALISIS_FALLO,

	MOSTRAR_ANALISIS_REQUEST,
	MOSTRAR_ANALISIS_EXITO,
	MOSTRAR_ANALISIS_FALLO,

	MOSTRAR_ANALISIS_VISTA_PREVIA_REQUEST,
	MOSTRAR_ANALISIS_VISTA_PREVIA_EXITO,
	MOSTRAR_ANALISIS_VISTA_PREVIA_FALLO,

	MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_REQUEST,
	MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_EXITO,
	MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_FALLO,

	ELIMINAR_ANALISIS_REQUEST,
	ELIMINAR_ANALISIS_EXITO,
	ELIMINAR_ANALISIS_FALLO,

	LIMPIAR_MENSAJE_ERROR_ANALISIS
} from '../actions/types'

const INITIAL_STATE = {
	mostrarByIdAnalisisSolicitado: { 
		cargando: false, analisis: [], error: '' 
	},
	listar: { analisisLista:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, analisis: null, error: '' },
	vistaPrevia: { cargando: false, analisis: null, error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case LIMPIAR_MENSAJE_ERROR_ANALISIS:
			
			state = Object.assign({}, state, {
				crear: { error:'' },
				eliminar: { error:'' },
				editar: { error:'' }
			})

			return state

		
		case MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_REQUEST:
			return Object.assign({}, state, {
				mostrarByIdAnalisisSolicitado: { cargando: true },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_EXITO:
			return Object.assign({}, state, {
				mostrarByIdAnalisisSolicitado: { 
					cargando: false,
					analisis: action.payload
				}
			})

		case MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_FALLO:
			return Object.assign({}, state, {
				mostrarByIdAnalisisSolicitado: {
					cargando: false,
					analisis: [],
					error: action.payload
				}
			})


		// CREATE analisis.
		case CREAR_ANALISIS_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ANALISIS_EXITO:
			return Object.assign({}, state, {
				crear: { 
					cargando: false,
					mensaje: action.payload.mensaje
				}
			})

		case CREAR_ANALISIS_FALLO:
			return state = Object.assign({}, state, {
				crear: { 
					cargando: false,
					mensaje: '',
					error: action.payload
				}
			})


		// LISTAR.
		case LISTAR_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_ANALISIS_EXITO:
			return Object.assign({}, state, {
				listar: { analisisLista: action.payload.analisisLista, cargando: false, error: '' }
			})

		case LISTAR_ANALISIS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, analisisLista:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_ANALISIS_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					analisis: action.payload
				}
			})

		case MOSTRAR_ANALISIS_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					analisis: null,
					error: action.payload
				}
			})


		// VISTA-PREVIA. 
		case MOSTRAR_ANALISIS_VISTA_PREVIA_REQUEST:
			return Object.assign({}, state, {
				vistaPrevia: { cargando: true },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_ANALISIS_VISTA_PREVIA_EXITO:
			return Object.assign({}, state, {
				vistaPrevia: {
					cargando: false,
					analisis: action.payload
				}
			})

		case MOSTRAR_ANALISIS_VISTA_PREVIA_FALLO:
			return Object.assign({}, state, {
				vistaPrevia: {
					cargando: false,
					analisis: null,
					error: action.payload
				}
			})


		// ELIMINAR.
		case ELIMINAR_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_ANALISIS_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_ANALISIS_FALLO:
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