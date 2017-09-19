import {
	ABRIR_FORMULARIO_CREAR_MEDICAMENTO,

	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO,

	LISTAR_MEDICAMENTOS_REQUEST,
	LISTAR_MEDICAMENTOS_EXITO,
	LISTAR_MEDICAMENTOS_FALLO,

	// Create rol.
	CREAR_MEDICAMENTO_REQUEST,
	CREAR_MEDICAMENTO_EXITO,
	CREAR_MEDICAMENTO_FALLO,

	// Show rol.
	MOSTRAR_MEDICAMENTO_REQUEST,
	MOSTRAR_MEDICAMENTO_EXITO,
	MOSTRAR_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_MEDICAMENTO,

	// Editar Rol.
	EDITAR_MEDICAMENTO_REQUEST,
	EDITAR_MEDICAMENTO_EXITO,
	EDITAR_MEDICAMENTO_FALLO,

	// Delete Rol.
	ELIMINAR_MEDICAMENTO_REQUEST,
	ELIMINAR_MEDICAMENTO_EXITO,
	ELIMINAR_MEDICAMENTO_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var medicamentoSocket = io.connect('http://localhost:3000/medicamento');

export function abrirFormularioCrearMedicamento() {
	return (dispatch) => {
		dispatch(reset('FormularioMedicamento'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MEDICAMENTO })
	}
}

export function abrirFormularioEditarMedicamento(idMedicamento) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_REQUEST })

		medicamentoSocket.emit('mostrar_medicamento', { 
			id_medicamento: idMedicamento 
		})

		medicamentoSocket.on('mostrar_medicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MEDICAMENTO })
	}
}

export function listarMedicamentos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_MEDICAMENTOS_REQUEST })

		var medicamentoSocket = io.connect('http://localhost:3000/medicamento');

		medicamentoSocket.on('listar_medicamentos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_MEDICAMENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_MEDICAMENTOS_EXITO, payload: data })
			}
		})
	}
}

export function crearMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_MEDICAMENTO_REQUEST })

		medicamentoSocket.emit('crear_medicamento', datosFormulario)

		medicamentoSocket.on('crear_medicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_MEDICAMENTO_EXITO, payload: data })
				dispatch(reset('FormularioMedicamento'))
			}
		})
	
	}
}

export function eliminarMedicamento(idMedicamento) {
	return (dispatch) => {
		// alert(idMedicamento)

		dispatch({ type: ELIMINAR_MEDICAMENTO_REQUEST })

		medicamentoSocket.emit('eliminar_medicamento', { 
			id_medicamento: idMedicamento 
		})

		medicamentoSocket.on('eliminar_medicamento', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarMedicamento(idMedicamento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_MEDICAMENTO_REQUEST })

		medicamentoSocket.emit('mostrar_medicamento', { 
			id_medicamento: idMedicamento 
		})

		medicamentoSocket.on('mostrar_medicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_MEDICAMENTO })
	}
}

export function editarMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_MEDICAMENTO_REQUEST })

		medicamentoSocket.emit('editar_medicamento', datosFormulario)

		medicamentoSocket.on('editar_medicamento', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_MEDICAMENTO_EXITO, payload: data })
			}
		})

	}
}









