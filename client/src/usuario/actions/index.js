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

} from './types'

import {
	errorHandler,
	postData,
	getData,
	putData,
	deleteData
} from '../../globalActions'

import {API_URL} from '../../globalActions'

import { browserHistory } from 'react-router'
import axios from 'axios'

// export function registrarUsuarioRequest() {
// 	return (dispatch) => {
// 		dispatch({ type: REGISTRAR_USUARIO_REQUEST })
// 	}
// }

export function registrarUsuario(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: REGISTRAR_USUARIO_REQUEST })

		axios.post(`${API_URL}/usuarios/crear`, datosFormulario)
		.then((response) => {

			dispatch({ type: REGISTRAR_USUARIO_EXITO, payload: response.data })
			console.log(response.data)
			browserHistory.push(`/`)
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, REGISTRAR_USUARIO_FALLO)
		})

	}
}

export function autenticarUsuario(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: AUTENTICAR_USUARIO_REQUEST })

		axios.post(`${API_URL}/usuarios/autenticacion`, datosFormulario)
		.then((response) => {

			dispatch({ type: AUTENTICAR_USUARIO_EXITO, payload: response.data })
			
			console.log(response.data)

			localStorage.setItem('token', response.data.token)
			
			const token = localStorage.getItem('token')

			dispatch(verificarTokenUsuario(token))

			// enviar al perfil del usuario. cool.!
			browserHistory.push(`/`)
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, AUTENTICAR_USUARIO_FALLO)
		})

	}
}

export function verificarTokenUsuario(token) {

	return (dispatch) => {
		dispatch({ type: VERIFICAR_TOKEN_USUARIO_REQUEST })

		axios.get(`${API_URL}/usuarios/verifivartoken/${token}`)
		.then((response) => {

			dispatch({ type: VERIFICAR_TOKEN_USUARIO_EXITO, payload: response.data })
			
			console.log(response.data)

			 // location.reload()

			// localStorage.setItem('token', response.data.token)

			// enviar al perfil del usuario. cool.!
			// browserHistory.push(`/`)
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, VERIFICAR_TOKEN_USUARIO_FALLO)
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
		const url = `/usuarios`

		dispatch({ type: LISTAR_USUARIOS_REQUEST })

		getData(LISTAR_USUARIOS_EXITO, LISTAR_USUARIOS_FALLO, true, url, dispatch)
	}
}
