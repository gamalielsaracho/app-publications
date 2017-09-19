import {
	ABRIR_FORMULARIO_CREAR_ACCION,

	ABRIR_FORMULARIO_EDITAR_ACCION_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ACCION_EXITO,
	ABRIR_FORMULARIO_EDITAR_ACCION_FALLO,

	CERRAR_FORMULARIO_ACCION,

	LISTAR_ACCIONES_REQUEST,
	LISTAR_ACCIONES_EXITO,
	LISTAR_ACCIONES_FALLO,

	// Create rol.
	CREAR_ACCION_REQUEST,
	CREAR_ACCION_EXITO,
	CREAR_ACCION_FALLO,

	// Show rol.
	MOSTRAR_ACCION_REQUEST,
	MOSTRAR_ACCION_EXITO,
	MOSTRAR_ACCION_FALLO,

	CERRAR_MODAL_MOSTRAR_ACCION,

	// Editar Rol.
	EDITAR_ACCION_REQUEST,
	EDITAR_ACCION_EXITO,
	EDITAR_ACCION_FALLO,

	// Delete Rol.
	ELIMINAR_ACCION_REQUEST,
	ELIMINAR_ACCION_EXITO,
	ELIMINAR_ACCION_FALLO 
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var accionSocket = io.connect('http://localhost:3000/accion');

export function abrirFormularioCrearAccion() {
	return (dispatch) => {
		dispatch(reset('FormularioAccion'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ACCION })
	}
}

export function abrirFormularioEditarAccion(idAccion) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ACCION_REQUEST })

		accionSocket.emit('mostrar_accion', { 
			id_accion: idAccion 
		})

		accionSocket.on('mostrar_accion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ACCION_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ACCION_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioAccion() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ACCION })
	}
}

export function listarAcciones() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ACCIONES_REQUEST })

		var accionSocket = io.connect('http://localhost:3000/accion');

		accionSocket.on('listar_acciones', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ACCIONES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ACCIONES_EXITO, payload: data })
			}
		})
	}
}

export function crearAccion(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_ACCION_REQUEST })

		accionSocket.emit('crear_accion', datosFormulario)

		accionSocket.on('crear_accion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_ACCION_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_ACCION_EXITO, payload: data })
				dispatch(reset('FormularioAccion'))
			}
		})
	
	}
}

export function eliminarAccion(idAccion) {
	return (dispatch) => {
		// alert(idAccion)

		dispatch({ type: ELIMINAR_ACCION_REQUEST })

		accionSocket.emit('eliminar_accion', { 
			id_accion: idAccion 
		})

		accionSocket.on('eliminar_accion', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ACCION_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ACCION_EXITO, payload: data })
			}
		})
	}
}


export function mostrarAccion(idAccion) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ACCION_REQUEST })

		accionSocket.emit('mostrar_accion', { 
			id_accion: idAccion 
		})

		accionSocket.on('mostrar_accion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ACCION_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ACCION_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarAccion() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_ACCION })
	}
}

export function editarAccion(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_ACCION_REQUEST })

		accionSocket.emit('editar_accion', datosFormulario)

		accionSocket.on('editar_accion', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_ACCION_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_ACCION_EXITO, payload: data })
			}
		})

	}
}









