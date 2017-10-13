import {
	LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST,
	LISTAR_CONSULTA_DIAGNOSTICOS_EXITO,
	LISTAR_CONSULTA_DIAGNOSTICOS_FALLO,

	ABRIR_FORMULARIO_CREAR_CONSULTA_DIAGNOSTICO,

	CREAR_CONSULTA_DIAGNOSTICO_REQUEST,
	CREAR_CONSULTA_DIAGNOSTICO_EXITO,
	CREAR_CONSULTA_DIAGNOSTICO_FALLO,

	CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO,

	// Editar consultaDiagnostico.
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
		consultaDiagnostico: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { consultaDiagnosticos: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_CONSULTA_DIAGNOSTICO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					consultaDiagnostico: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					consultaDiagnostico: null
				},

				// Limpia los estados de error.
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					consultaDiagnostico: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					consultaDiagnostico: null
				}
			})

		case CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE consultaDiagnostico.
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
					consultaDiagnosticos: [ ...state.listar.consultaDiagnosticos, 
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
				listar: { consultaDiagnosticos: action.payload.consultaDiagnosticos, cargando: false, error: '' }
			})

		case LISTAR_CONSULTA_DIAGNOSTICOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, consultaDiagnosticos:[], cargando: false }
			})
		

		// EDITAR.
		case EDITAR_CONSULTA_DIAGNOSTICO_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CONSULTA_DIAGNOSTICO_EXITO:
			// console.log('Datos Actualizados.')
			// console.log(action.payload.datoActualizado)
			
			let nuevaLista = state.listar.consultaDiagnosticos.map((i) => {
				if(i.consultaDiagnostico.id_consultaDiagnostico == action.payload.datoActualizado.consultaDiagnostico.id_consultaDiagnostico) {
					// console.log('i')
					// console.log(i)

					i = Object.assign({}, i, {
						consultaDiagnostico: action.payload.datoActualizado.consultaDiagnostico
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
					consultaDiagnosticos: nuevaLista
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
					
			let newList = state.listar.consultaDiagnosticos.filter((i) => {
				return i.consultaDiagnostico.id_consultaDiagnostico != action.payload.id_consultaDiagnostico
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					consultaDiagnosticos: newList
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