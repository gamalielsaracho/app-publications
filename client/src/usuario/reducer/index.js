import {
	REGISTRAR_PERSONAL_REQUEST,
	REGISTRAR_PERSONAL_EXITO,
	REGISTRAR_PERSONAL_FALLO,

	AUTENTICAR_PERSONAL_REQUEST,
	AUTENTICAR_PERSONAL_EXITO,
	AUTENTICAR_PERSONAL_FALLO,

	VERIFICAR_TOKEN_PERSONAL_REQUEST,
	VERIFICAR_TOKEN_PERSONAL_EXITO,
	VERIFICAR_TOKEN_PERSONAL_FALLO,

	SALIR_PERSONAL,

	LISTAR_PERSONALES_REQUEST,
	LISTAR_PERSONALES_EXITO,
	LISTAR_PERSONALES_FALLO,

	ACTUALIZAR_FORMULARIO_FILTRO

} from '../actions/types'

const INITIAL_STATE = {
	filtro: { 
		nombre: '', apellido: '', correo: ''  
	},
	listar: { personales:[], cargando: false, error: '' },
	registro:{ mensaje:'', error:'', cargando:false },
	autenticacion: { mensaje: '', error: '', cargando: false },
	mostrar: { mensaje:'', error:'', cargando:false, personal: {} },
	actualizar:{ mensaje:'', error:'', cargando:false },
	usuarioEstado: {
		cargando: false,
		error: '',
		datosToken: {},
		autenticado: false
	}
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case REGISTRAR_PERSONAL_REQUEST:
			return Object.assign({}, state, { registro: { cargando: true } }) 

		case REGISTRAR_PERSONAL_EXITO:
			return Object.assign({}, state, { 
				registro: { cargando:false, error:'', mensaje: action.payload.mensaje } 
			})

		case REGISTRAR_PERSONAL_FALLO:
			return Object.assign({}, state, { 
				registro:{ cargando:false, error: action.payload.error, mensaje:'' }
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
					mensaje: action.payload.mensaje ? action.payload.mensaje : '',  
					error: '' }
			})

		case AUTENTICAR_PERSONAL_FALLO:
			return Object.assign({}, state, { 
				autenticacion:{ cargando:false, error: action.payload.error, mensaje:'' }
			})

		case VERIFICAR_TOKEN_PERSONAL_REQUEST:
			return Object.assign({}, state, { 
				usuarioEstado:{ cargando: true }
			})

		case VERIFICAR_TOKEN_PERSONAL_EXITO:
			return Object.assign({}, state, { 
				usuarioEstado:{
					cargando: false,
					error: '',
					datosToken: action.payload,
					autenticado: true 
				} 
			}) 

		case VERIFICAR_TOKEN_PERSONAL_FALLO:
			return Object.assign({}, state, { 
				usuarioEstado:{
					cargando: false,
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
					error: action.payload.error					
				}
			})

		case ACTUALIZAR_FORMULARIO_FILTRO:
			const { valores } = action

			return state = Object.assign({}, state, {
				filtro: {
					nombre: valores.nombre,
					apellido: valores.apellido,
					correo: valores.correo 
				}
			})

		default:
			return state
	}
}