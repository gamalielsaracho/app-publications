import {
	CERRAR_FORMULARIO_DIAGNOSTICO,

	LISTAR_DIAGNOSTICOS_REQUEST,
	LISTAR_DIAGNOSTICOS_EXITO,
	LISTAR_DIAGNOSTICOS_FALLO,

	ABRIR_FORMULARIO_CREAR_DIAGNOSTICO,

	CREAR_DIAGNOSTICO_REQUEST,
	CREAR_DIAGNOSTICO_EXITO,
	CREAR_DIAGNOSTICO_FALLO,

	MOSTRAR_DIAGNOSTICO_REQUEST,
	MOSTRAR_DIAGNOSTICO_EXITO,
	MOSTRAR_DIAGNOSTICO_FALLO,

	CERRAR_MODAL_MOSTRAR_DIAGNOSTICO,

	// Editar diagnostico.
		// form to edit diagnostico.
	ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_EXITO,
	ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_FALLO,

	EDITAR_DIAGNOSTICO_REQUEST,
	EDITAR_DIAGNOSTICO_EXITO,
	EDITAR_DIAGNOSTICO_FALLO,

	ELIMINAR_DIAGNOSTICO_REQUEST,
	ELIMINAR_DIAGNOSTICO_EXITO,
	ELIMINAR_DIAGNOSTICO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		diagnostico: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { diagnosticos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, diagnostico: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_DIAGNOSTICO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					diagnostico: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					diagnostico: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					diagnostico: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					diagnostico: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_DIAGNOSTICO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					diagnostico: {}
				}
			})

		// CREATE diagnostico.
		case CREAR_DIAGNOSTICO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_DIAGNOSTICO_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	diagnosticos: [ ...state.listar.diagnosticos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_DIAGNOSTICO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_DIAGNOSTICOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_DIAGNOSTICOS_EXITO:
			return Object.assign({}, state, {
				listar: { diagnosticos: action.payload.diagnosticos, cargando: false, error: '' }
			})


		case LISTAR_DIAGNOSTICOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, diagnosticos:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DIAGNOSTICO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					diagnostico: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					diagnostico: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_DIAGNOSTICO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					diagnostico: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_DIAGNOSTICO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_DIAGNOSTICO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					diagnostico: action.payload
				}
			})

		case ELIMINAR_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					diagnostico: {}
				}
			})


		default: 
			return state
	}

}