import {
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_DIAGNOSTICO_FALLO,

	LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST,
	LISTAR_CONSULTA_DIAGNOSTICOS_EXITO,
	LISTAR_CONSULTA_DIAGNOSTICOS_FALLO,

	// Create rol.
	CREAR_CONSULTA_DIAGNOSTICO_REQUEST,
	CREAR_CONSULTA_DIAGNOSTICO_EXITO,
	CREAR_CONSULTA_DIAGNOSTICO_FALLO,

	CERRAR_FORMULARIO_CONSULTA_DIAGNOSTICO,

	// Show rol.
	MOSTRAR_CONSULTA_DIAGNOSTICO_REQUEST,
	MOSTRAR_CONSULTA_DIAGNOSTICO_EXITO,
	MOSTRAR_CONSULTA_DIAGNOSTICO_FALLO,

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

export function abrirFormularioEditarConsultaDiagnostico(idDiagnosticoConsulta) {
	return (dispatch) => {
		let url = `/diagnosticosConsulta/${idDiagnosticoConsulta}/editar`

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
		let url = `/diagnosticosConsulta/${idConsulta}`

		dispatch({ type: LISTAR_CONSULTA_DIAGNOSTICOS_REQUEST })

		getData(LISTAR_CONSULTA_DIAGNOSTICOS_EXITO, LISTAR_CONSULTA_DIAGNOSTICOS_FALLO, true, url, dispatch)
	}
}

export function crearConsultaDiagnostico(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/diagnosticosConsulta/crear`

		// console.log(url)

		dispatch({ type: CREAR_CONSULTA_DIAGNOSTICO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.diagnosticoAgregado

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
		let url = `/diagnosticosConsulta/${idDiagnosticoConsulta}/eliminar`

		dispatch({ type: ELIMINAR_CONSULTA_DIAGNOSTICO_REQUEST })

		deleteData(ELIMINAR_CONSULTA_DIAGNOSTICO_EXITO, ELIMINAR_CONSULTA_DIAGNOSTICO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioConsultaDiagnostico'))
	}
}


// export function mostrarConsultaDiagnostico(idDiagnosticoConsulta) {
// 	return (dispatch) => {
// 		dispatch({ type: MOSTRAR_CONSULTA_DIAGNOSTICO_REQUEST })

// 		if(data.error) {
// 			dispatch({ type: MOSTRAR_CONSULTA_DIAGNOSTICO_FALLO, payload: data.error })
// 		} else {
// 			dispatch({ type: MOSTRAR_CONSULTA_DIAGNOSTICO_EXITO, payload: data })
// 		}
// 	}
// }


export function editarConsultaDiagnostico(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/diagnosticosConsulta/editar`


		dispatch({ type: EDITAR_CONSULTA_DIAGNOSTICO_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.diagnosticoActualizado

			dispatch({ type: EDITAR_CONSULTA_DIAGNOSTICO_EXITO, payload: res })

			dispatch(reset('FormularioConsultaDiagnostico'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_CONSULTA_DIAGNOSTICO_FALLO)
		})
	}
}