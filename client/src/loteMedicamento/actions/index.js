import {
	ABRIR_FORMULARIO_CREAR_LOTE_MEDICAMENTO,

	ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_FALLO,

	CERRAR_FORMULARIO_LOTE_MEDICAMENTO,

	LISTAR_LOTES_MEDICAMENTOS_REQUEST,
	LISTAR_LOTES_MEDICAMENTOS_EXITO,
	LISTAR_LOTES_MEDICAMENTOS_FALLO,

	// Create rol.
	CREAR_LOTE_MEDICAMENTO_REQUEST,
	CREAR_LOTE_MEDICAMENTO_EXITO,
	CREAR_LOTE_MEDICAMENTO_FALLO,

	// Show rol.
	MOSTRAR_LOTE_MEDICAMENTO_REQUEST,
	MOSTRAR_LOTE_MEDICAMENTO_EXITO,
	MOSTRAR_LOTE_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_LOTE_MEDICAMENTO,

	// Editar Rol.
	EDITAR_LOTE_MEDICAMENTO_REQUEST,
	EDITAR_LOTE_MEDICAMENTO_EXITO,
	EDITAR_LOTE_MEDICAMENTO_FALLO,

	// Delete Rol.
	ELIMINAR_LOTE_MEDICAMENTO_REQUEST,
	ELIMINAR_LOTE_MEDICAMENTO_EXITO,
	ELIMINAR_LOTE_MEDICAMENTO_FALLO
} from './types'

import io from 'socket.io-client'

import moment from 'moment'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var loteSocket = io.connect('http://localhost:3000/loteMedicamento');

export function abrirFormularioCrearLoteMedicamento() {
	return (dispatch) => {
		dispatch(reset('FormularioLoteMedicamento'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_LOTE_MEDICAMENTO })
	}
}

export function abrirFormularioEditarLoteMedicamento(idLoteMedicamento) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_REQUEST })

		loteSocket.emit('mostrar_loteMedicamento_editar', { 
			id_loteMedicamento: idLoteMedicamento 
		})

		loteSocket.on('mostrar_loteMedicamento_editar', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				data.fechaVencimiento = moment(data.fechaVencimiento).format('YYYY-MM-DD')
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_LOTE_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioLoteMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_LOTE_MEDICAMENTO })
	}
}

export function listarLotesMedicamentos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_LOTES_MEDICAMENTOS_REQUEST })

		var loteSocket = io.connect('http://localhost:3000/loteMedicamento');

		loteSocket.on('listar_lotesMedicamentos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_LOTES_MEDICAMENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_LOTES_MEDICAMENTOS_EXITO, payload: data })
			}
		})
	}
}

export function crearLoteMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_LOTE_MEDICAMENTO_REQUEST })

		loteSocket.emit('crear_loteMedicamento', datosFormulario)

		loteSocket.on('crear_loteMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_LOTE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_LOTE_MEDICAMENTO_EXITO, payload: data })
				dispatch(reset('FormularioLoteMedicamento'))
			}
		})
	
	}
}

export function eliminarLoteMedicamento(idLoteMedicamento) {
	return (dispatch) => {
		// alert(idLoteMedicamento)

		dispatch({ type: ELIMINAR_LOTE_MEDICAMENTO_REQUEST })

		loteSocket.emit('eliminar_loteMedicamento', { 
			id_loteMedicamento: idLoteMedicamento 
		})

		loteSocket.on('eliminar_loteMedicamento', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_LOTE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_LOTE_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function mostrarLoteMedicamento(idLoteMedicamento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_LOTE_MEDICAMENTO_REQUEST })

		loteSocket.emit('mostrar_loteMedicamento', { 
			id_loteMedicamento: idLoteMedicamento 
		})

		loteSocket.on('mostrar_loteMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_LOTE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_LOTE_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarModalMostrarLoteMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_LOTE_MEDICAMENTO })
	}
}

export function editarLoteMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_LOTE_MEDICAMENTO_REQUEST })

		loteSocket.emit('editar_loteMedicamento', datosFormulario)

		loteSocket.on('editar_loteMedicamento', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_LOTE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_LOTE_MEDICAMENTO_EXITO, payload: data })
			}
		})

	}
}









