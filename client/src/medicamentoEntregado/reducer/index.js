import {
	CERRAR_FORMULARIO_MEDICAMENTO_ENTREGADO,

	LISTAR_MEDICAMENTOS_ENTREGADOS_REQUEST,
	LISTAR_MEDICAMENTOS_ENTREGADOS_EXITO,
	LISTAR_MEDICAMENTOS_ENTREGADOS_FALLO,

	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_ENTREGADO,

	CREAR_MEDICAMENTO_ENTREGADO_REQUEST,
	CREAR_MEDICAMENTO_ENTREGADO_EXITO,
	CREAR_MEDICAMENTO_ENTREGADO_FALLO,

	MOSTRAR_MEDICAMENTO_ENTREGADO_REQUEST,
	MOSTRAR_MEDICAMENTO_ENTREGADO_EXITO,
	MOSTRAR_MEDICAMENTO_ENTREGADO_FALLO,


	// Editar.
		// form to edit .
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_FALLO,

	EDITAR_MEDICAMENTO_ENTREGADO_REQUEST,
	EDITAR_MEDICAMENTO_ENTREGADO_EXITO,
	EDITAR_MEDICAMENTO_ENTREGADO_FALLO,

	ELIMINAR_MEDICAMENTO_ENTREGADO_REQUEST,
	ELIMINAR_MEDICAMENTO_ENTREGADO_EXITO,
	ELIMINAR_MEDICAMENTO_ENTREGADO_FALLO,


	// Formulario Filtro.
	ABRIR_FORMULARIO_FILTRO,
	CERRAR_FORMULARIO_FILTRO,


	MEDICAMENTO_ENTREGADO_IMPRESION_REQUEST,
	MEDICAMENTO_ENTREGADO_IMPRESION_EXITO,
	MEDICAMENTO_ENTREGADO_IMPRESION_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		medicamentoEntregado: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { medicamentosEntregados:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, medicamentoEntregado: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' },
	formularioFiltro: { abierto: false },
	medicamentoEntregadoImpresion: { cargando: false, medicamentoEntregado: null, error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		// PARA IMPRIMIR UN COMPROBANTE DE MEDICAMENTOS ENTREGADOS POR ID.
		case MEDICAMENTO_ENTREGADO_IMPRESION_REQUEST:
			return Object.assign({}, state, {
				medicamentoEntregadoImpresion: { 
					cargando: true,
					medicamentoEntregado: null,
					error: ''
				}
			})

		case MEDICAMENTO_ENTREGADO_IMPRESION_EXITO:
			return Object.assign({}, state, {
				medicamentoEntregadoImpresion: {
					cargando: false,
					medicamentoEntregado: action.payload
				}
			})

		case MEDICAMENTO_ENTREGADO_IMPRESION_FALLO:
			return Object.assign({}, state, {
				medicamentoEntregadoImpresion: {
					cargando: false,
					medicamentoEntregado: null,
					error: action.payload
				}
			})


		// FILTROS.
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


		case ABRIR_FORMULARIO_CREAR_MEDICAMENTO_ENTREGADO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					medicamentoEntregado: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					medicamentoEntregado: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					medicamentoEntregado: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					medicamentoEntregado: null
				}
			})


		case CERRAR_FORMULARIO_MEDICAMENTO_ENTREGADO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})

		// CREATE MEDICAMENTO_ENTREGADO.
		case CREAR_MEDICAMENTO_ENTREGADO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MEDICAMENTO_ENTREGADO_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: INITIAL_STATE.formulario
				// listar: { 
				// 	medicamentosEntregados: [ ...state.listar.medicamentosEntregados, action.payload.datoInsertado ]
				// }
			})

		case CREAR_MEDICAMENTO_ENTREGADO_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_MEDICAMENTOS_ENTREGADOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				formularioFiltro: INITIAL_STATE.formularioFiltro,
				eliminar: INITIAL_STATE.eliminar
			})

		case LISTAR_MEDICAMENTOS_ENTREGADOS_EXITO:
			return Object.assign({}, state, {
				listar: { medicamentosEntregados: action.payload.medicamentosEntregados, cargando: false, error: '' }
			})


		case LISTAR_MEDICAMENTOS_ENTREGADOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, medicamentosEntregados:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_MEDICAMENTO_ENTREGADO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: INITIAL_STATE.formulario
			})

		case MOSTRAR_MEDICAMENTO_ENTREGADO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamentoEntregado: action.payload
				}
			})

		case MOSTRAR_MEDICAMENTO_ENTREGADO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					medicamentoEntregado: null,
					error: action.payload
				}
			})



		// EDITAR.
		case EDITAR_MEDICAMENTO_ENTREGADO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MEDICAMENTO_ENTREGADO_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario
			})

		case EDITAR_MEDICAMENTO_ENTREGADO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_MEDICAMENTO_ENTREGADO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_MEDICAMENTO_ENTREGADO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_MEDICAMENTO_ENTREGADO_FALLO:
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