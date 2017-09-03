import {
	CERRAR_FORMULARIO_CITA,

	LISTAR_CITAS_REQUEST,
	LISTAR_CITAS_EXITO,
	LISTAR_CITAS_FALLO,

	ABRIR_FORMULARIO_CREAR_CITA,

	CREAR_CITA_REQUEST,
	CREAR_CITA_EXITO,
	CREAR_CITA_FALLO,

	MOSTRAR_CITA_REQUEST,
	MOSTRAR_CITA_EXITO,
	MOSTRAR_CITA_FALLO,

	CERRAR_MODAL_MOSTRAR_CITA,

	// Editar cita.
		// form to edit a cita.
	ABRIR_FORMULARIO_EDITAR_CITA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CITA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CITA_FALLO,

	EDITAR_CITA_REQUEST,
	EDITAR_CITA_EXITO,
	EDITAR_CITA_FALLO,

	ELIMINAR_CITA_REQUEST,
	ELIMINAR_CITA_EXITO,
	ELIMINAR_CITA_FALLO,

	ACTUALIZAR_FORMULARIO_FILTRO,

	MOSTRAR_CITA_AGREGAR_PRECONSULTA_REQUEST,
	MOSTRAR_CITA_AGREGAR_PRECONSULTA_EXITO,
	MOSTRAR_CITA_AGREGAR_PRECONSULTA_FALLO,

	CERRAR_MOSTRAR_CITA_AGREGAR_PRECONSULTA
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		cita: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	filtro: {
		id_personal: ''
	},
	listar: { citas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, cita: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' },
	mostrarCitaAgregarPreConsulta: {
		cargando: false, cita: {}, error: '', abierto: false
	}
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case MOSTRAR_CITA_AGREGAR_PRECONSULTA_REQUEST:
			return Object.assign({}, state, {
				mostrarCitaAgregarPreConsulta: {
					cargando: true,
					error: '',
					abierto: true,
					cita: {}
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case MOSTRAR_CITA_AGREGAR_PRECONSULTA_EXITO:
			return Object.assign({}, state, {
				mostrarCitaAgregarPreConsulta: {
					cargando: false,
					error: '',
					abierto: true,
					cita: action.payload
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case MOSTRAR_CITA_AGREGAR_PRECONSULTA_FALLO:
			return Object.assign({}, state, {
				mostrarCitaAgregarPreConsulta: {
					cargando: false,
					error: action.payload,
					abierto: true,
					cita: {}
				},
				mostrar: INITIAL_STATE.mostrar
			})

		case CERRAR_MOSTRAR_CITA_AGREGAR_PRECONSULTA:
			return Object.assign({}, state, {
				mostrarCitaAgregarPreConsulta: INITIAL_STATE.mostrarCitaAgregarPreConsulta,
				mostrar: INITIAL_STATE.mostrar
			})

		case ACTUALIZAR_FORMULARIO_FILTRO:
			const { valores } = action
			
			// console.log(valores)
			state = Object.assign({}, state, {
				filtro: { 
					id_personal: valores.id_personal
				}
			})

			// console.log(state.filtro)

			return state

		case ABRIR_FORMULARIO_CREAR_CITA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					cita: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CITA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					cita: {}
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CITA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					cita: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_CITA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					cita: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_CITA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					cita: {}
				}
			})

		// CREATE.
		case CREAR_CITA_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CITA_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	citas: [ ...state.listar.citas, action.payload.datoInsertado ]
				// }
			})

		case CREAR_CITA_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_CITAS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },

				// ESTO ES IMPORTANTE, PORQUE CUANDO PONGO DENTRO 
				// DE LISTAR_CITAS_EXITO, CUANDO QUIERO REDIRECCIONAR A
				// UNA CITA EN ESPECÍFICO, LIMPIA EL ESTADO DE mostrar
				// Y NO MUESTRA LA CITA.
				mostrar: INITIAL_STATE.mostrar
			})

		case LISTAR_CITAS_EXITO:
			return Object.assign({}, state, {
				listar: { citas: action.payload.citas, cargando: false, error: '' },
				mostrarCitaAgregarPreConsulta: INITIAL_STATE.mostrarCitaAgregarPreConsulta
			})

			// console.log(state)

			// return state

		case LISTAR_CITAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, citas:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_CITA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true, cita:{} },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CITA_EXITO:
			// console.log('LA CITA ESSSSSSS->>>')

			// console.log(action.payload)

			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					cita: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_CITA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					cita: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_CITA:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					cita: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_CITA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CITA_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_CITA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_CITA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_CITA_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: '',
					cita: action.payload
				}
			})

		case ELIMINAR_CITA_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload,
					cita: {}
				}
			})


		default: 
			return state
	}

}