import {
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_FALLO,

	LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST,
	LISTAR_CONSULTA_DIAGNOSTICOS_EXITO,
	LISTAR_CONSULTA_DIAGNOSTICOS_FALLO,

	// Create rol.
	ABRIR_FORMULARIO_CREAR_CONSULTA_DIAGNOSTICO,

	CREAR_CONSULTA_DIAGNOSTICO_REQUEST,
	CREAR_CONSULTA_DIAGNOSTICO_EXITO,
	CREAR_CONSULTA_DIAGNOSTICO_FALLO,

	CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO,

	// Editar Rol.
	EDITAR_CONSULTA_DIAGNOSTICO_REQUEST,
	EDITAR_CONSULTA_DIAGNOSTICO_EXITO,
	EDITAR_CONSULTA_DIAGNOSTICO_FALLO,

	// Delete Rol.
	ELIMINAR_CONSULTA_DIAGNOSTICO_REQUEST,
	ELIMINAR_CONSULTA_DIAGNOSTICO_EXITO,
	ELIMINAR_CONSULTA_DIAGNOSTICO_FALLO
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

export function abrirFormularioCrearConsultaDiagnostico() {
	return (dispatch) => {
		dispatch(reset('FormularioConsultaDiagnostico'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CONSULTA_DIAGNOSTICO })
	}
}

export function abrirFormularioEditarConsultaDiagnostico(idDiagnosticoConsulta) {
	return (dispatch) => {
		let url = `/consultaDiagnosticos/${idDiagnosticoConsulta}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_EXITO, ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_FALLO, true, url, dispatch)
	}
}

export function cerrarFormularioConsultaDiagnostico() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO })
	}
}

export function listarConsultaDiagnosticos(idConsulta) {
	return (dispatch) => {
		let url = `/consultaDiagnosticos/${idConsulta}`

		dispatch({ type: LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST })

		getData(LISTAR_CONSULTA_DIAGNOSTICOS_EXITO, LISTAR_CONSULTA_DIAGNOSTICOS_FALLO, true, url, dispatch)
	}
}

export function crearConsultaDiagnostico(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/consultaDiagnosticos/crear`

		// console.log(url)

		dispatch({ type: CREAR_CONSULTA_DIAGNOSTICO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.consultaDiagnosticoAgregado

			dispatch({ type: CREAR_CONSULTA_DIAGNOSTICO_EXITO, payload: res })

			dispatch(reset('FormularioConsultaDiagnostico'))
		})
		.catch((error) => {
			errorHandler(dispatch, error.response, CREAR_CONSULTA_DIAGNOSTICO_FALLO)
		})
	}
}

export function eliminarConsultaDiagnostico(idDiagnosticoConsulta) {
	return (dispatch) => {
		let url = `/consultaDiagnosticos/${idDiagnosticoConsulta}/eliminar`

		dispatch({ type: ELIMINAR_CONSULTA_DIAGNOSTICO_REQUEST })

		deleteData(ELIMINAR_CONSULTA_DIAGNOSTICO_EXITO, ELIMINAR_CONSULTA_DIAGNOSTICO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioConsultaDiagnostico'))
	}
}


export function editarConsultaDiagnostico(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/consultaDiagnosticos/editar`


		dispatch({ type: EDITAR_CONSULTA_DIAGNOSTICO_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.consultaDiagnosticoActualizado

			dispatch({ type: EDITAR_CONSULTA_DIAGNOSTICO_EXITO, payload: res })

			dispatch(reset('FormularioConsultaDiagnostico'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_CONSULTA_DIAGNOSTICO_FALLO)
		})
	}
}