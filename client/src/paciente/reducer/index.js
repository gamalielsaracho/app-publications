import {
	CERRAR_FORMULARIO_PACIENTE,

	LISTAR_PACIENTES_REQUEST,
	LISTAR_PACIENTES_EXITO,
	LISTAR_PACIENTES_FALLO,

	ABRIR_FORMULARIO_CREAR_PACIENTE,

	CREAR_PACIENTE_REQUEST,
	CREAR_PACIENTE_EXITO,
	CREAR_PACIENTE_FALLO,

	MOSTRAR_PACIENTE_REQUEST,
	MOSTRAR_PACIENTE_EXITO,
	MOSTRAR_PACIENTE_FALLO,

	CERRAR_MODAL_MOSTRAR_PACIENTE,

	// Editar paciente.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_PACIENTE_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_EXITO,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_FALLO,

	EDITAR_PACIENTE_REQUEST,
	EDITAR_PACIENTE_EXITO,
	EDITAR_PACIENTE_FALLO,

	ELIMINAR_PACIENTE_REQUEST,
	ELIMINAR_PACIENTE_EXITO,
	ELIMINAR_PACIENTE_FALLO,


	ABRIR_FORMULARIO_FILTRO,
	CERRAR_FORMULARIO_FILTRO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		paciente: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { pacientes:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, paciente: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' },
	formularioFiltro: { abierto: false }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		case ABRIR_FORMULARIO_FILTRO:
			state = Object.assign({}, state, {
				formularioFiltro: {
					abierto: true
				}
			})

			return state

		case CERRAR_FORMULARIO_FILTRO:
			state = Object.assign({}, state, {
				formularioFiltro: {
					abierto: false
				}
			})

			return state


		case ABRIR_FORMULARIO_CREAR_PACIENTE:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					paciente: null
				},
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PACIENTE_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					paciente: null
				},
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PACIENTE_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					paciente: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_PACIENTE_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					paciente: null
				}
			})


		case CERRAR_FORMULARIO_PACIENTE:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario,

				// Limpia si es que anteriormente ocurió un error.
				crear: { error: '' },
				editar: { error: '' }
			})

		// CREATE paciente.
		case CREAR_PACIENTE_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PACIENTE_EXITO:
			// console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	pacientes: [ ...state.listar.pacientes, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PACIENTE_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PACIENTES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar,
				formularioFiltro: INITIAL_STATE.formularioFiltro
			})


		case LISTAR_PACIENTES_EXITO:
			return Object.assign({}, state, {
				listar: { pacientes: action.payload.pacientes, cargando: false, error: '' }
			})


		case LISTAR_PACIENTES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, pacientes:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PACIENTE_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_PACIENTE_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					paciente: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PACIENTE_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					paciente: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_PACIENTE:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_PACIENTE_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PACIENTE_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PACIENTE_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PACIENTE_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PACIENTE_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PACIENTE_FALLO:
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