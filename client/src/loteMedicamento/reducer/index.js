import {
	CERRAR_FORMULARIO_LOTE_MEDICAMENTO,

	LISTAR_LOTES_MEDICAMENTOS_REQUEST,
	LISTAR_LOTES_MEDICAMENTOS_EXITO,
	LISTAR_LOTES_MEDICAMENTOS_FALLO,

	ABRIR_FORMULARIO_CREAR_LOTE_MEDICAMENTO,

	CREAR_LOTE_MEDICAMENTO_REQUEST,
	CREAR_LOTE_MEDICAMENTO_EXITO,
	CREAR_LOTE_MEDICAMENTO_FALLO,

	MOSTRAR_LOTE_MEDICAMENTO_REQUEST,
	MOSTRAR_LOTE_MEDICAMENTO_EXITO,
	MOSTRAR_LOTE_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_LOTE_MEDICAMENTO,

	// Editar loteMedicamento.
		// form to edit loteMedicamento.
	ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_FALLO,

	EDITAR_LOTE_MEDICAMENTO_REQUEST,
	EDITAR_LOTE_MEDICAMENTO_EXITO,
	EDITAR_LOTE_MEDICAMENTO_FALLO,

	ELIMINAR_LOTE_MEDICAMENTO_REQUEST,
	ELIMINAR_LOTE_MEDICAMENTO_EXITO,
	ELIMINAR_LOTE_MEDICAMENTO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		loteMedicamento: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { lotesMedicamentos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, loteMedicamento: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_LOTE_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					loteMedicamento: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					loteMedicamento: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					loteMedicamento: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					loteMedicamento: null
				}
			})


		case CERRAR_FORMULARIO_LOTE_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					loteMedicamento: null
				}
			})

		// CREATE loteMedicamento.
		case CREAR_LOTE_MEDICAMENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_LOTE_MEDICAMENTO_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	lotesMedicamentos: [ ...state.listar.lotesMedicamentos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_LOTE_MEDICAMENTO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_LOTES_MEDICAMENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_LOTES_MEDICAMENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { lotesMedicamentos: action.payload.lotesMedicamentos, cargando: false, error: '' }
			})

		case LISTAR_LOTES_MEDICAMENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, lotesMedicamentos:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_LOTE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_LOTE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					loteMedicamento: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_LOTE_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					loteMedicamento: {},
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_LOTE_MEDICAMENTO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					loteMedicamento: null,
					error: ''
				}
			})


		// EDITAR.
		case EDITAR_LOTE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_LOTE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_LOTE_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_LOTE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_LOTE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_LOTE_MEDICAMENTO_FALLO:
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