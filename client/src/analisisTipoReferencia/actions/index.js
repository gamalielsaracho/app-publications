import {

	ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO,

	LISTAR_ANALISIS_TIPO_REFERENCIAS_REQUEST,
	LISTAR_ANALISIS_TIPO_REFERENCIAS_EXITO,
	LISTAR_ANALISIS_TIPO_REFERENCIAS_FALLO,

	// Create rol.
	CREAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	CREAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	CREAR_ANALISIS_TIPO_REFERENCIA_FALLO,

	CERRAR_FORMULARIO_ANALISIS_TIPO_REFERENCIA,

	// Editar Rol.
	EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO,

	// Delete Rol.
	ELIMINAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	ELIMINAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	ELIMINAR_ANALISIS_TIPO_REFERENCIA_FALLO,

	LIMPIAR_MENSAJE_ERROR_ANALISIS_TIPO_REFERENCIA
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'
import axios from 'axios'

// Análsis-X-Tipos  X Referencias.

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


export function limpiarMensajeErrorAnalisisTipoReferencia() {
	return (dispatch) => {
		dispatch({ type: LIMPIAR_MENSAJE_ERROR_ANALISIS_TIPO_REFERENCIA })
	}
}

export function abrirFormularioEditarAnalisisTipoReferencia(idAnalisisTipoAnalisisReferencia) {
	return (dispatch) => {
		let url = `/analisisTipoReferencias/${idAnalisisTipoAnalisisReferencia}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO, ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO, true, url, dispatch)
	}
}

export function cerrarFormularioAnalisisTipoReferencia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ANALISIS_TIPO_REFERENCIA })
	}
}

export function listarAnalisisTipoReferencias(idAnalisisTipo) {
	return (dispatch) => {

		let url = `/analisisTipoReferencias/${idAnalisisTipo}/listar`

		dispatch({ type: LISTAR_ANALISIS_TIPO_REFERENCIAS_REQUEST })

		getData(LISTAR_ANALISIS_TIPO_REFERENCIAS_EXITO, LISTAR_ANALISIS_TIPO_REFERENCIAS_FALLO, true, url, dispatch)
	}
}

export function crearAnalisisTipoReferencia(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/analisisTipoReferencias/crear`

		// console.log(url)

		dispatch({ type: CREAR_ANALISIS_TIPO_REFERENCIA_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.analisisTipoReferenciaAgregado

			dispatch({ type: CREAR_ANALISIS_TIPO_REFERENCIA_EXITO, payload: res })

			dispatch(reset('FormularioAnalisisTipoReferencia'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, CREAR_ANALISIS_TIPO_REFERENCIA_FALLO)
		})
	}
}

export function eliminarAnalisisTipoReferencia(idAnalisisTipoAnalisisReferencia) {
	return (dispatch) => {
		let idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		let url = `/analisisTipoReferencias/${idAnalisisTipoAnalisisReferencia}/eliminar/${idPersonal}`

		dispatch({ type: ELIMINAR_ANALISIS_TIPO_REFERENCIA_REQUEST })

		deleteData(ELIMINAR_ANALISIS_TIPO_REFERENCIA_EXITO, ELIMINAR_ANALISIS_TIPO_REFERENCIA_FALLO, true, url, dispatch)

		dispatch(reset('FormularioAnalisisTipoReferencia'))
	}
}


export function editarAnalisisTipoReferencia(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		let url = `${API_URL}/analisisTipoReferencias/editar`


		dispatch({ type: EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.analisisTipoReferenciaActualizado

			dispatch({ type: EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO, payload: res })

			dispatch(reset('FormularioAnalisisTipoReferencia'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO)
		})
	}
}