import {
	CERRAR_FORMULARIO_NOMBRE_MEDICAMENTO,

	LISTAR_NOMBRES_MEDICAMENTOS_REQUEST,
	LISTAR_NOMBRES_MEDICAMENTOS_EXITO,
	LISTAR_NOMBRES_MEDICAMENTOS_FALLO,

	ABRIR_FORMULARIO_CREAR_NOMBRE_MEDICAMENTO,

	CREAR_NOMBRE_MEDICAMENTO_REQUEST,
	CREAR_NOMBRE_MEDICAMENTO_EXITO,
	CREAR_NOMBRE_MEDICAMENTO_FALLO,

	MOSTRAR_NOMBRE_MEDICAMENTO_REQUEST,
	MOSTRAR_NOMBRE_MEDICAMENTO_EXITO,
	MOSTRAR_NOMBRE_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_NOMBRE_MEDICAMENTO,

	// Editar nombreMedicamento.
		// form to edit nombreMedicamento.
	ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_FALLO,

	EDITAR_NOMBRE_MEDICAMENTO_REQUEST,
	EDITAR_NOMBRE_MEDICAMENTO_EXITO,
	EDITAR_NOMBRE_MEDICAMENTO_FALLO,

	ELIMINAR_NOMBRE_MEDICAMENTO_REQUEST,
	ELIMINAR_NOMBRE_MEDICAMENTO_EXITO,
	ELIMINAR_NOMBRE_MEDICAMENTO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		nombreMedicamento: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { nombresMedicamentos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, nombreMedicamento: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_NOMBRE_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					nombreMedicamento: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					nombreMedicamento: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					nombreMedicamento: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					nombreMedicamento: {}
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_NOMBRE_MEDICAMENTO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE nombreMedicamento.
		case CREAR_NOMBRE_MEDICAMENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_NOMBRE_MEDICAMENTO_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
				// listar: { 
				// 	nombresMedicamentos: [ ...state.listar.nombresMedicamentos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_NOMBRE_MEDICAMENTO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_NOMBRES_MEDICAMENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_NOMBRES_MEDICAMENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { nombresMedicamentos: action.payload.nombresMedicamentos, cargando: false, error: '' }
			})


		case LISTAR_NOMBRES_MEDICAMENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, nombresMedicamentos:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_NOMBRE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_NOMBRE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					nombreMedicamento: action.payload,
					abierto: true
				},
				formulario: { abirtoCrear: false, abirtoEditar: false }
			})

		case MOSTRAR_NOMBRE_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					nombreMedicamento: {},
					error: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case CERRAR_MODAL_MOSTRAR_NOMBRE_MEDICAMENTO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					nombreMedicamento: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_NOMBRE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_NOMBRE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_NOMBRE_MEDICAMENTO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_NOMBRE_MEDICAMENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_NOMBRE_MEDICAMENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_NOMBRE_MEDICAMENTO_FALLO:
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