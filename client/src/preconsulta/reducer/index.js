import {
	CERRAR_FORMULARIO_PRECONSULTA,

	LISTAR_PRECONSULTAS_REQUEST,
	LISTAR_PRECONSULTAS_EXITO,
	LISTAR_PRECONSULTAS_FALLO,

	ABRIR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA,

	LISTAR_PRECONSULTAS_FECHA_DIA_REQUEST,
	LISTAR_PRECONSULTAS_FECHA_DIA_EXITO,
	LISTAR_PRECONSULTAS_FECHA_DIA_FALLO,

	CERRAR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA,


	ABRIR_FORMULARIO_CREAR_PRECONSULTA,

	CREAR_PRECONSULTA_REQUEST,
	CREAR_PRECONSULTA_EXITO,
	CREAR_PRECONSULTA_FALLO,

	MOSTRAR_PRECONSULTA_REQUEST,
	MOSTRAR_PRECONSULTA_EXITO,
	MOSTRAR_PRECONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_PRECONSULTA,

	// Editar preConsulta.
		// form to edit preConsulta.
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_FALLO,

	EDITAR_PRECONSULTA_REQUEST,
	EDITAR_PRECONSULTA_EXITO,
	EDITAR_PRECONSULTA_FALLO,

	ELIMINAR_PRECONSULTA_REQUEST,
	ELIMINAR_PRECONSULTA_EXITO,
	ELIMINAR_PRECONSULTA_FALLO,

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
		preConsulta: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { preConsultas:[], cargando: false, error: '' },
	modalAgregarPreConsulta: { abierto: false },
	listarPreConsultasFechaDia: { preConsultas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, preConsulta: null, error: '' },
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


		case ABRIR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA:
			return Object.assign({}, state, {
				modalAgregarPreConsulta: { abierto: true }
			})


		case LISTAR_PRECONSULTAS_FECHA_DIA_REQUEST:
			return Object.assign({}, state, {
				listarPreConsultasFechaDia: { cargando: true, error: '' }
			})

		case LISTAR_PRECONSULTAS_FECHA_DIA_EXITO:
			return Object.assign({}, state, {
				listarPreConsultasFechaDia: { 
					preConsultas: action.payload.preConsultas, cargando: false, error: '' 
				}
			})

		case LISTAR_PRECONSULTAS_FECHA_DIA_FALLO:
			return Object.assign({}, state, {
				listarPreConsultasFechaDia: { error: action.payload, preConsultas:[], cargando: false }
			})

		case CERRAR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA:
			return Object.assign({}, state, {
				modalAgregarPreConsulta: { abierto: false }
			})
		// .............

		case ABRIR_FORMULARIO_CREAR_PRECONSULTA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					preConsulta: null
				}
			})


		case ABRIR_FORMULARIO_EDITAR_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					preConsulta: null
				}
			})

		case ABRIR_FORMULARIO_EDITAR_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					preConsulta: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					preConsulta: null
				}
			})


		case CERRAR_FORMULARIO_PRECONSULTA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE preConsulta.
		case CREAR_PRECONSULTA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PRECONSULTA_EXITO:
			// console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	preConsultas: [ ...state.listar.preConsultas, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PRECONSULTA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_PRECONSULTAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				formularioFiltro: INITIAL_STATE.formularioFiltro
			})

		case LISTAR_PRECONSULTAS_EXITO:
			return Object.assign({}, state, {
				listar: { preConsultas: action.payload.preConsultas, cargando: false, error: '' }
			})

		case LISTAR_PRECONSULTAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, preConsultas:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					preConsulta: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					preConsulta: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})


		case CERRAR_MODAL_MOSTRAR_PRECONSULTA:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PRECONSULTA_FALLO:
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