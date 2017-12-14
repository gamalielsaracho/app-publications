import {
	REGISTRAR_PERSONAL_REQUEST,
	REGISTRAR_PERSONAL_EXITO,
	REGISTRAR_PERSONAL_FALLO,

	AUTENTICAR_PERSONAL_REQUEST,
	AUTENTICAR_PERSONAL_EXITO,
	AUTENTICAR_PERSONAL_FALLO,

	VERIFICAR_TOKEN_PERSONAL_EXITO,
	VERIFICAR_TOKEN_PERSONAL_FALLO,

	SALIR_PERSONAL,

	LISTAR_PERSONALES_REQUEST,
	LISTAR_PERSONALES_EXITO,
	LISTAR_PERSONALES_FALLO,


	ACTUALIZAR_FORMULARIO_FILTRO,


	ABRIR_FORMULARIO_EDITAR_PERSONAL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PERSONAL_EXITO,
	ABRIR_FORMULARIO_EDITAR_PERSONAL_FALLO,

	EDITAR_PERSONAL_REQUEST,
	EDITAR_PERSONAL_EXITO,
	EDITAR_PERSONAL_FALLO,

	ABRIR_FORMULARIO_CREAR_PERSONAL,

	CERRAR_FORMULARIO_PERSONAL,

	MOSTRAR_PERSONAL_REQUEST,
	MOSTRAR_PERSONAL_EXITO,
	MOSTRAR_PERSONAL_FALLO

} from '../actions/types'

const INITIAL_STATE = {
	filtro: { 
		nombres: '', apellidos: '', correo: ''  
	},

	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		personal: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { personales:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, personal: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' },


	// listar: { personales:[], cargando: false, error: '' },
	// listarMedicos: { personales:[], cargando: false, error: '' },
	// registro:{ mensaje:'', error:'', cargando:false },
	// mostrar: { mensaje:'', error:'', cargando:false, personal: {} },
	// actualizar:{ mensaje:'', error:'', cargando:false },

	autenticacion: { error: '', cargando: false },
	usuarioEstado: {
		// cargando: false,
		error: '',
		datosToken: {},
		autenticado: false
	}
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_PERSONAL:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					personal: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})


		case ABRIR_FORMULARIO_EDITAR_PERSONAL_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					personal: null
				},
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				eliminar: INITIAL_STATE.eliminar
			})

		case ABRIR_FORMULARIO_EDITAR_PERSONAL_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					personal: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_PERSONAL_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					personal: null
				}
			})


		case CERRAR_FORMULARIO_PERSONAL:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					personal: null
				}
			})




		case REGISTRAR_PERSONAL_REQUEST:
			return state = Object.assign({}, state, {
				crear: { cargando: true }
			})

		case REGISTRAR_PERSONAL_EXITO:
			return Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje,
				},
				formulario: { abirtoCrear: false }
				// listar: { 
				// 	niveles: [ ...state.listar.niveles, action.payload.datoInsertado ]
				// }
			})

		case REGISTRAR_PERSONAL_FALLO:
			return state = Object.assign({}, state, {
				crear: { error: action.payload }
			})


			// Autenticación de Usuario.
		

		case AUTENTICAR_PERSONAL_REQUEST:
			return Object.assign({}, state, { 
				autenticacion:{ cargando:true }
			})

		case AUTENTICAR_PERSONAL_EXITO:
			return Object.assign({}, state, { 
				autenticacion:{ 
					cargando:false,
					error: '' }
			})

		case AUTENTICAR_PERSONAL_FALLO:
			return Object.assign({}, state, { 
				autenticacion:{ cargando:false, error: action.payload }
			})


		case VERIFICAR_TOKEN_PERSONAL_EXITO:
			return Object.assign({}, state, { 
				usuarioEstado:{
					// cargando: false,
					error: '',
					datosToken: action.payload,
					autenticado: true 
				} 
			}) 

		case VERIFICAR_TOKEN_PERSONAL_FALLO:
			return Object.assign({}, state, { 
				usuarioEstado:{
					// cargando: false,
					datosToken: {},
					autenticado: false, 
					error: action.payload.error
				}
			})


		case SALIR_PERSONAL:
			return Object.assign({}, state, { 
				usuarioEstado:{ 
					cargando:false,
					datosToken: {},
					error: '', 
					autenticado: false 
				}
			})


		case LISTAR_PERSONALES_REQUEST:
			return state = Object.assign({}, state, {
				listar: { cargando: true }
			})

		case LISTAR_PERSONALES_EXITO:
			return state = Object.assign({}, state, {
				listar: {
					personales: action.payload.personales, 
					cargando:false, 
					error: ''
				}
			})

		case LISTAR_PERSONALES_FALLO:
			return state = Object.assign({}, state, {
				listar: {
					personales: [],
					cargando: false,
					error: action.payload					
				}
			})


			// Listar todos los Médicos.
				
			

		case ACTUALIZAR_FORMULARIO_FILTRO:
			const { valores } = action

			return state = Object.assign({}, state, {
				filtro: {
					nombres: valores.nombres,
					apellidos: valores.apellidos,
					correo: valores.correo 
				}
			})


		// EDITAR.
		case EDITAR_PERSONAL_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_PERSONAL_EXITO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false }
			})

		case EDITAR_PERSONAL_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})


		// MOSTRAR.
		case MOSTRAR_PERSONAL_REQUEST:
			return Object.assign({}, state, {
				mostrar: { cargando: true },
				formulario: { abirtoEditar: false, abirtoCrear: false },
				eliminar: INITIAL_STATE.eliminar
			})

		case MOSTRAR_PERSONAL_EXITO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					personal: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})

		case MOSTRAR_PERSONAL_FALLO:
			return Object.assign({}, state, {
				mostrar: {
					cargando: false,
					personal: null,
					error: action.payload
				},
				formulario: { abirtoEditar: false, abirtoCrear: false }
			})
		default:
			return state
	}
}