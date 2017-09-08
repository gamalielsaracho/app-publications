import {
	CERRAR_FORMULARIO_UNIDAD_PARAMETRO_PRE,

	LISTAR_UNIDADES_PARAMETRO_PRE_REQUEST,
	LISTAR_UNIDADES_PARAMETRO_PRE_EXITO,
	LISTAR_UNIDADES_PARAMETRO_PRE_FALLO,

	ABRIR_FORMULARIO_CREAR_UNIDAD_PARAMETRO_PRE,

	CREAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	CREAR_UNIDAD_PARAMETRO_PRE_EXITO,
	CREAR_UNIDAD_PARAMETRO_PRE_FALLO,

	MOSTRAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	MOSTRAR_UNIDAD_PARAMETRO_PRE_EXITO,
	MOSTRAR_UNIDAD_PARAMETRO_PRE_FALLO,

	CERRAR_MODAL_MOSTRAR_UNIDAD_PARAMETRO_PRE,

	// Editar unidadParametroPre.
		// form to edit unidadParametroPre.
	ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_EXITO,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_FALLO,

	EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	EDITAR_UNIDAD_PARAMETRO_PRE_EXITO,
	EDITAR_UNIDAD_PARAMETRO_PRE_FALLO,

	ELIMINAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	ELIMINAR_UNIDAD_PARAMETRO_PRE_EXITO,
	ELIMINAR_UNIDAD_PARAMETRO_PRE_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		unidadParametroPre: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { unidadesParametroPre:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, unidadParametroPre: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_UNIDAD_PARAMETRO_PRE:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					unidadParametroPre: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					unidadParametroPre: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					unidadParametroPre: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					unidadParametroPre: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_UNIDAD_PARAMETRO_PRE:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					unidadParametroPre: {}
				}
			})

		// CREATE unidadParametroPre.
		case CREAR_UNIDAD_PARAMETRO_PRE_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_UNIDAD_PARAMETRO_PRE_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	unidadesParametroPre: [ ...state.listar.unidadesParametroPre, action.payload.datoInsertado ]
				// }
			})

		case CREAR_UNIDAD_PARAMETRO_PRE_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_UNIDADES_PARAMETRO_PRE_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_UNIDADES_PARAMETRO_PRE_EXITO:
			return Object.assign({}, state, {
				listar: { unidadesParametroPre: action.payload.unidadesParametroPre, cargando: false, error: '' }
			})


		case LISTAR_UNIDADES_PARAMETRO_PRE_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, unidadesParametroPre:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_UNIDAD_PARAMETRO_PRE_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_UNIDAD_PARAMETRO_PRE_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadParametroPre: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_UNIDAD_PARAMETRO_PRE_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadParametroPre: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_UNIDAD_PARAMETRO_PRE:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadParametroPre: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_UNIDAD_PARAMETRO_PRE_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_UNIDAD_PARAMETRO_PRE_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_UNIDAD_PARAMETRO_PRE_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_UNIDAD_PARAMETRO_PRE_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					unidadParametroPre: action.payload
				}
			})

		case ELIMINAR_UNIDAD_PARAMETRO_PRE_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					unidadParametroPre: {}
				}
			})


		default: 
			return state
	}

}