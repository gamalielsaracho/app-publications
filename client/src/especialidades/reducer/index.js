import {
	CERRAR_FORMULARIO_ESPECIALIDAD,

	LISTAR_ESPECIALIDADES_REQUEST,
	LISTAR_ESPECIALIDADES_EXITO,
	LISTAR_ESPECIALIDADES_FALLO,

	ABRIR_FORMULARIO_CREAR_ESPECIALIDAD,

	CREAR_ESPECIALIDAD_REQUEST,
	CREAR_ESPECIALIDAD_EXITO,
	CREAR_ESPECIALIDAD_FALLO,

	MOSTRAR_ESPECIALIDAD_REQUEST,
	MOSTRAR_ESPECIALIDAD_EXITO,
	MOSTRAR_ESPECIALIDAD_FALLO,

	CERRAR_MODAL_MOSTRAR_ESPECIALIDAD,

	// Editar Especialidad.
		// form to edit especialidad.
	ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_EXITO,
	ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_FALLO,

	EDITAR_ESPECIALIDAD_REQUEST,
	EDITAR_ESPECIALIDAD_EXITO,
	EDITAR_ESPECIALIDAD_FALLO,

	ELIMINAR_ESPECIALIDAD_REQUEST,
	ELIMINAR_ESPECIALIDAD_EXITO,
	ELIMINAR_ESPECIALIDAD_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		especialidad: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { especialidades:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, especialidad: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_ESPECIALIDAD:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					especialidad: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					especialidad: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					especialidad: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					especialidad: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_ESPECIALIDAD:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					especialidad: {}
				}
			})

		// CREATE especialidad.
		case CREAR_ESPECIALIDAD_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ESPECIALIDAD_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	especialidades: [ ...state.listar.especialidades, action.payload.datoInsertado ]
				// }
			})

		case CREAR_ESPECIALIDAD_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_ESPECIALIDADES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})


		case LISTAR_ESPECIALIDADES_EXITO:
			return Object.assign({}, state, {
				listar: { especialidades: action.payload.especialidades, cargando: false, error: '' }
			})


		case LISTAR_ESPECIALIDADES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, especialidades:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_ESPECIALIDAD_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_ESPECIALIDAD_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					especialidad: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_ESPECIALIDAD_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					especialidad: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_ESPECIALIDAD:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					especialidad: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_ESPECIALIDAD_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_ESPECIALIDAD_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_ESPECIALIDAD_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_ESPECIALIDAD_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_ESPECIALIDAD_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					especialidad: action.payload
				}
			})

		case ELIMINAR_ESPECIALIDAD_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					especialidad: {}
				}
			})


		default: 
			return state
	}

}