import {
	CERRAR_FORMULARIO_TIPO_CONSUMO,

	LISTAR_TIPOS_CONSUMOS_REQUEST,
	LISTAR_TIPOS_CONSUMOS_EXITO,
	LISTAR_TIPOS_CONSUMOS_FALLO,

	ABRIR_FORMULARIO_CREAR_TIPO_CONSUMO,

	CREAR_TIPO_CONSUMO_REQUEST,
	CREAR_TIPO_CONSUMO_EXITO,
	CREAR_TIPO_CONSUMO_FALLO,

	MOSTRAR_TIPO_CONSUMO_REQUEST,
	MOSTRAR_TIPO_CONSUMO_EXITO,
	MOSTRAR_TIPO_CONSUMO_FALLO,

	CERRAR_MODAL_MOSTRAR_TIPO_CONSUMO,

	// Editar tipoConsumo.
		// form to edit tipoConsumo.
	ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_EXITO,
	ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_FALLO,

	EDITAR_TIPO_CONSUMO_REQUEST,
	EDITAR_TIPO_CONSUMO_EXITO,
	EDITAR_TIPO_CONSUMO_FALLO,

	ELIMINAR_TIPO_CONSUMO_REQUEST,
	ELIMINAR_TIPO_CONSUMO_EXITO,
	ELIMINAR_TIPO_CONSUMO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		tipoConsumo: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { tiposConsumos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, tipoConsumo: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_TIPO_CONSUMO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					tipoConsumo: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					tipoConsumo: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					tipoConsumo: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					tipoConsumo: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_TIPO_CONSUMO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE tipoConsumo.
		case CREAR_TIPO_CONSUMO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_TIPO_CONSUMO_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	tiposConsumos: [ ...state.listar.tiposConsumos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_TIPO_CONSUMO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_TIPOS_CONSUMOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_TIPOS_CONSUMOS_EXITO:
			return Object.assign({}, state, {
				listar: { tiposConsumos: action.payload.tiposConsumos, cargando: false, error: '' }
			})

		case LISTAR_TIPOS_CONSUMOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, tiposConsumos:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_TIPO_CONSUMO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_CONSUMO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoConsumo: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_CONSUMO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoConsumo: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_TIPO_CONSUMO:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_TIPO_CONSUMO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_TIPO_CONSUMO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_TIPO_CONSUMO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_TIPO_CONSUMO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_TIPO_CONSUMO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_TIPO_CONSUMO_FALLO:
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