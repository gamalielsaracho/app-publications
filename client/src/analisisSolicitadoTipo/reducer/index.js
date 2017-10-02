import {

	LISTAR_ANALISIS_SOLICITADO_TIPOS_REQUEST,
	LISTAR_ANALISIS_SOLICITADO_TIPOS_EXITO,
	LISTAR_ANALISIS_SOLICITADO_TIPOS_FALLO,

	CREAR_ANALISIS_SOLICITADO_TIPO_REQUEST,
	CREAR_ANALISIS_SOLICITADO_TIPO_EXITO,
	CREAR_ANALISIS_SOLICITADO_TIPO_FALLO,

	ELIMINAR_ANALISIS_SOLICITADO_TIPO_REQUEST,
	ELIMINAR_ANALISIS_SOLICITADO_TIPO_EXITO,
	ELIMINAR_ANALISIS_SOLICITADO_TIPO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { analisisSolicitadoTipos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		// CREATE parametroPreConsulta.
		case CREAR_ANALISIS_SOLICITADO_TIPO_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ANALISIS_SOLICITADO_TIPO_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					analisisSolicitadoTipos: [ ...state.listar.analisisSolicitadoTipos, 
											 action.payload.datoInsertado ]
				}
			})

			// console.log(state)

			return state

		case CREAR_ANALISIS_SOLICITADO_TIPO_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_ANALISIS_SOLICITADO_TIPOS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})

		case LISTAR_ANALISIS_SOLICITADO_TIPOS_EXITO:
			return Object.assign({}, state, {
				listar: { analisisSolicitadoTipos: action.payload.analisisSolicitadoTipos, cargando: false, error: '' }
			})

		case LISTAR_ANALISIS_SOLICITADO_TIPOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, analisisSolicitadoTipos:[], cargando: false }
			})

	
		// ELIMINAR.
		case ELIMINAR_ANALISIS_SOLICITADO_TIPO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear
			})

		case ELIMINAR_ANALISIS_SOLICITADO_TIPO_EXITO:
					
			let newList = state.listar.analisisSolicitadoTipos.filter((i) => {
				return i.analisisSolicitadoTipo.id_analisisSolicitadoTipo != action.payload.id_analisisSolicitadoTipo
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					analisisSolicitadoTipos: newList
				}
			})

			return state

		case ELIMINAR_ANALISIS_SOLICITADO_TIPO_FALLO:
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