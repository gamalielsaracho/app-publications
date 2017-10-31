import {
	ABRIR_FORMULARIO_CREAR_ALERGIA,

	ABRIR_FORMULARIO_EDITAR_ALERGIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ALERGIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_ALERGIA_FALLO,

	CERRAR_FORMULARIO_ALERGIA,

	LISTAR_ALERGIAS_REQUEST,
	LISTAR_ALERGIAS_EXITO,
	LISTAR_ALERGIAS_FALLO,

	// Create rol.
	CREAR_ALERGIA_REQUEST,
	CREAR_ALERGIA_EXITO,
	CREAR_ALERGIA_FALLO,

	// Show rol.
	MOSTRAR_ALERGIA_REQUEST,
	MOSTRAR_ALERGIA_EXITO,
	MOSTRAR_ALERGIA_FALLO,

	CERRAR_MODAL_MOSTRAR_ALERGIA,

	// Editar Rol.
	EDITAR_ALERGIA_REQUEST,
	EDITAR_ALERGIA_EXITO,
	EDITAR_ALERGIA_FALLO,

	// Delete Rol.
	ELIMINAR_ALERGIA_REQUEST,
	ELIMINAR_ALERGIA_EXITO,
	ELIMINAR_ALERGIA_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearAlergia() {
	return (dispatch) => {
		dispatch(reset('FormularioAlergia'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ALERGIA })
	}
}

export function abrirFormularioEditarAlergia(idAlergia) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ALERGIA_REQUEST })

		socket.emit('mostrar_alergia', { id_alergia: idAlergia })

		socket.on('mostrar_alergia', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ALERGIA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioAlergia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ALERGIA })
	}
}

export function listarAlergias() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ALERGIAS_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_alergias', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ALERGIAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ALERGIAS_EXITO, payload: data })
			}
		})
	}
}

export function crearAlergia(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_ALERGIA_REQUEST })

		socket.emit('crear_alergia', datosFormulario)
		socket.on('crear_alergia', (data) => {
			if(data.error) {
				dispatch({ type: CREAR_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch(reset('FormularioAlergia'))

				dispatch({ type: CREAR_ALERGIA_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarAlergia(idAlergia) {
	return (dispatch) => {
		// alert(idAlergia)

		dispatch({ type: ELIMINAR_ALERGIA_REQUEST })

		// var socket = io('http://localhost:3000')

		socket.emit('eliminar_alergia', {
			id_alergia: idAlergia,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		socket.on('eliminar_alergia', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ALERGIA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarAlergia(idAlergia) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ALERGIA_REQUEST })

		socket.emit('mostrar_alergia', { id_alergia: idAlergia })

		socket.on('mostrar_alergia', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ALERGIA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarAlergia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_ALERGIA })
	}
}

export function editarAlergia(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_ALERGIA_REQUEST })

		socket.emit('editar_alergia', datosFormulario)

		socket.on('editar_alergia', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_ALERGIA_EXITO, payload: data })
			}
		})

	}
}









