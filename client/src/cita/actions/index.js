import {
	ABRIR_FORMULARIO_CREAR_CITA,

	ABRIR_FORMULARIO_EDITAR_CITA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CITA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CITA_FALLO,

	CERRAR_FORMULARIO_CITA,

	LISTAR_CITAS_REQUEST,
	LISTAR_CITAS_EXITO,
	LISTAR_CITAS_FALLO,

	// Create rol.
	CREAR_CITA_REQUEST,
	CREAR_CITA_EXITO,
	CREAR_CITA_FALLO,

	// Show rol.
	MOSTRAR_CITA_REQUEST,
	MOSTRAR_CITA_EXITO,
	MOSTRAR_CITA_FALLO,

	CERRAR_MODAL_MOSTRAR_CITA,

	// Editar Rol.
	EDITAR_CITA_REQUEST,
	EDITAR_CITA_EXITO,
	EDITAR_CITA_FALLO,

	// Delete Rol.
	ELIMINAR_CITA_REQUEST,
	ELIMINAR_CITA_EXITO,
	ELIMINAR_CITA_FALLO
} from './types'

import io from 'socket.io-client'

var citaSocket = io.connect('http://localhost:3000/cita');

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearCita() {
	return (dispatch) => {
		dispatch(reset('FormularioCita'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CITA })
	}
}

export function abrirFormularioEditarCita(idCita, fecha, hora) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CITA_REQUEST })

		citaSocket.emit('mostrar_cita', {
			id_cita: idCita 
			fecha: fecha,
			hora: hora
		})

		citaSocket.on('mostrar_cita', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CITA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioCita() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CITA })
	}
}

export function listarCitas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CITAS_REQUEST })

		citaSocket.on('listar_citas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_CITAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CITAS_EXITO, payload: data })
			}
		})
	}
}

export function crearCita(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_CITA_REQUEST })

		citaSocket.emit('crear_cita', datosFormulario)
		citaSocket.on('crear_cita', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CITA_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioCita'))
	}
}

export function eliminarCita(idCita, fecha, hora) {
	return (dispatch) => {
		// alert(idCita)

		dispatch({ type: ELIMINAR_CITA_REQUEST })

		citaSocket.emit('eliminar_cita', {
			id_cita: idCita 
			fecha: fecha,
			hora: hora
		})

		citaSocket.on('eliminar_cita', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CITA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarCita(idCita, fecha, hora) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CITA_REQUEST })

		citaSocket.emit('mostrar_cita', { 
			id_cita: idCita 
			fecha: fecha,
			hora: hora
		})

		citaSocket.on('mostrar_cita', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CITA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarCita() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_CITA })
	}
}

export function editarCita(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CITA_REQUEST })

		citaSocket.emit('editar_cita', datosFormulario)

		citaSocket.on('editar_cita', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CITA_EXITO, payload: data })
			}
		})

	}
}








