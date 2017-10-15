import {
	CERRAR_FORMULARIO_DROGA,

	LISTAR_DROGAS_REQUEST,
	LISTAR_DROGAS_EXITO,
	LISTAR_DROGAS_FALLO,

	ABRIR_FORMULARIO_CREAR_DROGA,

	CREAR_DROGA_REQUEST,
	CREAR_DROGA_EXITO,
	CREAR_DROGA_FALLO,

	MOSTRAR_DROGA_REQUEST,
	MOSTRAR_DROGA_EXITO,
	MOSTRAR_DROGA_FALLO,

	CERRAR_MODAL_MOSTRAR_DROGA,

	// Editar droga.
		// form to edit droga.
	ABRIR_FORMULARIO_EDITAR_DROGA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DROGA_EXITO,
	ABRIR_FORMULARIO_EDITAR_DROGA_FALLO,

	EDITAR_DROGA_REQUEST,
	EDITAR_DROGA_EXITO,
	EDITAR_DROGA_FALLO,

	ELIMINAR_DROGA_REQUEST,
	ELIMINAR_DROGA_EXITO,
	ELIMINAR_DROGA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		droga: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { drogas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, droga: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_DROGA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					droga: null
				},
				mostrar: { abierto: false },
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_DROGA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					droga: null
				},
				mostrar: { abierto: false },
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_DROGA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					droga: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DROGA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					droga: null
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_DROGA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE droga.
		case CREAR_DROGA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_DROGA_EXITO:
			// console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
				// listar: { 
				// 	drogas: [ ...state.listar.drogas, action.payload.datoInsertado ]
				// }
			})

		case CREAR_DROGA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_DROGAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_DROGAS_EXITO:
			return Object.assign({}, state, {
				listar: { drogas: action.payload.drogas, cargando: false, error: '' }
			})

		case LISTAR_DROGAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, drogas:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_DROGA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_DROGA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					droga: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DROGA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					droga: null,
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_DROGA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					droga: null,
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_DROGA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_DROGA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_DROGA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_DROGA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_DROGA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_DROGA_FALLO:
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