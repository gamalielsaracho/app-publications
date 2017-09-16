import {
	ABRIR_FORMULARIO_CREAR_PRESENTACION,

	ABRIR_FORMULARIO_EDITAR_PRESENTACION_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRESENTACION_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRESENTACION_FALLO,

	CERRAR_FORMULARIO_PRESENTACION,

	LISTAR_PRESENTACIONES_REQUEST,
	LISTAR_PRESENTACIONES_EXITO,
	LISTAR_PRESENTACIONES_FALLO,

	// Create rol.
	CREAR_PRESENTACION_REQUEST,
	CREAR_PRESENTACION_EXITO,
	CREAR_PRESENTACION_FALLO,

	// Show rol.
	MOSTRAR_PRESENTACION_REQUEST,
	MOSTRAR_PRESENTACION_EXITO,
	MOSTRAR_PRESENTACION_FALLO,

	CERRAR_MODAL_MOSTRAR_PRESENTACION,

	// Editar Rol.
	EDITAR_PRESENTACION_REQUEST,
	EDITAR_PRESENTACION_EXITO,
	EDITAR_PRESENTACION_FALLO,

	// Delete Rol.
	ELIMINAR_PRESENTACION_REQUEST,
	ELIMINAR_PRESENTACION_EXITO,
	ELIMINAR_PRESENTACION_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var presentacionSocket = io.connect('http://localhost:3000/presentacion');

export function abrirFormularioCrearPresentacion() {
	return (dispatch) => {
		dispatch(reset('FormularioPresentacion'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PRESENTACION })
	}
}

export function abrirFormularioEditarPresentacion(idPresentacion) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRESENTACION_REQUEST })

		presentacionSocket.emit('mostrar_presentacion', { id_presentacion: idPresentacion })

		presentacionSocket.on('mostrar_presentacion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRESENTACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRESENTACION_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPresentacion() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PRESENTACION })
	}
}

export function listarPresentaciones() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PRESENTACIONES_REQUEST })

		var presentacionSocket = io.connect('http://localhost:3000/presentacion');

		presentacionSocket.on('listar_presentaciones', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PRESENTACIONES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PRESENTACIONES_EXITO, payload: data })
			}
		})
	}
}

export function crearPresentacion(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PRESENTACION_REQUEST })

		presentacionSocket.emit('crear_presentacion', datosFormulario)

		presentacionSocket.on('crear_presentacion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_PRESENTACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PRESENTACION_EXITO, payload: data })
				dispatch(reset('FormularioPresentacion'))
			}
		})
	
	}
}

export function eliminarPresentacion(idPresentacion) {
	return (dispatch) => {
		// alert(idPresentacion)

		dispatch({ type: ELIMINAR_PRESENTACION_REQUEST })

		presentacionSocket.emit('eliminar_presentacion', { id_presentacion: idPresentacion })

		presentacionSocket.on('eliminar_presentacion', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PRESENTACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PRESENTACION_EXITO, payload: data })
			}
		})
	}
}


export function mostrarPresentacion(idPresentacion) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PRESENTACION_REQUEST })

		presentacionSocket.emit('mostrar_presentacion', { id_presentacion: idPresentacion })

		presentacionSocket.on('mostrar_presentacion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PRESENTACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PRESENTACION_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarPresentacion() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PRESENTACION })
	}
}

export function editarPresentacion(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PRESENTACION_REQUEST })

		presentacionSocket.emit('editar_presentacion', datosFormulario)

		presentacionSocket.on('editar_presentacion', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PRESENTACION_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PRESENTACION_EXITO, payload: data })
			}
		})

	}
}









