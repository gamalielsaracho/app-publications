import {
	CERRAR_FORMULARIO_TIPO_EXAMEN,

	LISTAR_TIPOS_EXAMENES_REQUEST,
	LISTAR_TIPOS_EXAMENES_EXITO,
	LISTAR_TIPOS_EXAMENES_FALLO,

	ABRIR_FORMULARIO_CREAR_TIPO_EXAMEN,

	CREAR_TIPO_EXAMEN_REQUEST,
	CREAR_TIPO_EXAMEN_EXITO,
	CREAR_TIPO_EXAMEN_FALLO,

	MOSTRAR_TIPO_EXAMEN_REQUEST,
	MOSTRAR_TIPO_EXAMEN_EXITO,
	MOSTRAR_TIPO_EXAMEN_FALLO,

	CERRAR_MODAL_MOSTRAR_TIPO_EXAMEN,

	// Editar tipoExamen.
		// form to edit tipoExamen.
	ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_REQUEST,
	ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_EXITO,
	ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_FALLO,

	EDITAR_TIPO_EXAMEN_REQUEST,
	EDITAR_TIPO_EXAMEN_EXITO,
	EDITAR_TIPO_EXAMEN_FALLO,

	ELIMINAR_TIPO_EXAMEN_REQUEST,
	ELIMINAR_TIPO_EXAMEN_EXITO,
	ELIMINAR_TIPO_EXAMEN_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		tipoExamen: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { tiposExamenes: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, tipoExamen: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_TIPO_EXAMEN:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					tipoExamen: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					tipoExamen: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false },
				eliminar: INITIAL_STATE.eliminar

			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					tipoExamen: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					tipoExamen: null
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_TIPO_EXAMEN:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					tipoExamen: null
				}
			})

		// CREATE tipoExamen.
		case CREAR_TIPO_EXAMEN_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_TIPO_EXAMEN_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	tiposExamenes: [ ...state.listar.tiposExamenes, action.payload.datoInsertado ]
				// }
			})

		case CREAR_TIPO_EXAMEN_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_TIPOS_EXAMENES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_TIPOS_EXAMENES_EXITO:
			return Object.assign({}, state, {
				listar: { tiposExamenes: action.payload.tiposExamenes, cargando: false, error: '' }
			})

		case LISTAR_TIPOS_EXAMENES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, tiposExamenes: null, cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_TIPO_EXAMEN_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_TIPO_EXAMEN_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoExamen: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_TIPO_EXAMEN_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoExamen: null,
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})


		case CERRAR_MODAL_MOSTRAR_TIPO_EXAMEN:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tipoExamen: null,
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_TIPO_EXAMEN_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_TIPO_EXAMEN_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_TIPO_EXAMEN_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_TIPO_EXAMEN_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_TIPO_EXAMEN_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_TIPO_EXAMEN_FALLO:
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