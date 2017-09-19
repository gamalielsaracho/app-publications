import {
	CERRAR_FORMULARIO_MEDICAMENTO,

	LISTAR_MEDICAMENTOS_REQUEST,
	LISTAR_MEDICAMENTOS_EXITO,
	LISTAR_MEDICAMENTOS_FALLO,

	ABRIR_FORMULARIO_CREAR_MEDICAMENTO,

	CREAR_MEDICAMENTO_REQUEST,
	CREAR_MEDICAMENTO_EXITO,
	CREAR_MEDICAMENTO_FALLO,

	MOSTRAR_MEDICAMENTO_REQUEST,
	MOSTRAR_MEDICAMENTO_EXITO,
	MOSTRAR_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_MEDICAMENTO,

	// Editar medicamento.
		// form to edit medicamento.
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_FALLO,

	EDITAR_MEDICAMENTO_REQUEST,
	EDITAR_MEDICAMENTO_EXITO,
	EDITAR_MEDICAMENTO_FALLO,

	ELIMINAR_MEDICAMENTO_REQUEST,
	ELIMINAR_MEDICAMENTO_EXITO,
	ELIMINAR_MEDICAMENTO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		medicamento: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { medicamentos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, medicamento: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					medicamento: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					medicamento: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					medicamento: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					medicamento: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					medicamento: {}
				}
			})

		// CREATE medicamento.
		case CREAR_MEDICAMENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MEDICAMENTO_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	medicamentos: [ ...state.listar.medicamentos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_MEDICAMENTO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_MEDICAMENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_MEDICAMENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { medicamentos: action.payload.medicamentos, cargando: false, error: '' }
			})

		case LISTAR_MEDICAMENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, medicamentos:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamento: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamento: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_MEDICAMENTO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamento: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_MEDICAMENTO_FALLO:
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