import {
	CERRAR_FORMULARIO_AREA,

	LISTAR_AREAS_REQUEST,
	LISTAR_AREAS_EXITO,
	LISTAR_AREAS_FALLO,

	ABRIR_FORMULARIO_CREAR_AREA,

	CREAR_AREA_REQUEST,
	CREAR_AREA_EXITO,
	CREAR_AREA_FALLO,

	MOSTRAR_AREA_REQUEST,
	MOSTRAR_AREA_EXITO,
	MOSTRAR_AREA_FALLO,

	CERRAR_MODAL_MOSTRAR_AREA,

	// Editar area.
		// form to edit a area.
	ABRIR_FORMULARIO_EDITAR_AREA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_AREA_EXITO,
	ABRIR_FORMULARIO_EDITAR_AREA_FALLO,

	EDITAR_AREA_REQUEST,
	EDITAR_AREA_EXITO,
	EDITAR_AREA_FALLO,

	ELIMINAR_AREA_REQUEST,
	ELIMINAR_AREA_EXITO,
	ELIMINAR_AREA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		area: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { areas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, area: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_AREA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					area: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_AREA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					area: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_AREA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					area: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_AREA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					area: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_AREA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE area.
		case CREAR_AREA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_AREA_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
			})

		case CREAR_AREA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_AREAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})


		case LISTAR_AREAS_EXITO:
			return Object.assign({}, state, {
				listar: { areas: action.payload.areas, cargando: false, error: '' }
			})


		case LISTAR_AREAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, areas:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_AREA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: INITIAL_STATE.formulario,
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_AREA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					area: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_AREA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					area: null,
					error: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case CERRAR_MODAL_MOSTRAR_AREA:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_AREA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_AREA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_AREA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_AREA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_AREA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_AREA_FALLO:
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