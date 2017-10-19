import {
	CERRAR_FORMULARIO_UNIDAD_ANALISIS,

	LISTAR_UNIDADES_ANALISIS_REQUEST,
	LISTAR_UNIDADES_ANALISIS_EXITO,
	LISTAR_UNIDADES_ANALISIS_FALLO,

	ABRIR_FORMULARIO_CREAR_UNIDAD_ANALISIS,

	CREAR_UNIDAD_ANALISIS_REQUEST,
	CREAR_UNIDAD_ANALISIS_EXITO,
	CREAR_UNIDAD_ANALISIS_FALLO,

	MOSTRAR_UNIDAD_ANALISIS_REQUEST,
	MOSTRAR_UNIDAD_ANALISIS_EXITO,
	MOSTRAR_UNIDAD_ANALISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_UNIDAD_ANALISIS,

	// Editar unidadAnalisis.
		// form to edit unidadAnalisis.
	ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_FALLO,

	EDITAR_UNIDAD_ANALISIS_REQUEST,
	EDITAR_UNIDAD_ANALISIS_EXITO,
	EDITAR_UNIDAD_ANALISIS_FALLO,

	ELIMINAR_UNIDAD_ANALISIS_REQUEST,
	ELIMINAR_UNIDAD_ANALISIS_EXITO,
	ELIMINAR_UNIDAD_ANALISIS_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		unidadAnalisis: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { unidadesAnalisis:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, unidadAnalisis: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_UNIDAD_ANALISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					unidadAnalisis: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					unidadAnalisis: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					unidadAnalisis: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					unidadAnalisis: null
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_UNIDAD_ANALISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					unidadAnalisis: null
				}
			})

		// CREATE unidadAnalisis.
		case CREAR_UNIDAD_ANALISIS_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_UNIDAD_ANALISIS_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
			})

		case CREAR_UNIDAD_ANALISIS_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_UNIDADES_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_UNIDADES_ANALISIS_EXITO:
			return Object.assign({}, state, {
				listar: { unidadesAnalisis: action.payload.unidadesAnalisis, cargando: false, error: '' }
			})

		case LISTAR_UNIDADES_ANALISIS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, unidadesAnalisis:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_UNIDAD_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_UNIDAD_ANALISIS_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadAnalisis: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_UNIDAD_ANALISIS_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadAnalisis: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_UNIDAD_ANALISIS:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadAnalisis: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_UNIDAD_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_UNIDAD_ANALISIS_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_UNIDAD_ANALISIS_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_UNIDAD_ANALISIS_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_UNIDAD_ANALISIS_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_UNIDAD_ANALISIS_FALLO:
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