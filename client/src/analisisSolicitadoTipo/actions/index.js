import {

	LISTAR_ANALISIS_SOLICITADO_TIPOS_REQUEST,
	LISTAR_ANALISIS_SOLICITADO_TIPOS_EXITO,
	LISTAR_ANALISIS_SOLICITADO_TIPOS_FALLO,

	// Create rol.
	CREAR_ANALISIS_SOLICITADO_TIPO_REQUEST,
	CREAR_ANALISIS_SOLICITADO_TIPO_EXITO,
	CREAR_ANALISIS_SOLICITADO_TIPO_FALLO,

	// Delete Rol.
	ELIMINAR_ANALISIS_SOLICITADO_TIPO_REQUEST,
	ELIMINAR_ANALISIS_SOLICITADO_TIPO_EXITO,
	ELIMINAR_ANALISIS_SOLICITADO_TIPO_FALLO
} from './types'

import io from 'socket.io-client'
import axios from 'axios'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import {
	postData,
	getData,
	putData,
	deleteData,
	errorHandler,

	API_URL
} from '../../globalActions'


export function listarAnalisisSolicitadoTipos(idAnalisisSolicitado) {
	return (dispatch) => {

		let url = `/analisisSolicitadoTipos/${idAnalisisSolicitado}`

		dispatch({ type: LISTAR_ANALISIS_SOLICITADO_TIPOS_REQUEST })

		getData(LISTAR_ANALISIS_SOLICITADO_TIPOS_EXITO, LISTAR_ANALISIS_SOLICITADO_TIPOS_FALLO, true, url, dispatch)
	}
}

export function crearAnalisisSolicitadoTipo(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/analisisSolicitadoTipos/crear`

		// console.log(url)

		dispatch({ type: CREAR_ANALISIS_SOLICITADO_TIPO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.analisisSolicitadoTipoAgregado

			dispatch({ type: CREAR_ANALISIS_SOLICITADO_TIPO_EXITO, payload: res })

			dispatch(reset('FormularioAnalisisSolicitadoTipo'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_ANALISIS_SOLICITADO_TIPO_FALLO)
		})
	}
}

export function eliminarAnalisisSolicitadoTipo(idAnalisisSolicitadoTipo) {
	return (dispatch) => {
		let url = `/analisisSolicitadoTipos/${idAnalisisSolicitadoTipo}/eliminar`

		dispatch({ type: ELIMINAR_ANALISIS_SOLICITADO_TIPO_REQUEST })

		deleteData(ELIMINAR_ANALISIS_SOLICITADO_TIPO_EXITO, ELIMINAR_ANALISIS_SOLICITADO_TIPO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioAnalisisSolicitadoTipo'))
	}
}






