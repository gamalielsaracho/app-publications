import {
	REGISTRAR_USUARIO_REQUEST,
	REGISTRAR_USUARIO_EXITO,
	REGISTRAR_USUARIO_FALLO
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