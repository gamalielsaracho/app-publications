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
	LISTAR_USUARIOS_FALLO,

	ACTUALIZAR_FORMULARIO_FILTRO
} from './types'

// import {
// 	errorHandler,
// 	postData,
// 	getData,
// 	putData,
// 	deleteData
// } from '../../globalActions'

// import {API_URL} from '../../globalActions'

// import { socket } from '../../globalActions'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
// import axios from 'axios'

var socketUsuario = io('http://localhost:3000')

export function registrarUsuario(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: REGISTRAR_USUARIO_REQUEST })

		socketUsuario.emit('registrar_usuario', datosFormulario)

		socketUsuario.on('registrar_usuario', (data) => {
			if(data.error) {
				dispatch({ type: REGISTRAR_USUARIO_FALLO, payload: data.error })
			} else {
				dispatch({ type: REGISTRAR_USUARIO_EXITO, payload: data })
				browserHistory.push('entrar')
			}
		})
	}
}

export function autenticarUsuario(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: AUTENTICAR_USUARIO_REQUEST })

		socketUsuario.emit('autenticar_usuario', datosFormulario)

		socketUsuario.on('autenticar_usuario', (data) => {
			if(data.error) {
				dispatch({ type: AUTENTICAR_USUARIO_FALLO, payload: data.error })
			} else {
				dispatch({ type: AUTENTICAR_USUARIO_EXITO, payload: data })
				
				localStorage.setItem('token', data.token)

				const token = localStorage.getItem('token')

				dispatch(verificarTokenUsuario(token))

				// enviar al perfil del usuario. cool.!
				browserHistory.push(`/`)
			}
		})
	}
}

export function verificarTokenUsuario(token) {

	return (dispatch) => {
		dispatch({ type: VERIFICAR_TOKEN_USUARIO_REQUEST })

		socketUsuario.emit('verificar_token', { token: token })
		socketUsuario.on('verificar_token', (data) => {
			if(data.error) {
				dispatch({ type: VERIFICAR_TOKEN_USUARIO_FALLO, payload: data.error })
			} else {
				dispatch({ type: VERIFICAR_TOKEN_USUARIO_EXITO, payload: data })
			}
		})
	}
}

export function salirUsuario() {

	return (dispatch) => {
		dispatch({ type: SALIR_USUARIO })

		localStorage.removeItem('token')

		browserHistory.push(`/`)
	}
}

export function listarUsuarios() {
	return (dispatch) => {

		dispatch({ type: LISTAR_USUARIOS_REQUEST })

		var socketUsuario = io.connect('http://localhost:3000')


		socketUsuario.on('listar_usuarios', function(data) {
			if(data.error) {
				dispatch({ type: LISTAR_USUARIOS_FALLO, payload: data.error })
			} else {	
				dispatch({ type: LISTAR_USUARIOS_EXITO, payload: data })
			}
		})

	}
}

export function actualizarFormularioFiltro(valoresInput) {
	return (dispatch) => {
		console.log(valoresInput)
		dispatch({ type: ACTUALIZAR_FORMULARIO_FILTRO, valores: valoresInput  })
	}
}
