import {

	ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_FALLO,

	LISTAR_CONSULTA_SINTOMAS_REQUEST,
	LISTAR_CONSULTA_SINTOMAS_EXITO,
	LISTAR_CONSULTA_SINTOMAS_FALLO,

	// Create rol.
	ABRIR_FORMULARIO_CREAR_CONSULTA_SINTOMA,

	CREAR_CONSULTA_SINTOMA_REQUEST,
	CREAR_CONSULTA_SINTOMA_EXITO,
	CREAR_CONSULTA_SINTOMA_FALLO,

	CERRAR_FORMULARIO_CONSULTA_SINTOMA,

	// Editar Rol.
	EDITAR_CONSULTA_SINTOMA_REQUEST,
	EDITAR_CONSULTA_SINTOMA_EXITO,
	EDITAR_CONSULTA_SINTOMA_FALLO,

	// Delete Rol.
	ELIMINAR_CONSULTA_SINTOMA_REQUEST,
	ELIMINAR_CONSULTA_SINTOMA_EXITO,
	ELIMINAR_CONSULTA_SINTOMA_FALLO
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

export function abrirFormularioCrearConsultaSintoma() {
	return (dispatch) => {
		dispatch(reset('FormularioConsultaSintoma'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CONSULTA_SINTOMA })
	}
}

export function abrirFormularioEditarConsultaSintoma(idConsultaSintoma) {
	return (dispatch) => {
		let url = `/consultasintomas/${idConsultaSintoma}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_EXITO, ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_FALLO, true, url, dispatch)
	}
}

export function cerrarFormularioConsultaSintoma() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CONSULTA_SINTOMA })
	}
}

export function listarConsultaSintomas(idConsulta) {
	return (dispatch) => {

		let url = `/consultasintomas/${idConsulta}`

		dispatch({ type: LISTAR_CONSULTA_SINTOMAS_REQUEST })

		getData(LISTAR_CONSULTA_SINTOMAS_EXITO, LISTAR_CONSULTA_SINTOMAS_FALLO, true, url, dispatch)
	}
}

export function crearConsultaSintoma(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/consultasintomas/crear`

		// console.log(url)

		dispatch({ type: CREAR_CONSULTA_SINTOMA_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.sintomaConsultaAgregado

			dispatch({ type: CREAR_CONSULTA_SINTOMA_EXITO, payload: res })

			dispatch(reset('FormularioConsultaSintoma'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_CONSULTA_SINTOMA_FALLO)
		})
	}
}

export function eliminarConsultaSintoma(idConsultaSintoma) {
	return (dispatch) => {
		let url = `/consultasintomas/${idConsultaSintoma}/eliminar`

		dispatch({ type: ELIMINAR_CONSULTA_SINTOMA_REQUEST })

		deleteData(ELIMINAR_CONSULTA_SINTOMA_EXITO, ELIMINAR_CONSULTA_SINTOMA_FALLO, true, url, dispatch)

		dispatch(reset('FormularioConsultaSintoma'))
	}
}


export function editarConsultaSintoma(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/consultasintomas/editar`


		dispatch({ type: EDITAR_CONSULTA_SINTOMA_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.sintomaConsultaActualizado

			dispatch({ type: EDITAR_CONSULTA_SINTOMA_EXITO, payload: res })

			dispatch(reset('FormularioConsultaSintoma'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_CONSULTA_SINTOMA_FALLO)
		})
	}
}