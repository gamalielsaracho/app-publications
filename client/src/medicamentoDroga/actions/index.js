import {

	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_FALLO,

	LISTAR_MEDICAMENTO_DROGAS_REQUEST,
	LISTAR_MEDICAMENTO_DROGAS_EXITO,
	LISTAR_MEDICAMENTO_DROGAS_FALLO,

	// Create rol.
	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_DROGA,

	CREAR_MEDICAMENTO_DROGA_REQUEST,
	CREAR_MEDICAMENTO_DROGA_EXITO,
	CREAR_MEDICAMENTO_DROGA_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO_DROGA,

	// Editar Rol.
	EDITAR_MEDICAMENTO_DROGA_REQUEST,
	EDITAR_MEDICAMENTO_DROGA_EXITO,
	EDITAR_MEDICAMENTO_DROGA_FALLO,

	// Delete Rol.
	ELIMINAR_MEDICAMENTO_DROGA_REQUEST,
	ELIMINAR_MEDICAMENTO_DROGA_EXITO,
	ELIMINAR_MEDICAMENTO_DROGA_FALLO
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

export function abrirFormularioCrearMedicamentoDroga() {
	return (dispatch) => {
		dispatch(reset('FormularioMedicamentoDroga'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MEDICAMENTO_DROGA })
	}
}

export function abrirFormularioEditarMedicamentoDroga(idMedicamentoDroga) {
	return (dispatch) => {
		let url = `/medicamentoDrogas/${idMedicamentoDroga}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_EXITO, ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_DROGA_FALLO, true, url, dispatch)
	}
}

export function cerrarFormularioMedicamentoDroga() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MEDICAMENTO_DROGA })
	}
}

export function listarMedicamentoDrogas(idMedicamento) {
	return (dispatch) => {

		let url = `/medicamentoDrogas/${idMedicamento}`

		dispatch({ type: LISTAR_MEDICAMENTO_DROGAS_REQUEST })

		getData(LISTAR_MEDICAMENTO_DROGAS_EXITO, LISTAR_MEDICAMENTO_DROGAS_FALLO, true, url, dispatch)
	}
}

export function crearMedicamentoDroga(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/medicamentoDrogas/crear`

		// console.log(url)

		dispatch({ type: CREAR_MEDICAMENTO_DROGA_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.medicamentoDrogaAgregado

			dispatch({ type: CREAR_MEDICAMENTO_DROGA_EXITO, payload: res })

			dispatch(reset('FormularioMedicamentoDroga'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_MEDICAMENTO_DROGA_FALLO)
		})
	}
}

export function eliminarMedicamentoDroga(idMedicamentoDroga) {
	return (dispatch) => {
		let url = `/medicamentoDrogas/${idMedicamentoDroga}/eliminar`

		dispatch({ type: ELIMINAR_MEDICAMENTO_DROGA_REQUEST })

		deleteData(ELIMINAR_MEDICAMENTO_DROGA_EXITO, ELIMINAR_MEDICAMENTO_DROGA_FALLO, true, url, dispatch)

		dispatch(reset('FormularioMedicamentoDroga'))
	}
}

export function editarMedicamentoDroga(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/medicamentoDrogas/editar`


		dispatch({ type: EDITAR_MEDICAMENTO_DROGA_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.medicamentoDrogaActualizado

			dispatch({ type: EDITAR_MEDICAMENTO_DROGA_EXITO, payload: res })

			dispatch(reset('FormularioMedicamentoDroga'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_MEDICAMENTO_DROGA_FALLO)
		})
	}
}