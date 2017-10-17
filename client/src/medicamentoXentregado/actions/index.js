import {

	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_FALLO,

	LISTAR_MEDICAMENTOS_AGREGADOS_REQUEST,
	LISTAR_MEDICAMENTOS_AGREGADOS_EXITO,
	LISTAR_MEDICAMENTOS_AGREGADOS_FALLO,

	// Create rol.
	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_AGREGADO,

	CREAR_MEDICAMENTO_AGREGADO_REQUEST,
	CREAR_MEDICAMENTO_AGREGADO_EXITO,
	CREAR_MEDICAMENTO_AGREGADO_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO_AGREGADO,

	// Editar Rol.
	EDITAR_MEDICAMENTO_AGREGADO_REQUEST,
	EDITAR_MEDICAMENTO_AGREGADO_EXITO,
	EDITAR_MEDICAMENTO_AGREGADO_FALLO,

	// Delete Rol.
	ELIMINAR_MEDICAMENTO_AGREGADO_REQUEST,
	ELIMINAR_MEDICAMENTO_AGREGADO_EXITO,
	ELIMINAR_MEDICAMENTO_AGREGADO_FALLO,

	// Mostrar Medicamento Agragado.
	MOSTRAR_MEDICAMENTO_AGREGADO_REQUEST,
	MOSTRAR_MEDICAMENTO_AGREGADO_EXITO,
	MOSTRAR_MEDICAMENTO_AGREGADO_FALLO,

	CERRAR_MODAL_MOSTRAR_MEDICAMENTO_AGREGADO
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

export function abrirFormularioCrearMedicamentoAgregado() {
	return (dispatch) => {
		dispatch(reset('FormularioMedicamentoAgregado'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MEDICAMENTO_AGREGADO })
	}
}


export function abrirFormularioEditarMedicamentoAgregado(idMedicamentoXentregado) {
	return (dispatch) => {
		let url = `/medicamentosXentregados/${idMedicamentoXentregado}/editar`

		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_REQUEST })

		getData(ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_EXITO, ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_AGREGADO_FALLO, true, url, dispatch)
	}
}


export function cerrarFormularioMedicamentoAgregado() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MEDICAMENTO_AGREGADO })
	}
}


export function listarMedicamentosAgregados(idMedicamentoEntregado) {
	return (dispatch) => {

		let url = `/medicamentosXentregados/${idMedicamentoEntregado}`

		dispatch({ type: LISTAR_MEDICAMENTOS_AGREGADOS_REQUEST })

		getData(LISTAR_MEDICAMENTOS_AGREGADOS_EXITO, LISTAR_MEDICAMENTOS_AGREGADOS_FALLO, true, url, dispatch)
	}
}


export function crearMedicamentoAgregado(datosFormulario) {
	return (dispatch) => {

		let url = `${API_URL}/medicamentosXentregados/crear`

		// console.log(url)

		dispatch({ type: CREAR_MEDICAMENTO_AGREGADO_REQUEST })

		axios.post(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoInsertado = res.medicamentoAgregado

			dispatch({ type: CREAR_MEDICAMENTO_AGREGADO_EXITO, payload: res })

			dispatch(reset('FormularioMedicamentoAgregado'))
		})
		.catch((error) => {
			console.log(error)
			errorHandler(dispatch, error.response, CREAR_MEDICAMENTO_AGREGADO_FALLO)
		})
	}
}


export function mostrarMedicamentoAgregado(idMedicamentoXentregado) {
	return (dispatch) => {
		let url = `/medicamentosXentregados/${idMedicamentoXentregado}/mostrar`

		dispatch({ type: MOSTRAR_MEDICAMENTO_AGREGADO_REQUEST })

		getData(MOSTRAR_MEDICAMENTO_AGREGADO_EXITO, MOSTRAR_MEDICAMENTO_AGREGADO_FALLO, true, url, dispatch)
	}
}


export function cerrarModalMostrarMedicamentoAgregado() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_MEDICAMENTO_AGREGADO })
	}
}


export function eliminarMedicamentoAgregado(idMedicamentoXentregado) {
	return (dispatch) => {
		let url = `/medicamentosXentregados/${idMedicamentoXentregado}/eliminar`

		dispatch({ type: ELIMINAR_MEDICAMENTO_AGREGADO_REQUEST })

		deleteData(ELIMINAR_MEDICAMENTO_AGREGADO_EXITO, ELIMINAR_MEDICAMENTO_AGREGADO_FALLO, true, url, dispatch)

		dispatch(reset('FormularioMedicamentoAgregado'))
	}
}


export function editarMedicamentoAgregado(datosFormulario) {
	return (dispatch) => {
		let url = `${API_URL}/medicamentosXentregados/editar`


		dispatch({ type: EDITAR_MEDICAMENTO_AGREGADO_REQUEST })
		
		axios.put(url, datosFormulario)
		.then((response) => {
			var res = response.data

			// console.log(res)

			res.datoActualizado = res.medicamentoAgregadoActualizado

			dispatch({ type: EDITAR_MEDICAMENTO_AGREGADO_EXITO, payload: res })

			dispatch(reset('FormularioMedicamentoAgregado'))
		})
		.catch((error) => {
			// console.log(error)
			errorHandler(dispatch, error.response, EDITAR_MEDICAMENTO_AGREGADO_FALLO)
		})
	}
}