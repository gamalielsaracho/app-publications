import {
	LISTAR_TIPO_ANALISIS_PARAMETROS_REQUEST,
	LISTAR_TIPO_ANALISIS_PARAMETROS_EXITO,
	LISTAR_TIPO_ANALISIS_PARAMETROS_FALLO,

	ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS_PARAMETRO,

	CREAR_TIPO_ANALISIS_PARAMETRO_REQUEST,
	CREAR_TIPO_ANALISIS_PARAMETRO_EXITO,
	CREAR_TIPO_ANALISIS_PARAMETRO_FALLO,

	CERRAR_FORMULARIO_TIPO_ANALISIS_PARAMETRO,

	MOSTRAR_TIPO_ANALISIS_PARAMETRO_REQUEST,
	MOSTRAR_TIPO_ANALISIS_PARAMETRO_EXITO,
	MOSTRAR_TIPO_ANALISIS_PARAMETRO_FALLO,

	ELIMINAR_TIPO_ANALISIS_PARAMETRO_REQUEST,
	ELIMINAR_TIPO_ANALISIS_PARAMETRO_EXITO,
	ELIMINAR_TIPO_ANALISIS_PARAMETRO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		parametroTipoAnalisis: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { parametrosTipoAnalisis:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, parametroTipoAnalisis: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		case ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS_PARAMETRO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					parametroTipoAnalisis: null
				}
			})

		case CERRAR_FORMULARIO_TIPO_ANALISIS_PARAMETRO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE parametroTipoAnalisis.
		case CREAR_TIPO_ANALISIS_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_TIPO_ANALISIS_PARAMETRO_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					parametrosTipoAnalisis: [ ...state.listar.parametrosTipoAnalisis, 
											 action.payload.datoInsertado ]
				},
				formulario: { abirtoCrear: false }
			})

			// console.log(state.listar)

			return state

		case CREAR_TIPO_ANALISIS_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: '', 
					cargando: false,
					error: action.payload 
				}
			})


		// LISTAR.
		case LISTAR_TIPO_ANALISIS_PARAMETROS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})

		case LISTAR_TIPO_ANALISIS_PARAMETROS_EXITO:
			return Object.assign({}, state, {
				listar: { parametrosTipoAnalisis: action.payload.parametrosTipoAnalisis, cargando: false, error: '' }
			})

		case LISTAR_TIPO_ANALISIS_PARAMETROS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, parametrosTipoAnalisis:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_TIPO_ANALISIS_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_ANALISIS_PARAMETRO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroTipoAnalisis: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_ANALISIS_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroTipoAnalisis: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})



		// ELIMINAR.
		case ELIMINAR_TIPO_ANALISIS_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_TIPO_ANALISIS_PARAMETRO_EXITO:
					
			let newList = state.listar.parametrosTipoAnalisis.filter((i) => {
				return i.tipoAnalisisParametro.id_tipoAnalisisParametro != action.payload.id_tipoAnalisisParametro
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					parametrosTipoAnalisis: newList
				}
			})

			return state

		case ELIMINAR_TIPO_ANALISIS_PARAMETRO_FALLO:
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