import {
	MOSTRAR_TRATAMIENTO_IDCONSULTA_REQUEST,
	MOSTRAR_TRATAMIENTO_IDCONSULTA_EXITO,
	MOSTRAR_TRATAMIENTO_IDCONSULTA_FALLO,

	CREAR_TRATAMIENTO_REQUEST,
	CREAR_TRATAMIENTO_EXITO,
	CREAR_TRATAMIENTO_FALLO,

	MOSTRAR_TRATAMIENTO_REQUEST,
	MOSTRAR_TRATAMIENTO_EXITO,
	MOSTRAR_TRATAMIENTO_FALLO,

	ELIMINAR_TRATAMIENTO_REQUEST,
	ELIMINAR_TRATAMIENTO_EXITO,
	ELIMINAR_TRATAMIENTO_FALLO,


	LIMPIAR_MENSAJE_ERROR_TRATAMIENTO,

	LISTAR_TRATAMIENTOS_REQUEST,
	LISTAR_TRATAMIENTOS_EXITO,
	LISTAR_TRATAMIENTOS_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	listar: { tratamientos:[], cargando: false, error: '' },
	crear: { mensaje: '', cargando: false, error:'' },
	mostrarTratamientoIdConsulta: { tratamiento: null, cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, tratamiento: null, error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		
		// LISTAR.
		case LISTAR_TRATAMIENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})


		case LISTAR_TRATAMIENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { tratamientos: action.payload.tratamientos, cargando: false, error: '' }
			})


		case LISTAR_TRATAMIENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { 
					error: action.payload,
					tratamientos:[],
					cargando: false 
				}
			})


		case LIMPIAR_MENSAJE_ERROR_TRATAMIENTO:
			state = Object.assign({}, state, {
				crear: { error:'' },
				eliminar: { error:'' }
			})

			return state


		// MOSTRAR TRATAMIENTO BY ID_CONSULTA.
		case MOSTRAR_TRATAMIENTO_IDCONSULTA_REQUEST:
			return Object.assign({}, state, {
				mostrarTratamientoIdConsulta: { cargando: true, error: '' },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_TRATAMIENTO_IDCONSULTA_EXITO:
			return Object.assign({}, state, {
				mostrarTratamientoIdConsulta: { 
					tratamiento: action.payload.tratamiento, 
					cargando: false, 
					error: ''
				}
			})


		case MOSTRAR_TRATAMIENTO_IDCONSULTA_FALLO:
			return Object.assign({}, state, {
				mostrarTratamientoIdConsulta: { 
					error: action.payload, 
					tratamiento: null,
					cargando: false
				}
			})


		// CREATE RATAMIENTO.
		case CREAR_TRATAMIENTO_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				crear: {
					mensaje: action.payload.mensaje,
					cargando: false
				}
			})

		case CREAR_TRATAMIENTO_FALLO:
			return state = Object.assign({}, state, {
				crear: {
					mensaje: '',
					cargando: false,
					error: action.payload
				}
			})


		// MOSTRAR.
		case MOSTRAR_TRATAMIENTO_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					error: '',
					tratamiento: action.payload
				}
			})

		case MOSTRAR_TRATAMIENTO_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					tratamiento: null,
					error: action.payload
				}
			})

			
		// ELIMINAR.
		case ELIMINAR_TRATAMIENTO_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})


		case ELIMINAR_TRATAMIENTO_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_TRATAMIENTO_FALLO:
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