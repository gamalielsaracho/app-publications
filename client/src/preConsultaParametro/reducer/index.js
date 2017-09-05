import {

	LISTAR_PRECONSULTA_PARAMETROS_REQUEST,
	LISTAR_PRECONSULTA_PARAMETROS_EXITO,
	LISTAR_PRECONSULTA_PARAMETROS_FALLO,

	CREAR_PRECONSULTA_PARAMETRO_REQUEST,
	CREAR_PRECONSULTA_PARAMETRO_EXITO,
	CREAR_PRECONSULTA_PARAMETRO_FALLO,

	CERRAR_FORMULARIO_PRECONSULTA_PARAMETRO,

	MOSTRAR_PRECONSULTA_PARAMETRO_REQUEST,
	MOSTRAR_PRECONSULTA_PARAMETRO_EXITO,
	MOSTRAR_PRECONSULTA_PARAMETRO_FALLO,

	CERRAR_MODAL_MOSTRAR_PRECONSULTA_PARAMETRO,

	// Editar parametroPreConsulta.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_FALLO,

	EDITAR_PRECONSULTA_PARAMETRO_REQUEST,
	EDITAR_PRECONSULTA_PARAMETRO_EXITO,
	EDITAR_PRECONSULTA_PARAMETRO_FALLO,

	ELIMINAR_PRECONSULTA_PARAMETRO_REQUEST,
	ELIMINAR_PRECONSULTA_PARAMETRO_EXITO,
	ELIMINAR_PRECONSULTA_PARAMETRO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		parametroPreConsulta: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { parametrosPreConsulta:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, parametroPreConsulta: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		case ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					parametroPreConsulta: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_EXITO:
			console.log(action.payload)
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					parametroPreConsulta: action.payload
				},
				mostrar: { abierto: false },

				// Limpia los estados de error.
				editar: { error: '' },
				crear: { error: '' }
			})

		case ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					parametroPreConsulta: {}
				},
				mostrar: { abierto: false }
			})

		case CERRAR_FORMULARIO_PRECONSULTA_PARAMETRO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario,
				mostrar: { abierto: false }
			})

		// CREATE parametroPreConsulta.
		case CREAR_PRECONSULTA_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PRECONSULTA_PARAMETRO_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	parametrosPreConsulta: [ ...state.listar.parametrosPreConsulta, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PRECONSULTA_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PRECONSULTA_PARAMETROS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})


		case LISTAR_PRECONSULTA_PARAMETROS_EXITO:
			return Object.assign({}, state, {
				listar: { parametrosPreConsulta: action.payload.parametrosPreConsulta, cargando: false, error: '' }
			})


		case LISTAR_PRECONSULTA_PARAMETROS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, parametrosPreConsulta:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PRECONSULTA_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PRECONSULTA_PARAMETRO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroPreConsulta: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PRECONSULTA_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroPreConsulta: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_PRECONSULTA_PARAMETRO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					parametroPreConsulta: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_PRECONSULTA_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PRECONSULTA_PARAMETRO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PRECONSULTA_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PRECONSULTA_PARAMETRO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_PRECONSULTA_PARAMETRO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					parametroPreConsulta: action.payload
				}
			})

		case ELIMINAR_PRECONSULTA_PARAMETRO_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					parametroPreConsulta: {}
				}
			})


		default: 
			return state
	}

}