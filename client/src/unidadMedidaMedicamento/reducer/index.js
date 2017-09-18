import {
	CERRAR_FORMULARIO_UNIDAD_MEDICAMENTO,

	LISTAR_UNIDADES_MEDICAMENTOS_REQUEST,
	LISTAR_UNIDADES_MEDICAMENTOS_EXITO,
	LISTAR_UNIDADES_MEDICAMENTOS_FALLO,

	ABRIR_FORMULARIO_CREAR_UNIDAD_MEDICAMENTO,

	CREAR_UNIDAD_MEDICAMENTO_REQUEST,
	CREAR_UNIDAD_MEDICAMENTO_EXITO,
	CREAR_UNIDAD_MEDICAMENTO_FALLO,

	MOSTRAR_UNIDAD_MEDICAMENTO_REQUEST,
	MOSTRAR_UNIDAD_MEDICAMENTO_EXITO,
	MOSTRAR_UNIDAD_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_UNIDAD_MEDICAMENTO,

	// Editar unidadMedicamento.
		// form to edit unidadMedicamento.
	ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_FALLO,

	EDITAR_UNIDAD_MEDICAMENTO_REQUEST,
	EDITAR_UNIDAD_MEDICAMENTO_EXITO,
	EDITAR_UNIDAD_MEDICAMENTO_FALLO,

	ELIMINAR_UNIDAD_MEDICAMENTO_REQUEST,
	ELIMINAR_UNIDAD_MEDICAMENTO_EXITO,
	ELIMINAR_UNIDAD_MEDICAMENTO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		unidadMedicamento: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { unidadesMedicamentos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, unidadMedicamento: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_UNIDAD_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					unidadMedicamento: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					unidadMedicamento: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					unidadMedicamento: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					unidadMedicamento: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_UNIDAD_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					unidadMedicamento: {}
				}
			})

		// CREATE unidadMedicamento.
		case CREAR_UNIDAD_MEDICAMENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_UNIDAD_MEDICAMENTO_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	unidadesMedicamentos: [ ...state.listar.unidadesMedicamentos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_UNIDAD_MEDICAMENTO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_UNIDADES_MEDICAMENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_UNIDADES_MEDICAMENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { unidadesMedicamentos: action.payload.unidadesMedicamentos, cargando: false, error: '' }
			})

		case LISTAR_UNIDADES_MEDICAMENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, unidadesMedicamentos:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_UNIDAD_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_UNIDAD_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadMedicamento: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_UNIDAD_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadMedicamento: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_UNIDAD_MEDICAMENTO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					unidadMedicamento: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_UNIDAD_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_UNIDAD_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_UNIDAD_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_UNIDAD_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_UNIDAD_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_UNIDAD_MEDICAMENTO_FALLO:
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