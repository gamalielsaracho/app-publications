import {
	ABRIR_FORMULARIO_CREAR_REFERENCIA,

	LISTAR_REFERENCIAS_REQUEST,
	LISTAR_REFERENCIAS_EXITO,
	LISTAR_REFERENCIAS_FALLO,

	CREAR_REFERENCIA_REQUEST,
	CREAR_REFERENCIA_EXITO,
	CREAR_REFERENCIA_FALLO,

	CERRAR_FORMULARIO_REFERENCIA,

	MOSTRAR_REFERENCIA_REQUEST,
	MOSTRAR_REFERENCIA_EXITO,
	MOSTRAR_REFERENCIA_FALLO,

	// Editar referencia.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_REFERENCIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_REFERENCIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_REFERENCIA_FALLO,

	EDITAR_REFERENCIA_REQUEST,
	EDITAR_REFERENCIA_EXITO,
	EDITAR_REFERENCIA_FALLO,

	ELIMINAR_REFERENCIA_REQUEST,
	ELIMINAR_REFERENCIA_EXITO,
	ELIMINAR_REFERENCIA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		referencia: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { referencias:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, referencia: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_REFERENCIA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					referencia: null
				}
			})

		case ABRIR_FORMULARIO_EDITAR_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					referencia: null
				}
			})

		case ABRIR_FORMULARIO_EDITAR_REFERENCIA_EXITO:
			console.log(action.payload)
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					referencia: action.payload
				},

				// Limpia los estados de error.
				editar: { error: '' },
				crear: { error: '' }
			})

		case ABRIR_FORMULARIO_EDITAR_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					referencia: null
				}
			})

		
		case CERRAR_FORMULARIO_REFERENCIA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE referencia.
		case CREAR_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_REFERENCIA_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					referencias: [ ...state.listar.referencias, 
											 action.payload.datoInsertado ]
				},
				formulario: { abirtoCrear: false }
			})

			// console.log(state)

			return state

		case CREAR_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_REFERENCIAS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})

		case LISTAR_REFERENCIAS_EXITO:
			return Object.assign({}, state, {
				listar: { referencias: action.payload.referencias, cargando: false, error: '' }
			})

		case LISTAR_REFERENCIAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, referencias:[], cargando: false }
			})


		// MOSTRAR.
		case MOSTRAR_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_REFERENCIA_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					referencia: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					referencia: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})


		// EDITAR.
		case EDITAR_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_REFERENCIA_EXITO:
			// console.log('Datos Actualizados.')
			// console.log(action.payload.datoActualizado)
			
			let nuevaLista = state.listar.referencias.map((i) => {
				if(i.id_referencia == action.payload.datoActualizado.id_referencia) {
					// console.log('i')
					// console.log(i)

					i = Object.assign({}, i, action.payload.datoActualizado)
				}

				return i
			})

			console.log('nuevaLista')
			console.log(nuevaLista)

			state = Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false },
				listar: {
					referencias: nuevaLista
				}
			})

			return state

		case EDITAR_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_REFERENCIA_EXITO:
					
			let newList = state.listar.referencias.filter((i) => {
				return i.id_referencia != action.payload.id_referencia
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					referencias: newList
				}
			})

			return state

		case ELIMINAR_REFERENCIA_FALLO:
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