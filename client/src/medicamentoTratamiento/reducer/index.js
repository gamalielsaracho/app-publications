import {
	CERRAR_FORMULARIO_MEDICAMENTO_TRATAMIENTO,

	LISTAR_MEDICAMENTOS_TRATAMIENTOS_REQUEST,
	LISTAR_MEDICAMENTOS_TRATAMIENTOS_EXITO,
	LISTAR_MEDICAMENTOS_TRATAMIENTOS_FALLO,

	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_TRATAMIENTO,

	CREAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	CREAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	CREAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	MOSTRAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	MOSTRAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	MOSTRAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_MEDICAMENTO_TRATAMIENTO,

	// Editar Departamento.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	ELIMINAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	ELIMINAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	ELIMINAR_MEDICAMENTO_TRATAMIENTO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		medicamentoTratamiento: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { medicamentosTratamiento:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, medicamentoTratamiento: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_MEDICAMENTO_TRATAMIENTO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					medicamentoTratamiento: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					medicamentoTratamiento: null
				},
				mostrar: INITIAL_STATE.mostrar,
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,

				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					medicamentoTratamiento: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					medicamentoTratamiento: null
				},
				mostrar: INITIAL_STATE.mostrar
			})


		case CERRAR_FORMULARIO_MEDICAMENTO_TRATAMIENTO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE.
		case CREAR_MEDICAMENTO_TRATAMIENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MEDICAMENTO_TRATAMIENTO_EXITO:

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
			})

		case CREAR_MEDICAMENTO_TRATAMIENTO_FALLO:
			console.log(action.payload)
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_MEDICAMENTOS_TRATAMIENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})


		case LISTAR_MEDICAMENTOS_TRATAMIENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { medicamentosTratamiento: action.payload.medicamentosTratamiento, cargando: false, error: '' }
			})


		case LISTAR_MEDICAMENTOS_TRATAMIENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, medicamentosTratamiento:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_MEDICAMENTO_TRATAMIENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: INITIAL_STATE.formulario,
				eliminar: INITIAL_STATE.eliminar,

				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case MOSTRAR_MEDICAMENTO_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamentoTratamiento: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_MEDICAMENTO_TRATAMIENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamentoTratamiento: null,
					error: action.payload,
					abierto: true
				},
				formulario: INITIAL_STATE.formulario
			})

		case CERRAR_MODAL_MOSTRAR_MEDICAMENTO_TRATAMIENTO:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_MEDICAMENTO_TRATAMIENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_MEDICAMENTO_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_MEDICAMENTO_TRATAMIENTO_FALLO:
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