import {
	CERRAR_FORMULARIO_DEPARTAMENTO,

	LISTAR_DEPARTAMENTOS_REQUEST,
	LISTAR_DEPARTAMENTOS_EXITO,
	LISTAR_DEPARTAMENTOS_FALLO,

	ABRIR_FORMULARIO_CREAR_DEPARTAMENTO,

	CREAR_DEPARTAMENTO_REQUEST,
	CREAR_DEPARTAMENTO_EXITO,
	CREAR_DEPARTAMENTO_FALLO,

	MOSTRAR_DEPARTAMENTO_REQUEST,
	MOSTRAR_DEPARTAMENTO_EXITO,
	MOSTRAR_DEPARTAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_DEPARTAMENTO,

	// Editar Departamento.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_FALLO,

	EDITAR_DEPARTAMENTO_REQUEST,
	EDITAR_DEPARTAMENTO_EXITO,
	EDITAR_DEPARTAMENTO_FALLO,

	ELIMINAR_DEPARTAMENTO_REQUEST,
	ELIMINAR_DEPARTAMENTO_EXITO,
	ELIMINAR_DEPARTAMENTO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		departamento: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { departamentos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, departamento: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_DEPARTAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					departamento: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					departamento: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					departamento: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					departamento: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_DEPARTAMENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					departamento: {}
				}
			})

		// CREATE.
		case CREAR_DEPARTAMENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_DEPARTAMENTO_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	departamentos: [ ...state.listar.departamentos, action.payload.datoInsertado ]
				// }
			})

		case CREAR_DEPARTAMENTO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_DEPARTAMENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})


		case LISTAR_DEPARTAMENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { departamentos: action.payload.departamentos, cargando: false, error: '' }
			})


		case LISTAR_DEPARTAMENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, departamentos:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_DEPARTAMENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DEPARTAMENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					departamento: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_DEPARTAMENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					departamento: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_DEPARTAMENTO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					departamento: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_DEPARTAMENTO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_DEPARTAMENTO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_DEPARTAMENTO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_DEPARTAMENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_DEPARTAMENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					departamento: action.payload
				}
			})

		case ELIMINAR_DEPARTAMENTO_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					departamento: {}
				}
			})


		default: 
			return state
	}

}