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
		departamento: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { departamentos:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, departamento: null, error: '', abierto: false },
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
					departamento: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					departamento: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
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
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					departamento: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_DEPARTAMENTO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE.
		case CREAR_DEPARTAMENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_DEPARTAMENTO_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
			})

		case CREAR_DEPARTAMENTO_FALLO:
			console.log(action.payload)
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_DEPARTAMENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
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
				formulario: INITIAL_STATE.formulario,
				eliminar: INITIAL_STATE.eliminar,

				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case MOSTRAR_DEPARTAMENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					departamento: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_DEPARTAMENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					departamento: null,
					error: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case CERRAR_MODAL_MOSTRAR_DEPARTAMENTO:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
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
				formulario: INITIAL_STATE.formulario
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
					error: ''
				}
			})

		case ELIMINAR_DEPARTAMENTO_FALLO:
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