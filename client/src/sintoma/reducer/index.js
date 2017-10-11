import {
	CERRAR_FORMULARIO_SINTOMA,

	LISTAR_SINTOMAS_REQUEST,
	LISTAR_SINTOMAS_EXITO,
	LISTAR_SINTOMAS_FALLO,

	ABRIR_FORMULARIO_CREAR_SINTOMA,

	CREAR_SINTOMA_REQUEST,
	CREAR_SINTOMA_EXITO,
	CREAR_SINTOMA_FALLO,

	MOSTRAR_SINTOMA_REQUEST,
	MOSTRAR_SINTOMA_EXITO,
	MOSTRAR_SINTOMA_FALLO,


	CERRAR_MODAL_MOSTRAR_SINTOMA,

	// Editar sintoma.
		// form to edit sintoma.
	ABRIR_FORMULARIO_EDITAR_SINTOMA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_SINTOMA_EXITO,
	ABRIR_FORMULARIO_EDITAR_SINTOMA_FALLO,

	EDITAR_SINTOMA_REQUEST,
	EDITAR_SINTOMA_EXITO,
	EDITAR_SINTOMA_FALLO,

	ELIMINAR_SINTOMA_REQUEST,
	ELIMINAR_SINTOMA_EXITO,
	ELIMINAR_SINTOMA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		sintoma: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { sintomas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, sintoma: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_SINTOMA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					sintoma: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: INITIAL_STATE.mostrar
			})


		case ABRIR_FORMULARIO_EDITAR_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					sintoma: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_SINTOMA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					sintoma: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_SINTOMA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					sintoma: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_SINTOMA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE sintoma.
		case CREAR_SINTOMA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_SINTOMA_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
			})

		case CREAR_SINTOMA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_SINTOMAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_SINTOMAS_EXITO:
			return Object.assign({}, state, {
				listar: { sintomas: action.payload.sintomas, cargando: false, error: '' }
			})

		case LISTAR_SINTOMAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, sintomas:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_SINTOMA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					sintoma: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_SINTOMA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					sintoma: null,
					error: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})


		case CERRAR_MODAL_MOSTRAR_SINTOMA:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_SINTOMA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_SINTOMA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_SINTOMA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_SINTOMA_FALLO:
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