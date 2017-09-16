import {
	ABRIR_FORMULARIO_CREAR_NOMBRE_MEDICAMENTO,

	ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_FALLO,

	CERRAR_FORMULARIO_NOMBRE_MEDICAMENTO,

	LISTAR_NOMBRES_MEDICAMENTOS_REQUEST,
	LISTAR_NOMBRES_MEDICAMENTOS_EXITO,
	LISTAR_NOMBRES_MEDICAMENTOS_FALLO,

	// Create rol.
	CREAR_NOMBRE_MEDICAMENTO_REQUEST,
	CREAR_NOMBRE_MEDICAMENTO_EXITO,
	CREAR_NOMBRE_MEDICAMENTO_FALLO,

	// Show rol.
	MOSTRAR_NOMBRE_MEDICAMENTO_REQUEST,
	MOSTRAR_NOMBRE_MEDICAMENTO_EXITO,
	MOSTRAR_NOMBRE_MEDICAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_NOMBRE_MEDICAMENTO,

	// Editar Rol.
	EDITAR_NOMBRE_MEDICAMENTO_REQUEST,
	EDITAR_NOMBRE_MEDICAMENTO_EXITO,
	EDITAR_NOMBRE_MEDICAMENTO_FALLO,

	// Delete Rol.
	ELIMINAR_NOMBRE_MEDICAMENTO_REQUEST,
	ELIMINAR_NOMBRE_MEDICAMENTO_EXITO,
	ELIMINAR_NOMBRE_MEDICAMENTO_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var nombreMedSocket = io.connect('http://localhost:3000/nombreMedicamento');

export function abrirFormularioCrearNombreMedicamento() {
	return (dispatch) => {
		dispatch(reset('FormularioNombreMedicamento'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_NOMBRE_MEDICAMENTO })
	}
}

export function abrirFormularioEditarNombreMedicamento(idNombreMedicamento) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_REQUEST })

		nombreMedSocket.emit('mostrar_nombreMedicamento', { 
			id_nombreMedicamento: idNombreMedicamento 
		})

		nombreMedSocket.on('mostrar_nombreMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_NOMBRE_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioNombreMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_NOMBRE_MEDICAMENTO })
	}
}

export function listarNombresMedicamentos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_NOMBRES_MEDICAMENTOS_REQUEST })

		var nombreMedSocket = io.connect('http://localhost:3000/nombreMedicamento');

		nombreMedSocket.on('listar_nombresMedicamentos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_NOMBRES_MEDICAMENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_NOMBRES_MEDICAMENTOS_EXITO, payload: data })
			}
		})
	}
}

export function crearNombreMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_NOMBRE_MEDICAMENTO_REQUEST })

		nombreMedSocket.emit('crear_nombreMedicamento', datosFormulario)

		nombreMedSocket.on('crear_nombreMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_NOMBRE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_NOMBRE_MEDICAMENTO_EXITO, payload: data })
				dispatch(reset('FormularioNombreMedicamento'))
			}
		})
	
	}
}

export function eliminarNombreMedicamento(idNombreMedicamento) {
	return (dispatch) => {
		// alert(idNombreMedicamento)

		dispatch({ type: ELIMINAR_NOMBRE_MEDICAMENTO_REQUEST })

		nombreMedSocket.emit('eliminar_nombreMedicamento', { 
			id_nombreMedicamento: idNombreMedicamento 
		})

		nombreMedSocket.on('eliminar_nombreMedicamento', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_NOMBRE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_NOMBRE_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarNombreMedicamento(idNombreMedicamento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_NOMBRE_MEDICAMENTO_REQUEST })

		nombreMedSocket.emit('mostrar_nombreMedicamento', { 
			id_nombreMedicamento: idNombreMedicamento 
		})

		nombreMedSocket.on('mostrar_nombreMedicamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_NOMBRE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_NOMBRE_MEDICAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarNombreMedicamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_NOMBRE_MEDICAMENTO })
	}
}

export function editarNombreMedicamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_NOMBRE_MEDICAMENTO_REQUEST })

		nombreMedSocket.emit('editar_nombreMedicamento', datosFormulario)

		nombreMedSocket.on('editar_nombreMedicamento', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_NOMBRE_MEDICAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_NOMBRE_MEDICAMENTO_EXITO, payload: data })
			}
		})

	}
}









