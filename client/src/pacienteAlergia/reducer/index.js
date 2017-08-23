import {
	CERRAR_FORMULARIO_PACIENTE_ALERGIA,

	LISTAR_PACIENTE_ALERGIAS_REQUEST,
	LISTAR_PACIENTE_ALERGIAS_EXITO,
	LISTAR_PACIENTE_ALERGIAS_FALLO,

	ABRIR_FORMULARIO_CREAR_PACIENTE_ALERGIA,

	CREAR_PACIENTE_ALERGIA_REQUEST,
	CREAR_PACIENTE_ALERGIA_EXITO,
	CREAR_PACIENTE_ALERGIA_FALLO,

	MOSTRAR_PACIENTE_ALERGIA_REQUEST,
	MOSTRAR_PACIENTE_ALERGIA_EXITO,
	MOSTRAR_PACIENTE_ALERGIA_FALLO,

	CERRAR_MODAL_MOSTRAR_PACIENTE_ALERGIA,

	// Editar alergia.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_FALLO,

	EDITAR_PACIENTE_ALERGIA_REQUEST,
	EDITAR_PACIENTE_ALERGIA_EXITO,
	EDITAR_PACIENTE_ALERGIA_FALLO,

	ELIMINAR_PACIENTE_ALERGIA_REQUEST,
	ELIMINAR_PACIENTE_ALERGIA_EXITO,
	ELIMINAR_PACIENTE_ALERGIA_FALLO
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
		case ABRIR_FORMULARIO_CREAR_PACIENTE_ALERGIA:
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

				// Limpia los estados de error.
				editar: { error: '' },
				crear: { error: '' }
			})

		case ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					alergia: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_EXITO:
			console.log(action.payload)
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					alergia: action.payload
				},
				mostrar: { abierto: false },

				// Limpia los estados de error.
				editar: { error: '' },
				crear: { error: '' }
			})

		case ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_FALLO:
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


		case CERRAR_FORMULARIO_PACIENTE_ALERGIA:
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
		case CREAR_PACIENTE_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PACIENTE_ALERGIA_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	alergias: [ ...state.listar.alergias, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PACIENTE_ALERGIA_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PACIENTE_ALERGIAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})


		case LISTAR_PACIENTE_ALERGIAS_EXITO:
			return Object.assign({}, state, {
				listar: { alergias: action.payload.alergias, cargando: false, error: '' }
			})


		case LISTAR_PACIENTE_ALERGIAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, alergias:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PACIENTE_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PACIENTE_ALERGIA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					alergia: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PACIENTE_ALERGIA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					alergia: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_PACIENTE_ALERGIA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					alergia: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_PACIENTE_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PACIENTE_ALERGIA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PACIENTE_ALERGIA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PACIENTE_ALERGIA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PACIENTE_ALERGIA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					alergia: action.payload
				}
			})

		case ELIMINAR_PACIENTE_ALERGIA_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					alergia: {}
				}
			})


		default: 
			return state
	}

}