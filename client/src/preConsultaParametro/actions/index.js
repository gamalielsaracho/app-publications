import {

	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_FALLO,

	LISTAR_PRECONSULTA_PARAMETROS_REQUEST,
	LISTAR_PRECONSULTA_PARAMETROS_EXITO,
	LISTAR_PRECONSULTA_PARAMETROS_FALLO,

	// Create rol.
	CREAR_PRECONSULTA_PARAMETRO_REQUEST,
	CREAR_PRECONSULTA_PARAMETRO_EXITO,
	CREAR_PRECONSULTA_PARAMETRO_FALLO,

	CERRAR_FORMULARIO_PRECONSULTA_PARAMETRO,

	// Show rol.
	MOSTRAR_PRECONSULTA_PARAMETRO_REQUEST,
	MOSTRAR_PRECONSULTA_PARAMETRO_EXITO,
	MOSTRAR_PRECONSULTA_PARAMETRO_FALLO,

	CERRAR_MODAL_MOSTRAR_PRECONSULTA_PARAMETRO,

	// Editar Rol.
	EDITAR_PRECONSULTA_PARAMETRO_REQUEST,
	EDITAR_PRECONSULTA_PARAMETRO_EXITO,
	EDITAR_PRECONSULTA_PARAMETRO_FALLO,

	// Delete Rol.
	ELIMINAR_PRECONSULTA_PARAMETRO_REQUEST,
	ELIMINAR_PRECONSULTA_PARAMETRO_EXITO,
	ELIMINAR_PRECONSULTA_PARAMETRO_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

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

export function abrirFormularioEditarPreConsultaParametro(idPreconsultaParametro) {
	return (dispatch) => {
		let url = `/parametrospreConsulta/${idPreconsultaParametro}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_EXITO, ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_FALLO, true, url, dispatch)
	}
}

export function cerrarFormularioPreConsultaParametro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PRECONSULTA_PARAMETRO })
	}
}

export function listarPreConsultaParametros(idPreConsulta) {
	return (dispatch) => {

		let url = `/parametrospreConsulta/${idPreConsulta}`

		dispatch({ type: LISTAR_PRECONSULTA_PARAMETROS_REQUEST })

		getData(LISTAR_PRECONSULTA_PARAMETROS_EXITO, LISTAR_PRECONSULTA_PARAMETROS_FALLO, true, url, dispatch)
	}
}

export function crearPreConsultaParametro(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/parametrospreConsulta/crear`

		// console.log(url)

		dispatch({ type: CREAR_PRECONSULTA_PARAMETRO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.parametroPreConsultaAgregado

			dispatch({ type: CREAR_PRECONSULTA_PARAMETRO_EXITO, payload: res })

			dispatch(reset('FormularioPreConsultaParametro'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_PRECONSULTA_PARAMETRO_FALLO)
		})
	}
}

export function eliminarPreConsultaParametro(idPreconsultaParametro) {
	return (dispatch) => {
		let idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		let url = `/parametrospreConsulta/${idPreconsultaParametro}/eliminar/${idPersonal}`

		dispatch({ type: ELIMINAR_PRECONSULTA_PARAMETRO_REQUEST })

		deleteData(ELIMINAR_PRECONSULTA_PARAMETRO_EXITO, ELIMINAR_PRECONSULTA_PARAMETRO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioPreConsultaParametro'))
	}
}


export function mostrarPreConsultaParametro(idPreConsulta, idParametroPreconsulta) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PRECONSULTA_PARAMETRO_REQUEST })

		socketPreConsultaParametro.emit('mostrar_parametroPreConsulta', {
			id_preconsulta: idPreConsulta,
			id_parametroPreconsulta: idParametroPreconsulta
		})

		socketPreConsultaParametro.on('mostrar_parametroPreConsulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PRECONSULTA_PARAMETRO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PRECONSULTA_PARAMETRO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarPreConsultaParametro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PRECONSULTA_PARAMETRO })
	}
}

export function editarPreConsultaParametro(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/parametrospreConsulta/editar`

		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		dispatch({ type: EDITAR_PRECONSULTA_PARAMETRO_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.parametroPreConsultaActualizado

			dispatch({ type: EDITAR_PRECONSULTA_PARAMETRO_EXITO, payload: res })

			dispatch(reset('FormularioPreConsultaParametro'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_PRECONSULTA_PARAMETRO_FALLO)
		})
	}
}