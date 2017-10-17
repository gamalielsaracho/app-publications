import {

	LISTAR_MEDICAMENTOS_AGREGADOS_REQUEST,
	LISTAR_MEDICAMENTOS_AGREGADOS_EXITO,
	LISTAR_MEDICAMENTOS_AGREGADOS_FALLO,

	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_AGREGADO,

	CREAR_MEDICAMENTO_AGREGADO_REQUEST,
	CREAR_MEDICAMENTO_AGREGADO_EXITO,
	CREAR_MEDICAMENTO_AGREGADO_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO_AGREGADO,

	// Editar medicamentoAgregado.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_FALLO,

	EDITAR_MEDICAMENTO_AGREGADO_REQUEST,
	EDITAR_MEDICAMENTO_AGREGADO_EXITO,
	EDITAR_MEDICAMENTO_AGREGADO_FALLO,

	ELIMINAR_MEDICAMENTO_AGREGADO_REQUEST,
	ELIMINAR_MEDICAMENTO_AGREGADO_EXITO,
	ELIMINAR_MEDICAMENTO_AGREGADO_FALLO,

	// Mostrar Medicamento Agragado.
	MOSTRAR_MEDICAMENTO_AGREGADO_REQUEST,
	MOSTRAR_MEDICAMENTO_AGREGADO_EXITO,
	MOSTRAR_MEDICAMENTO_AGREGADO_FALLO,

	CERRAR_MODAL_MOSTRAR_MEDICAMENTO_AGREGADO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		medicamentoAgregado: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { medicamentosAgregados:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, medicamentoAgregado: null, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_MEDICAMENTO_AGREGADO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					medicamentoAgregado: null
				},
				mostrar: { abierto: false },

				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					medicamentoAgregado: null
				},
				mostrar: { abierto: false },
				
				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					medicamentoAgregado: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					medicamentoAgregado: null
				},
				mostrar: { abierto: false }
			})

		case CERRAR_FORMULARIO_MEDICAMENTO_AGREGADO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})
			

		// CREATE medicamentoAgregado.
		case CREAR_MEDICAMENTO_AGREGADO_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MEDICAMENTO_AGREGADO_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					medicamentosAgregados: [ ...state.listar.medicamentosAgregados, 
											 action.payload.datoInsertado ]
				},
				formulario: INITIAL_STATE.formulario
			})

			// console.log(state)

			return state

		case CREAR_MEDICAMENTO_AGREGADO_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_MEDICAMENTOS_AGREGADOS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})


		case LISTAR_MEDICAMENTOS_AGREGADOS_EXITO:
			return Object.assign({}, state, {
				listar: { medicamentosAgregados: action.payload.medicamentosAgregados, cargando: false, error: '' }
			})


		case LISTAR_MEDICAMENTOS_AGREGADOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, medicamentosAgregados:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_MEDICAMENTO_AGREGADO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_MEDICAMENTO_AGREGADO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamentoAgregado: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_MEDICAMENTO_AGREGADO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamentoAgregado: null,
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_MEDICAMENTO_AGREGADO:
			return Object.assign({}, state, {
				mostrar: INITIAL_STATE.mostrar
			})


		// EDITAR.
		case EDITAR_MEDICAMENTO_AGREGADO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MEDICAMENTO_AGREGADO_EXITO:

			let nuevaLista = state.listar.medicamentosAgregados.map((i) => {
				if(i.medicamentoXentregado.id_medicamentoXentregado == action.payload.datoActualizado.medicamentoXentregado.id_medicamentoXentregado) {

					i = Object.assign({}, i, {
						medicamentoXentregado: action.payload.datoActualizado.medicamentoXentregado
					})
				}

				return i
			})

			state = Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario,
				listar: {
					medicamentosAgregados: nuevaLista
				}
			})

			return state

		case EDITAR_MEDICAMENTO_AGREGADO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_MEDICAMENTO_AGREGADO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_MEDICAMENTO_AGREGADO_EXITO:
					
			let newList = state.listar.medicamentosAgregados.filter((i) => {
				return i.medicamentoXentregado.id_medicamentoXentregado != action.payload.id_medicamentoXentregado
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					medicamentosAgregados: newList
				}
			})

			return state

		case ELIMINAR_MEDICAMENTO_AGREGADO_FALLO:
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