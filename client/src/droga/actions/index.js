import {
	ABRIR_FORMULARIO_CREAR_DROGA,

	ABRIR_FORMULARIO_EDITAR_DROGA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DROGA_EXITO,
	ABRIR_FORMULARIO_EDITAR_DROGA_FALLO,

	CERRAR_FORMULARIO_DROGA,

	LISTAR_DROGAS_REQUEST,
	LISTAR_DROGAS_EXITO,
	LISTAR_DROGAS_FALLO,

	// Create rol.
	CREAR_DROGA_REQUEST,
	CREAR_DROGA_EXITO,
	CREAR_DROGA_FALLO,

	// Show rol.
	MOSTRAR_DROGA_REQUEST,
	MOSTRAR_DROGA_EXITO,
	MOSTRAR_DROGA_FALLO,

	CERRAR_MODAL_MOSTRAR_DROGA,

	// Editar Rol.
	EDITAR_DROGA_REQUEST,
	EDITAR_DROGA_EXITO,
	EDITAR_DROGA_FALLO,

	// Delete Rol.
	ELIMINAR_DROGA_REQUEST,
	ELIMINAR_DROGA_EXITO,
	ELIMINAR_DROGA_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var drogaSocket = io.connect('http://localhost:3000/droga');

export function abrirFormularioCrearDroga() {
	return (dispatch) => {
		dispatch(reset('FormularioDroga'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_DROGA })
	}
}

export function abrirFormularioEditarDroga(idDroga) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_DROGA_REQUEST })

		drogaSocket.emit('mostrar_droga', { id_droga: idDroga })

		drogaSocket.on('mostrar_droga', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DROGA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DROGA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioDroga() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_DROGA })
	}
}

export function listarDrogas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_DROGAS_REQUEST })

		var drogaSocket = io.connect('http://localhost:3000/droga');

		drogaSocket.on('listar_drogas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_DROGAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_DROGAS_EXITO, payload: data })
			}
		})
	}
}

export function crearDroga(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_DROGA_REQUEST })

		drogaSocket.emit('crear_droga', datosFormulario)

		drogaSocket.on('crear_droga', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_DROGA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_DROGA_EXITO, payload: data })
				dispatch(reset('FormularioDroga'))
			}
		})
	
	}
}

export function eliminarDroga(idDroga) {
	return (dispatch) => {
		// alert(idDroga)

		dispatch({ type: ELIMINAR_DROGA_REQUEST })

		drogaSocket.emit('eliminar_droga', { 
			id_droga: idDroga,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		drogaSocket.on('eliminar_droga', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_DROGA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_DROGA_EXITO, payload: data })
			}
		})
	}
}

export function mostrarDroga(idDroga) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_DROGA_REQUEST })

		drogaSocket.emit('mostrar_droga', { id_droga: idDroga })

		drogaSocket.on('mostrar_droga', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_DROGA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_DROGA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarModalMostrarDroga() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_DROGA })
	}
}

export function editarDroga(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_DROGA_REQUEST })

		drogaSocket.emit('editar_droga', datosFormulario)

		drogaSocket.on('editar_droga', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_DROGA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_DROGA_EXITO, payload: data })
			}
		})

	}
}









