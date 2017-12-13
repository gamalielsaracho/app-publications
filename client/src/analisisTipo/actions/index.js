import {
	LISTAR_ANALISIS_TIPOS_REQUEST,
	LISTAR_ANALISIS_TIPOS_EXITO,
	LISTAR_ANALISIS_TIPOS_FALLO,

	ABRIR_FORMULARIO_CREAR_ANALISIS_TIPO,

	// Create rol.
	CREAR_ANALISIS_TIPO_REQUEST,
	CREAR_ANALISIS_TIPO_EXITO,
	CREAR_ANALISIS_TIPO_FALLO,

	CERRAR_FORMULARIO_ANALISIS_TIPO,

	// Show rol.
	MOSTRAR_ANALISIS_TIPO_REQUEST,
	MOSTRAR_ANALISIS_TIPO_EXITO,
	MOSTRAR_ANALISIS_TIPO_FALLO,

	// Delete Rol.
	ELIMINAR_ANALISIS_TIPO_REQUEST,
	ELIMINAR_ANALISIS_TIPO_EXITO,
	ELIMINAR_ANALISIS_TIPO_FALLO,


	LIMPIAR_MENSAJE_ERROR_ANALISIS_TIPO
} from './types'

import io from 'socket.io-client'
import axios from 'axios'

// PreConsulta x Parametro
// var socketPreConsultaParametro = io.connect('http://localhost:3000/preConsultaParametro');

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


export function limpiarMensajeErrorAnalisisTipo() {
	return (dispatch) => {
		dispatch({ type: LIMPIAR_MENSAJE_ERROR_ANALISIS_TIPO })
	}
}


export function abrirFormularioCrearAnalisisTipo() {
	return (dispatch) => {
		dispatch(reset('FormularioAnalisisTipo'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ANALISIS_TIPO })
	}
}


export function cerrarFormularioAnalisisTipo() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ANALISIS_TIPO })
	}
}


export function listarAnalisisTipos(idAnalisis) {
	return (dispatch) => {

		let url = `/analisisTipos/${idAnalisis}`

		dispatch({ type: LISTAR_ANALISIS_TIPOS_REQUEST })

		getData(LISTAR_ANALISIS_TIPOS_EXITO, LISTAR_ANALISIS_TIPOS_FALLO, true, url, dispatch)
	}
}


export function crearAnalisisTipo(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/analisisTipos/crear`

		// console.log(url)

		dispatch({ type: CREAR_ANALISIS_TIPO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.analisisTipoAgregado

			dispatch({ type: CREAR_ANALISIS_TIPO_EXITO, payload: res })

			dispatch(reset('FormularioAnalisisTipo'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_ANALISIS_TIPO_FALLO)
		})
	}
}


export function eliminarAnalisisTipo(idAnalisisTipo) {
	return (dispatch) => {
		let url = `/analisisTipos/${idAnalisisTipo}/eliminar`

		dispatch({ type: ELIMINAR_ANALISIS_TIPO_REQUEST })

		deleteData(ELIMINAR_ANALISIS_TIPO_EXITO, ELIMINAR_ANALISIS_TIPO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioAnalisisTipo'))
	}
}


export function mostrarAnalisisTipo(idAnalisisTipo) {
	return (dispatch) => {
		let url = `/analisisTipos/${idAnalisisTipo}/mostrar`

		dispatch({ type: MOSTRAR_ANALISIS_TIPO_REQUEST })

		getData(MOSTRAR_ANALISIS_TIPO_EXITO, MOSTRAR_ANALISIS_TIPO_FALLO, true, url, dispatch)
		
	}
}


