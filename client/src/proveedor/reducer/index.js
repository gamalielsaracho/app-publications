import {
	CERRAR_FORMULARIO_PROVEEDOR,

	LISTAR_PROVEEDORES_REQUEST,
	LISTAR_PROVEEDORES_EXITO,
	LISTAR_PROVEEDORES_FALLO,

	ABRIR_FORMULARIO_CREAR_PROVEEDOR,

	CREAR_PROVEEDOR_REQUEST,
	CREAR_PROVEEDOR_EXITO,
	CREAR_PROVEEDOR_FALLO,

	MOSTRAR_PROVEEDOR_REQUEST,
	MOSTRAR_PROVEEDOR_EXITO,
	MOSTRAR_PROVEEDOR_FALLO,

	CERRAR_MODAL_MOSTRAR_PROVEEDOR,

	// Editar proveedor.
		// form to edit proveedor.
	ABRIR_FORMULARIO_EDITAR_PROVEEDOR_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PROVEEDOR_EXITO,
	ABRIR_FORMULARIO_EDITAR_PROVEEDOR_FALLO,

	EDITAR_PROVEEDOR_REQUEST,
	EDITAR_PROVEEDOR_EXITO,
	EDITAR_PROVEEDOR_FALLO,

	ELIMINAR_PROVEEDOR_REQUEST,
	ELIMINAR_PROVEEDOR_EXITO,
	ELIMINAR_PROVEEDOR_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		proveedor: {}
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { proveedores:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, proveedor: {}, error: '', abierto: false },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PROVEEDOR:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					proveedor: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PROVEEDOR_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					proveedor: {}
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PROVEEDOR_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					proveedor: action.payload
				},
				mostrar: { abierto: false }
			})

		case ABRIR_FORMULARIO_EDITAR_PROVEEDOR_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					proveedor: {}
				},
				mostrar: { abierto: false }
			})


		case CERRAR_FORMULARIO_PROVEEDOR:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					proveedor: {}
				}
			})

		// CREATE proveedor.
		case CREAR_PROVEEDOR_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_PROVEEDOR_EXITO:
			console.log(action.payload.datoInsertado)

			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	proveedores: [ ...state.listar.proveedores, action.payload.datoInsertado ]
				// }
			})

		case CREAR_PROVEEDOR_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_PROVEEDORES_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_PROVEEDORES_EXITO:
			return Object.assign({}, state, {
				listar: { proveedores: action.payload.proveedores, cargando: false, error: '' }
			})

		case LISTAR_PROVEEDORES_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, proveedores:[], cargando: false }
			})

		// MOSTRAR.
		case MOSTRAR_PROVEEDOR_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true, abierto: true },
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PROVEEDOR_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					proveedor: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PROVEEDOR_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					proveedor: {},
					error: action.payload,
					abierto: true
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case CERRAR_MODAL_MOSTRAR_PROVEEDOR:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					proveedor: {},
					error: '',
					abierto: false
				}
			})


		// EDITAR.
		case EDITAR_PROVEEDOR_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PROVEEDOR_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PROVEEDOR_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_PROVEEDOR_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true }
			})

		case ELIMINAR_PROVEEDOR_EXITO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				}
			})

		case ELIMINAR_PROVEEDOR_FALLO:
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