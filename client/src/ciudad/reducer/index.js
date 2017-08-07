import {
	CERRAR_FORMULARIO_CIUDAD,

	LISTAR_CIUDADES_REQUEST,
	LISTAR_CIUDADES_EXITO,
	LISTAR_CIUDADES_FALLO,

	ABRIR_FORMULARIO_CREAR_CIUDAD,

	CREAR_CIUDAD_REQUEST,
	CREAR_CIUDAD_EXITO,
	CREAR_CIUDAD_FALLO,

	MOSTRAR_CIUDAD_REQUEST,
	MOSTRAR_CIUDAD_EXITO,
	MOSTRAR_CIUDAD_FALLO,

	CERRAR_MODAL_MOSTRAR_CIUDAD,

	// Editar Rol.
		// form to edit a rol.
	ABRIR_FORMULARIO_EDITAR_CIUDAD_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CIUDAD_EXITO,
	ABRIR_FORMULARIO_EDITAR_CIUDAD_FALLO,

	EDITAR_CIUDAD_REQUEST,
	EDITAR_CIUDAD_EXITO,
	EDITAR_CIUDAD_FALLO,

	ELIMINAR_CIUDAD_REQUEST,
	ELIMINAR_CIUDAD_EXITO,
	ELIMINAR_CIUDAD_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		ciudad: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { ciudades:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, ciudad: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_CIUDAD:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					ciudad: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CIUDAD_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					ciudad: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CIUDAD_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					ciudad: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CIUDAD_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					ciudad: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_CIUDAD:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					ciudad: {}
				}
			})

		// CREATE.
		case CREAR_CIUDAD_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CIUDAD_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	ciudades: [ ...state.listar.ciudades, action.payload.datoInsertado ]
				// }
			})

		case CREAR_CIUDAD_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_CIUDADES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})


		case LISTAR_CIUDADES_EXITO:
			return Object.assign({}, state, {
				listar: { ciudades: action.payload.ciudades, cargando: false, error: '' }
			})


		case LISTAR_CIUDADES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, ciudades:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_CIUDAD_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CIUDAD_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					ciudad: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CIUDAD_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					ciudad: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_CIUDAD:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					ciudad: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_CIUDAD_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CIUDAD_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_CIUDAD_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_CIUDAD_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_CIUDAD_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					ciudad: action.payload
				}
			})

		case ELIMINAR_CIUDAD_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					ciudad: {}
				}
			})


		default: 
			return state
	}

}