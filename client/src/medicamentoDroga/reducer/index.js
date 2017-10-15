import {

	LISTAR_MEDICAMENTO_DROGAS_REQUEST,
	LISTAR_MEDICAMENTO_DROGAS_EXITO,
	LISTAR_MEDICAMENTO_DROGAS_FALLO,

	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_DROGA,

	CREAR_MEDICAMENTO_DROGA_REQUEST,
	CREAR_MEDICAMENTO_DROGA_EXITO,
	CREAR_MEDICAMENTO_DROGA_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO_DROGA,

	// Editar medicamentoDroga.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_FALLO,

	EDITAR_MEDICAMENTO_DROGA_REQUEST,
	EDITAR_MEDICAMENTO_DROGA_EXITO,
	EDITAR_MEDICAMENTO_DROGA_FALLO,

	ELIMINAR_MEDICAMENTO_DROGA_REQUEST,
	ELIMINAR_MEDICAMENTO_DROGA_EXITO,
	ELIMINAR_MEDICAMENTO_DROGA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		medicamentoDroga: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { medicamentoDrogas:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_MEDICAMENTO_DROGA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					medicamentoDroga: null
				},

				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})


		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					medicamentoDroga: null
				},
				
				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					medicamentoDroga: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					medicamentoDroga: null
				}
			})


		case CERRAR_FORMULARIO_MEDICAMENTO_DROGA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})
			

		// CREATE medicamentoDroga.
		case CREAR_MEDICAMENTO_DROGA_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_MEDICAMENTO_DROGA_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					medicamentoDrogas: [ ...state.listar.medicamentoDrogas, 
											 action.payload.datoInsertado ]
				},
				formulario: INITIAL_STATE.formulario
			})

			// console.log(state)

			return state

		case CREAR_MEDICAMENTO_DROGA_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_MEDICAMENTO_DROGAS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})

		case LISTAR_MEDICAMENTO_DROGAS_EXITO:
			return Object.assign({}, state, {
				listar: { medicamentoDrogas: action.payload.medicamentoDrogas, cargando: false, error: '' }
			})

		case LISTAR_MEDICAMENTO_DROGAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, medicamentoDrogas:[], cargando: false }
			})


		// EDITAR.
		case EDITAR_MEDICAMENTO_DROGA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_MEDICAMENTO_DROGA_EXITO:

			let nuevaLista = state.listar.medicamentoDrogas.map((i) => {
				if(i.medicamentoDroga.id_medicamentoDroga == action.payload.datoActualizado.medicamentoDroga.id_medicamentoDroga) {

					i = Object.assign({}, i, {
						medicamentoDroga: action.payload.datoActualizado.medicamentoDroga
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
					medicamentoDrogas: nuevaLista
				}
			})

			return state

		case EDITAR_MEDICAMENTO_DROGA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_MEDICAMENTO_DROGA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_MEDICAMENTO_DROGA_EXITO:
					
			let newList = state.listar.medicamentoDrogas.filter((i) => {
				return i.medicamentoDroga.id_medicamentoDroga != action.payload.id_medicamentoDroga
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					medicamentoDrogas: newList
				}
			})

			return state

		case ELIMINAR_MEDICAMENTO_DROGA_FALLO:
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