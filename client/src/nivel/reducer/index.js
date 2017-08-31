import {
	CERRAR_FORMULARIO_NIVEL,

	LISTAR_NIVELES_REQUEST,
	LISTAR_NIVELES_EXITO,
	LISTAR_NIVELES_FALLO,

	ABRIR_FORMULARIO_CREAR_NIVEL,

	CREAR_NIVEL_REQUEST,
	CREAR_NIVEL_EXITO,
	CREAR_NIVEL_FALLO,

	MOSTRAR_NIVEL_REQUEST,
	MOSTRAR_NIVEL_EXITO,
	MOSTRAR_NIVEL_FALLO,

	CERRAR_MODAL_MOSTRAR_NIVEL,

	// Editar nivel.
		// form to edit a nivel.
	ABRIR_FORMULARIO_EDITAR_NIVEL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_NIVEL_EXITO,
	ABRIR_FORMULARIO_EDITAR_NIVEL_FALLO,

	EDITAR_NIVEL_REQUEST,
	EDITAR_NIVEL_EXITO,
	EDITAR_NIVEL_FALLO,

	ELIMINAR_NIVEL_REQUEST,
	ELIMINAR_NIVEL_EXITO,
	ELIMINAR_NIVEL_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		nivel: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { niveles:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, nivel: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_NIVEL:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					nivel: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_NIVEL_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					nivel: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_NIVEL_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					nivel: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_NIVEL_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					nivel: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_NIVEL:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					nivel: {}
				}
			})

		// CREATE nivel.
		case CREAR_NIVEL_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_NIVEL_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	niveles: [ ...state.listar.niveles, action.payload.datoInsertado ]
				// }
			})

		case CREAR_NIVEL_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_NIVELES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_NIVELES_EXITO:
			return Object.assign({}, state, {
				listar: { niveles: action.payload.niveles, cargando: false, error: '' }
			})


		case LISTAR_NIVELES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, niveles:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_NIVEL_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_NIVEL_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					nivel: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_NIVEL_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					nivel: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_NIVEL:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					nivel: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_NIVEL_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_NIVEL_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_NIVEL_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_NIVEL_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_NIVEL_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					nivel: action.payload
				}
			})

		case ELIMINAR_NIVEL_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					nivel: {}
				}
			})


		default: 
			return state
	}

}