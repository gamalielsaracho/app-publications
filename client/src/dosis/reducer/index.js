import {
	CERRAR_FORMULARIO_DISIS,

	LISTAR_DISIS_REQUEST,
	LISTAR_DISIS_EXITO,
	LISTAR_DISIS_FALLO,

	ABRIR_FORMULARIO_CREAR_DISIS,

	CREAR_DISIS_REQUEST,
	CREAR_DISIS_EXITO,
	CREAR_DISIS_FALLO,

	MOSTRAR_DISIS_REQUEST,
	MOSTRAR_DISIS_EXITO,
	MOSTRAR_DISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_DISIS,

	// Editar dosis.
		// form to edit dosis.
	ABRIR_FORMULARIO_EDITAR_DISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_DISIS_FALLO,

	EDITAR_DISIS_REQUEST,
	EDITAR_DISIS_EXITO,
	EDITAR_DISIS_FALLO,

	ELIMINAR_DISIS_REQUEST,
	ELIMINAR_DISIS_EXITO,
	ELIMINAR_DISIS_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		dosis: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { listaDosis:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, dosis: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_DISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					dosis: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DISIS_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					dosis: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DISIS_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					dosis: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DISIS_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					dosis: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_DISIS:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					dosis: {}
				}
			})

		// CREATE dosis.
		case CREAR_DISIS_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_DISIS_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	listaDosis: [ ...state.listar.listaDosis, action.payload.datoInsertado ]
				// }
			})

		case CREAR_DISIS_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_DISIS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_DISIS_EXITO:
			return Object.assign({}, state, {
				listar: { listaDosis: action.payload.listaDosis, cargando: false, error: '' }
			})

		case LISTAR_DISIS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, listaDosis:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_DISIS_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DISIS_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					dosis: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DISIS_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					dosis: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_DISIS:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					dosis: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_DISIS_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_DISIS_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_DISIS_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_DISIS_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_DISIS_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_DISIS_FALLO:
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