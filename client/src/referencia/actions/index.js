import {
	ABRIR_FORMULARIO_CREAR_REFERENCIA,

	ABRIR_FORMULARIO_EDITAR_REFERENCIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_REFERENCIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_REFERENCIA_FALLO,

	LISTAR_REFERENCIAS_REQUEST,
	LISTAR_REFERENCIAS_EXITO,
	LISTAR_REFERENCIAS_FALLO,

	LISTAR_REFERENCIAS_FILTRADAS_REQUEST,
	LISTAR_REFERENCIAS_FILTRADAS_EXITO,
	LISTAR_REFERENCIAS_FILTRADAS_FALLO,

	// Create rol.
	CREAR_REFERENCIA_REQUEST,
	CREAR_REFERENCIA_EXITO,
	CREAR_REFERENCIA_FALLO,

	CERRAR_FORMULARIO_REFERENCIA,

	// Show rol.
	MOSTRAR_REFERENCIA_REQUEST,
	MOSTRAR_REFERENCIA_EXITO,
	MOSTRAR_REFERENCIA_FALLO,

	// Editar Rol.
	EDITAR_REFERENCIA_REQUEST,
	EDITAR_REFERENCIA_EXITO,
	EDITAR_REFERENCIA_FALLO,

	// Delete Rol.
	ELIMINAR_REFERENCIA_REQUEST,
	ELIMINAR_REFERENCIA_EXITO,
	ELIMINAR_REFERENCIA_FALLO
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

export function abrirFormularioCrearReferencia() {
	return (dispatch) => {
		dispatch(reset('FormularioReferencia'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_REFERENCIA })
	}
}

export function abrirFormularioEditarReferencia(idReferencia) {
	return (dispatch) => {
		let url = `/referencias/${idReferencia}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_REFERENCIA_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_REFERENCIA_EXITO, ABRIR_FORMULARIO_EDITAR_REFERENCIA_FALLO, true, url, dispatch)
	}
}

export function cerrarFormularioReferencia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_REFERENCIA })
	}
}

export function listarReferencias(idParametroAnalisis) {
	return (dispatch) => {

		let url = `/referencias/${idParametroAnalisis}`

		dispatch({ type: LISTAR_REFERENCIAS_REQUEST })

		getData(LISTAR_REFERENCIAS_EXITO, LISTAR_REFERENCIAS_FALLO, true, url, dispatch)
	}
}

export function listarReferenciasPorTipoAnalisisEdadYsexo(idTipoAnalisis, fechaNacimiento, sexo) {
	return (dispatch) => {

		let url = `/referencias/${idTipoAnalisis}/${fechaNacimiento}/${sexo}/filtradas`

		dispatch({ type: LISTAR_REFERENCIAS_FILTRADAS_REQUEST })

		getData(LISTAR_REFERENCIAS_FILTRADAS_EXITO, LISTAR_REFERENCIAS_FILTRADAS_FALLO, true, url, dispatch)
	}
}


export function crearReferencia(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/referencias/crear`

		// console.log(url)

		dispatch({ type: CREAR_REFERENCIA_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.referenciaAgregada

			dispatch({ type: CREAR_REFERENCIA_EXITO, payload: res })

			dispatch(reset('FormularioReferencia'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_REFERENCIA_FALLO)
		})
	}
}

export function eliminarReferencia(idReferencia) {
	return (dispatch) => {
		let url = `/referencias/${idReferencia}/eliminar`

		dispatch({ type: ELIMINAR_REFERENCIA_REQUEST })

		deleteData(ELIMINAR_REFERENCIA_EXITO, ELIMINAR_REFERENCIA_FALLO, true, url, dispatch)

		dispatch(reset('FormularioReferencia'))
	}
}


export function mostrarReferencia(idReferencia) {
	return (dispatch) => {

		let url = `/referencias/${idReferencia}`

		dispatch({ type: MOSTRAR_REFERENCIA_REQUEST })

		getData(MOSTRAR_REFERENCIA_EXITO, MOSTRAR_REFERENCIA_FALLO, true, url, dispatch)
	}
}

export function editarReferencia(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/referencias/editar`

		dispatch({ type: EDITAR_REFERENCIA_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.referenciaActualizada

			dispatch({ type: EDITAR_REFERENCIA_EXITO, payload: res })

			dispatch(reset('FormularioReferencia'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_REFERENCIA_FALLO)
		})
	}
}