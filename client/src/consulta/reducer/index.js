import {
	CERRAR_FORMULARIO_CONSULTA,

	LISTAR_CONSULTAS_REQUEST,
	LISTAR_CONSULTAS_EXITO,
	LISTAR_CONSULTAS_FALLO,

	MOSTRAR_ESTADISTICA_REQUEST,
	MOSTRAR_ESTADISTICA_EXITO,
	MOSTRAR_ESTADISTICA_FALLO,

	ABRIR_FORMULARIO_CREAR_CONSULTA,

	CREAR_CONSULTA_REQUEST,
	CREAR_CONSULTA_EXITO,
	CREAR_CONSULTA_FALLO,

	MOSTRAR_CONSULTA_REQUEST,
	MOSTRAR_CONSULTA_EXITO,
	MOSTRAR_CONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_CONSULTA,

	// Editar consulta.
		// form to edit consulta.
	ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO,

	EDITAR_CONSULTA_REQUEST,
	EDITAR_CONSULTA_EXITO,
	EDITAR_CONSULTA_FALLO,

	ELIMINAR_CONSULTA_REQUEST,
	ELIMINAR_CONSULTA_EXITO,
	ELIMINAR_CONSULTA_FALLO,

	// ..
	LIMPIAR_MENSAJE_ERROR_CONSULTA,

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
		consulta: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { consultas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, consulta: null, error: '' },
	mostrarValoresEstadisticos: { 
		cargando: false, valoresEstadisticos: null, error: ''
	},
	editar: { cargando: false, mensaje: '', error: '' },

	formularioFiltro: { abierto: false }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		
		case LIMPIAR_MENSAJE_ERROR_CONSULTA:
			state = Object.assign({}, state, {
				crear: { error:'' },
				eliminar: { error:'' },
				editar: { error:'' }
			})

			return state


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

		case ABRIR_FORMULARIO_CREAR_CONSULTA:
			state = Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					consulta: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

			return state

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST:
			state = Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					consulta: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

			return state

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO:
			state = Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					consulta: action.payload
				}
			})

			return state

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO:
			state = Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					consulta: null
				}
			})

			return state

		case CERRAR_FORMULARIO_CONSULTA:
			state = Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					consulta: null
				}
			})

			return state

		// CREATE consulta.
		case CREAR_CONSULTA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CONSULTA_EXITO:
			// console.log(state)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	consultas: [ ...state.listar.consultas, action.payload.datoInsertado ]
				// }
			})

		case CREAR_CONSULTA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_CONSULTAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				mostrar: INITIAL_STATE.mostrar,
				eliminar: INITIAL_STATE.eliminar,
				formularioFiltro: INITIAL_STATE.formularioFiltro
			})

		case LISTAR_CONSULTAS_EXITO:
			return Object.assign({}, state, {
				listar: { consultas: action.payload.consultas, cargando: false, error: '' }
			})

		case LISTAR_CONSULTAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, consultas:[], cargando: false }
			})


		// Mostrar estadística.
		case MOSTRAR_ESTADISTICA_REQUEST:
			return Object.assign({}, state, {
				mostrarValoresEstadisticos: { cargando: true }
			})

		case MOSTRAR_ESTADISTICA_EXITO:
			return Object.assign({}, state, {
				mostrarValoresEstadisticos: {
					cargando: false,
					valoresEstadisticos: action.payload
				}
			})

		case MOSTRAR_ESTADISTICA_FALLO:
			return Object.assign({}, state, {
				mostrarValoresEstadisticos: {
					cargando: false,
					valoresEstadisticos: null,
					error: action.payload
				}
			})


		// MOSTRAR.
		case MOSTRAR_CONSULTA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_CONSULTA_EXITO:
			// console.log(action.payload)
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					consulta: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CONSULTA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					consulta: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_CONSULTA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					consulta: null,
					error: ''
				}
			})


		// EDITAR.
		case EDITAR_CONSULTA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CONSULTA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_CONSULTA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_CONSULTA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_CONSULTA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					mensaje: action.payload.mensaje
				}
			})

		case ELIMINAR_CONSULTA_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					mensaje: ''
				}
			})


		default: 
			return state
	}

}