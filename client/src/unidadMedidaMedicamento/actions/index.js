import {
	ABRIR_FORMULARIO_CREAR_UNIDAD_MEDICAMENTO,

	ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_FALLO,

	CERRAR_FORMULARIO_UNIDAD_MEDICAMENTO,

	LISTAR_UNIDADES_MEDICAMENTOS_REQUEST,
	LISTAR_UNIDADES_MEDICAMENTOS_EXITO,
	LISTAR_UNIDADES_MEDICAMENTOS_FALLO,

	// Create rol.
	CREAR_UNIDAD_MEDICAMENTO_REQUEST,
	CREAR_UNIDAD_MEDICAMENTO_EXITO,
	CREAR_UNIDAD_MEDICAMENTO_FALLO,

	// Show rol.
	MOSTRAR_UNIDAD_MEDICAMENTO_REQUEST,
	MOSTRAR_UNIDAD_MEDICAMENTO_EXITO,
	MOSTRAR_UNIDAD_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_UNIDAD_MEDICAMENTO,

	// Editar Rol.
	EDITAR_UNIDAD_MEDICAMENTO_REQUEST,
	EDITAR_UNIDAD_MEDICAMENTO_EXITO,
	EDITAR_UNIDAD_MEDICAMENTO_FALLO,

	// Delete Rol.
	ELIMINAR_UNIDAD_MEDICAMENTO_REQUEST,
	ELIMINAR_UNIDAD_MEDICAMENTO_EXITO,
	ELIMINAR_UNIDAD_MEDICAMENTO_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var unidadMedicamentoSocket = io.connect('http://localhost:3000/unidadMedidaMedicamento');

export function abrirFormularioCrearUnidadMedicamento() {
	return (dispatch) => {
		dispatch(reset('FormularioUnidadMedicamento'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_UNIDAD_MEDICAMENTO })
	}
}

export function abrirFormularioEditarUnidadMedicamento(idUnidadMedicamento) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_REQUEST })

		unidadMedicamentoSocket.emit('mostrar_unidadMedicamento', { 
			id_unidadMedidaMedicamento: idUnidadMedicamento 
		})

		unidadMedicamentoSocket.on('mostrar_unidadMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioUnidadMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_UNIDAD_MEDICAMENTO })
	}
}

export function listarUnidadesMedicamentos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_UNIDADES_MEDICAMENTOS_REQUEST })

		var unidadMedicamentoSocket = io.connect('http://localhost:3000/unidadMedidaMedicamento');

		unidadMedicamentoSocket.on('listar_unidadesMedicamentos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_UNIDADES_MEDICAMENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_UNIDADES_MEDICAMENTOS_EXITO, payload: data })
			}
		})
	}
}

export function crearUnidadMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_UNIDAD_MEDICAMENTO_REQUEST })

		unidadMedicamentoSocket.emit('crear_unidadMedicamento', datosFormulario)

		unidadMedicamentoSocket.on('crear_unidadMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_UNIDAD_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_UNIDAD_MEDICAMENTO_EXITO, payload: data })
				dispatch(reset('FormularioUnidadMedicamento'))
			}
		})
	
	}
}

export function eliminarUnidadMedicamento(idUnidadMedicamento) {
	return (dispatch) => {
		// alert(idUnidadMedicamento)

		dispatch({ type: ELIMINAR_UNIDAD_MEDICAMENTO_REQUEST })

		unidadMedicamentoSocket.emit('eliminar_unidadMedicamento', { 
			id_unidadMedidaMedicamento: idUnidadMedicamento 
		})

		unidadMedicamentoSocket.on('eliminar_unidadMedicamento', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_UNIDAD_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_UNIDAD_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarUnidadMedicamento(idUnidadMedicamento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_UNIDAD_MEDICAMENTO_REQUEST })

		unidadMedicamentoSocket.emit('mostrar_unidadMedicamento', { 
			id_unidadMedidaMedicamento: idUnidadMedicamento 
		})

		unidadMedicamentoSocket.on('mostrar_unidadMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_UNIDAD_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_UNIDAD_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarUnidadMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_UNIDAD_MEDICAMENTO })
	}
}

export function editarUnidadMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_UNIDAD_MEDICAMENTO_REQUEST })

		unidadMedicamentoSocket.emit('editar_unidadMedicamento', datosFormulario)

		unidadMedicamentoSocket.on('editar_unidadMedicamento', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_UNIDAD_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_UNIDAD_MEDICAMENTO_EXITO, payload: data })
			}
		})

	}
}









