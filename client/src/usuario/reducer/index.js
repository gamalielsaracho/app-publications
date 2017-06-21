import {
	REGISTRAR_USUARIO_REQUEST,
	REGISTRAR_USUARIO_EXITO,
	REGISTRAR_USUARIO_FALLO,

	AUTENTICAR_USUARIO_REQUEST,
	AUTENTICAR_USUARIO_EXITO,
	AUTENTICAR_USUARIO_FALLO,

	VERIFICAR_TOKEN_USUARIO_REQUEST,
	VERIFICAR_TOKEN_USUARIO_EXITO,
	VERIFICAR_TOKEN_USUARIO_FALLO,

	SALIR_USUARIO,

	LISTAR_USUARIOS_REQUEST,
	LISTAR_USUARIOS_EXITO,
	LISTAR_USUARIOS_FALLO

} from '../actions/types'

const INITIAL_STATE = {
	filtro: { nombre: '', apellido: '' },
	listar: { usuarios:[], cargando: false, error: '' },
	registro:{ mensaje:'', error:'', cargando:false },
	autenticacion: { mensaje: '', error: '', cargando: false },
	mostrar: { mensaje:'', error:'', cargando:false, usuario: {} },
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
		case REGISTRAR_USUARIO_REQUEST:
			return Object.assign({}, state, { registro: { cargando: true } }) 

		case REGISTRAR_USUARIO_EXITO:
			return Object.assign({}, state, { 
				registro: { cargando:false, error:'', mensaje: action.payload.mensaje } 
			})

		case REGISTRAR_USUARIO_FALLO:
			return Object.assign({}, state, { 
				registro:{ cargando:false, error: action.payload.error, mensaje:'' }
			})

			// Autenticación de Usuario.
		case AUTENTICAR_USUARIO_REQUEST:
			return Object.assign({}, state, { 
				autenticacion:{ cargando:true }
			})
		case AUTENTICAR_USUARIO_EXITO:
			return Object.assign({}, state, { 
				autenticacion:{ 
					cargando:false,
					mensaje: action.payload.mensaje ? action.payload.mensaje : '',  
					error: '' }
			})

		case AUTENTICAR_USUARIO_FALLO:
			return Object.assign({}, state, { 
				autenticacion:{ cargando:false, error: action.payload.error, mensaje:'' }
			})

		case VERIFICAR_TOKEN_USUARIO_REQUEST:
			return Object.assign({}, state, { 
				usuarioEstado:{ cargando: true }
			})

		case VERIFICAR_TOKEN_USUARIO_EXITO:
			// console.log("VERIFICAR_TOKEN_USUARIO_EXITO")
			return Object.assign({}, state, { 
				usuarioEstado:{
					cargando: false,
					error: '',
					datosToken: action.payload,
					autenticado: true 
				} 
			}) 

		case VERIFICAR_TOKEN_USUARIO_FALLO:
			return Object.assign({}, state, { 
				usuarioEstado:{
					cargando: false,
					datosToken: {},
					autenticado: false, 
					error: action.payload.error
				}
			})

		case SALIR_USUARIO:
			return Object.assign({}, state, { 
				usuarioEstado:{ 
					cargando:false,
					datosToken: {},
					error: '', 
					autenticado: false 
				}
			})

		case LISTAR_USUARIOS_REQUEST:
			return state = Object.assign({}, state, {
				listar: { cargando: true }
			})

		case LISTAR_USUARIOS_EXITO:
			return state = Object.assign({}, state, {
				listar: {
					usuarios: action.payload, 
					cargando:false, 
					error: ''
				}
			})

		case LISTAR_USUARIOS_FALLO:
			return state = Object.assign({}, state, {
				listar: {
					usuarios: [],
					cargando: false,
					error: action.payload.error					
				}
			})

		default:
			return state
	}
}