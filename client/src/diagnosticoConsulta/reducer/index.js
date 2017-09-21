import {
	LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST,
	LISTAR_CONSULTA_DIAGNOSTICOS_EXITO,
	LISTAR_CONSULTA_DIAGNOSTICOS_FALLO,

	CREAR_CONSULTA_DIAGNOSTICO_REQUEST,
	CREAR_CONSULTA_DIAGNOSTICO_EXITO,
	CREAR_CONSULTA_DIAGNOSTICO_FALLO,

	CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO,

	MOSTRAR_CONSULTA_DIAGNOSTICO_REQUEST,
	MOSTRAR_CONSULTA_DIAGNOSTICO_EXITO,
	MOSTRAR_CONSULTA_DIAGNOSTICO_FALLO,

	// Editar diagnosticoConsulta.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_FALLO,

	EDITAR_CONSULTA_DIAGNOSTICO_REQUEST,
	EDITAR_CONSULTA_DIAGNOSTICO_EXITO,
	EDITAR_CONSULTA_DIAGNOSTICO_FALLO,

	ELIMINAR_CONSULTA_DIAGNOSTICO_REQUEST,
	ELIMINAR_CONSULTA_DIAGNOSTICO_EXITO,
	ELIMINAR_CONSULTA_DIAGNOSTICO_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		diagnosticoConsulta: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { diagnosticosConsulta: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, diagnosticoConsulta: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					diagnosticoConsulta: null
				}
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_EXITO:
			console.log(action.payload)
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					diagnosticoConsulta: action.payload
				},

				// Limpia los estados de error.
				editar: { error: '' },
				crear: { error: '' }
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					diagnosticoConsulta: null
				}
			})

		case CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE diagnosticoConsulta.
		case CREAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CONSULTA_DIAGNOSTICO_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					diagnosticosConsulta: [ ...state.listar.diagnosticosConsulta, 
											 action.payload.datoInsertado ]
				},
				formulario: { abirtoCrear: false }
			})

			// console.log(state)

			return state

		case CREAR_CONSULTA_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})

		case LISTAR_CONSULTA_DIAGNOSTICOS_EXITO:
			return Object.assign({}, state, {
				listar: { diagnosticosConsulta: action.payload.diagnosticosConsulta, cargando: false, error: '' }
			})

		case LISTAR_CONSULTA_DIAGNOSTICOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, diagnosticosConsulta:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CONSULTA_DIAGNOSTICO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					diagnosticoConsulta: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CONSULTA_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					diagnosticoConsulta: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})


		// EDITAR.
		case EDITAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CONSULTA_DIAGNOSTICO_EXITO:
			// console.log('Datos Actualizados.')
			// console.log(action.payload.datoActualizado)
			
			let nuevaLista = state.listar.diagnosticosConsulta.map((i) => {
				if(i.diagnosticoConsulta.id_diagnosticoConsulta == action.payload.datoActualizado.diagnosticoConsulta.id_diagnosticoConsulta) {
					// console.log('i')
					// console.log(i)

					i = Object.assign({}, i, {
						diagnosticoConsulta: action.payload.datoActualizado.diagnosticoConsulta
					})
				}

				return i
			})

			// console.log('nuevaLista')
			// console.log(nuevaLista)

			state = Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false },
				listar: {
					diagnosticosConsulta: nuevaLista
				}
			})

			return state

		case EDITAR_CONSULTA_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_CONSULTA_DIAGNOSTICO_EXITO:
					
			let newList = state.listar.diagnosticosConsulta.filter((i) => {
				return i.diagnosticoConsulta.id_diagnosticoConsulta != action.payload.id_diagnosticoConsulta
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					diagnosticosConsulta: newList
				}
			})

			return state

		case ELIMINAR_CONSULTA_DIAGNOSTICO_FALLO:
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