import {

	LISTAR_ANALISIS_TIPOS_REQUEST,
	LISTAR_ANALISIS_TIPOS_EXITO,
	LISTAR_ANALISIS_TIPOS_FALLO,

	ABRIR_FORMULARIO_CREAR_ANALISIS_TIPO,

	CREAR_ANALISIS_TIPO_REQUEST,
	CREAR_ANALISIS_TIPO_EXITO,
	CREAR_ANALISIS_TIPO_FALLO,

	CERRAR_FORMULARIO_ANALISIS_TIPO,

	MOSTRAR_ANALISIS_TIPO_REQUEST,
	MOSTRAR_ANALISIS_TIPO_EXITO,
	MOSTRAR_ANALISIS_TIPO_FALLO,


	ELIMINAR_ANALISIS_TIPO_REQUEST,
	ELIMINAR_ANALISIS_TIPO_EXITO,
	ELIMINAR_ANALISIS_TIPO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { analisisTipos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, analisisTipo: null, error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
	    case ABRIR_FORMULARIO_CREAR_ANALISIS_TIPO:
	    	return Object.assign({}, state, {
				formulario: { abirtoCrear: true }
			})

		case CERRAR_FORMULARIO_ANALISIS_TIPO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE analisisTipo.
		case CREAR_ANALISIS_TIPO_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ANALISIS_TIPO_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					analisisTipos: [ ...state.listar.analisisTipos, 
											 action.payload.datoInsertado ]
				},
				formulario: { abirtoCrear: false }
			})

			// console.log(state)

			return state

		case CREAR_ANALISIS_TIPO_FALLO:
			return Object.assign({}, state, {
				crear: {  
					cargando: false,
					mensaje: '',
					error: action.payload
				}
			})


		// LISTAR.
		case LISTAR_ANALISIS_TIPOS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})

		case LISTAR_ANALISIS_TIPOS_EXITO:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { analisisTipos: action.payload.analisisTipos, cargando: false, error: '' }
				
			})

		case LISTAR_ANALISIS_TIPOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, analisisTipos:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_ANALISIS_TIPO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoCrear: false }
			})

		case MOSTRAR_ANALISIS_TIPO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					analisisTipo: action.payload
				},
				formulario: { abirtoCrear: false }
			})

		case MOSTRAR_ANALISIS_TIPO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					analisisTipo: null,
					error: action.payload
				},
				formulario: { abirtoCrear: false }
			})


		// ELIMINAR.
		case ELIMINAR_ANALISIS_TIPO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_ANALISIS_TIPO_EXITO:
					
			let newList = state.listar.analisisTipos.filter((i) => {
				return i.analisisTipo.id_analisisTipo != action.payload.id_analisisTipo
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					analisisTipos: newList
				}
			})

			return state

		case ELIMINAR_ANALISIS_TIPO_FALLO:
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