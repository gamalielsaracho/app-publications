import {
	CERRAR_FORMULARIO_ALERGIA,

	LISTAR_ALERGIAS_REQUEST,
	LISTAR_ALERGIAS_EXITO,
	LISTAR_ALERGIAS_FALLO,

	ABRIR_FORMULARIO_CREAR_ALERGIA,

	CREAR_ALERGIA_REQUEST,
	CREAR_ALERGIA_EXITO,
	CREAR_ALERGIA_FALLO,

	MOSTRAR_ALERGIA_REQUEST,
	MOSTRAR_ALERGIA_EXITO,
	MOSTRAR_ALERGIA_FALLO,

	CERRAR_MODAL_MOSTRAR_ALERGIA,

	// Editar Alergia.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_ALERGIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ALERGIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_ALERGIA_FALLO,

	EDITAR_ALERGIA_REQUEST,
	EDITAR_ALERGIA_EXITO,
	EDITAR_ALERGIA_FALLO,

	ELIMINAR_ALERGIA_REQUEST,
	ELIMINAR_ALERGIA_EXITO,
	ELIMINAR_ALERGIA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		alergia: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { alergias:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, alergia: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_ALERGIA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					alergia: {}
				},
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					alergia: {}
				},
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_ALERGIA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					alergia: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ALERGIA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					alergia: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_ALERGIA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					alergia: {}
				}
			})

		// CREATE alergia.
		case CREAR_ALERGIA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ALERGIA_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	alergias: [ ...state.listar.alergias, action.payload.datoInsertado ]
				// }
			})

		case CREAR_ALERGIA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_ALERGIAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})


		case LISTAR_ALERGIAS_EXITO:
			return Object.assign({}, state, {
				listar: { alergias: action.payload.alergias, cargando: false, error: '' }
			})


		case LISTAR_ALERGIAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, alergias:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_ALERGIA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					alergia: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_ALERGIA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					alergia: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_ALERGIA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					alergia: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_ALERGIA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_ALERGIA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_ALERGIA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_ALERGIA_FALLO:
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