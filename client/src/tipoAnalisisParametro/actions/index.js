import {
	LISTAR_TIPO_ANALISIS_PARAMETROS_REQUEST,
	LISTAR_TIPO_ANALISIS_PARAMETROS_EXITO,
	LISTAR_TIPO_ANALISIS_PARAMETROS_FALLO,

	// Create rol.
	ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS_PARAMETRO,

	CREAR_TIPO_ANALISIS_PARAMETRO_REQUEST,
	CREAR_TIPO_ANALISIS_PARAMETRO_EXITO,
	CREAR_TIPO_ANALISIS_PARAMETRO_FALLO,

	CERRAR_FORMULARIO_TIPO_ANALISIS_PARAMETRO,

	// Show rol.
	MOSTRAR_TIPO_ANALISIS_PARAMETRO_REQUEST,
	MOSTRAR_TIPO_ANALISIS_PARAMETRO_EXITO,
	MOSTRAR_TIPO_ANALISIS_PARAMETRO_FALLO,

	// Delete Rol.
	ELIMINAR_TIPO_ANALISIS_PARAMETRO_REQUEST,
	ELIMINAR_TIPO_ANALISIS_PARAMETRO_EXITO,
	ELIMINAR_TIPO_ANALISIS_PARAMETRO_FALLO
} from './types'

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


export function abrirFormularioCrearTipoAnalisisParametro() {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS_PARAMETRO })
		
		dispatch(reset('FormularioTipoAnalisisParametro'))
	}
}

export function cerrarFormularioTipoAnalisisParametro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_TIPO_ANALISIS_PARAMETRO })
	}
}


export function listarTipoAnalisisParametros(idTipoAnalisis) {
	return (dispatch) => {

		let url = `/tipoAnalisisParametros/${idTipoAnalisis}`

		dispatch({ type: LISTAR_TIPO_ANALISIS_PARAMETROS_REQUEST })

		getData(LISTAR_TIPO_ANALISIS_PARAMETROS_EXITO, LISTAR_TIPO_ANALISIS_PARAMETROS_FALLO, true, url, dispatch)
	}
}


export function crearTipoAnalisisParametro(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/tipoAnalisisParametros/crear`

		// console.log(url)

		dispatch({ type: CREAR_TIPO_ANALISIS_PARAMETRO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			console.log(res)

			res.datoInsertado = res.parametroTipoAnalisisAgregado

			dispatch({ type: CREAR_TIPO_ANALISIS_PARAMETRO_EXITO, payload: res })

			dispatch(reset('FormularioTipoAnalisisParametro'))
		})
		.catch((error) => {
			// console.log(error)

			errorHandler(dispatch, error.response, CREAR_TIPO_ANALISIS_PARAMETRO_FALLO)
		})
	}
}


export function eliminarTipoAnalisisParametro(idTipoAnalisisParametro) {
	return (dispatch) => {
		let url = `/tipoAnalisisParametros/${idTipoAnalisisParametro}/eliminar`

		dispatch({ type: ELIMINAR_TIPO_ANALISIS_PARAMETRO_REQUEST })

		deleteData(ELIMINAR_TIPO_ANALISIS_PARAMETRO_EXITO, ELIMINAR_TIPO_ANALISIS_PARAMETRO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioTipoAnalisisParametro'))
	}
}


export function mostrarTipoAnalisisParametro(idTipoAnalisisParametro) {
	return (dispatch) => {

		let url = `/tipoAnalisisParametros/${idTipoAnalisisParametro}`

		dispatch({ type: MOSTRAR_TIPO_ANALISIS_PARAMETRO_REQUEST })

		getData(MOSTRAR_TIPO_ANALISIS_PARAMETRO_EXITO, MOSTRAR_TIPO_ANALISIS_PARAMETRO_FALLO, true, url, dispatch)
	}
}

