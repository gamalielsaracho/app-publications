import {
	ABRIR_FORMULARIO_CREAR_ROL,

	ABRIR_FORMULARIO_EDITAR_ROL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ROL_EXITO,
	ABRIR_FORMULARIO_EDITAR_ROL_FALLO,

	CERRAR_FORMULARIO_ROL,

	LISTAR_ROLES_REQUEST,
	LISTAR_ROLES_EXITO,
	LISTAR_ROLES_FALLO,

	// Create rol.
	CREAR_ROL_REQUEST,
	CREAR_ROL_EXITO,
	CREAR_ROL_FALLO,

	// Show rol.
	MOSTRAR_ROL_REQUEST,
	MOSTRAR_ROL_EXITO,
	MOSTRAR_ROL_FALLO,

	CERRAR_MODAL_MOSTRAR_ROL,

	// Editar Rol.
	EDITAR_ROL_REQUEST,
	EDITAR_ROL_EXITO,
	EDITAR_ROL_FALLO,

	// Delete Rol.
	ELIMINAR_ROL_REQUEST,
	ELIMINAR_ROL_EXITO,
	ELIMINAR_ROL_FALLO
} from './types'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

export function abrirFormularioCrearRol() {
	return (dispatch) => {
		dispatch(reset('FormularioRol'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ROL })
	}
}

export function abrirFormularioEditarRol(idRol) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ROL_REQUEST })

		socket.emit('mostrar_rol', { id_rol: idRol })

		socket.on('mostrar_rol', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ROL_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioRol() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ROL })
	}
}

export function listarRoles() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ROLES_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_roles', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ROLES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ROLES_EXITO, payload: data })
			}
		})
	}
}

export function crearRol(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_ROL_REQUEST })

		socket.emit('crear_rol', datosFormulario)
		socket.on('crear_rol', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_ROL_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioRol'))
	}
}

export function eliminarRole(idRol) {
	return (dispatch) => {
		// alert(idRol)

		dispatch({ type: ELIMINAR_ROL_REQUEST })

		// var socket = io('http://localhost:3000')

		socket.emit('eliminar_rol', { 
			id_rol: idRol,
			usuarioLogeado: jwtDecode(localStorage.getItem('token')).id_personal
		})

		socket.on('eliminar_rol', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ROL_EXITO, payload: data })
			}
		})
	}
}


export function mostrarRol(idRol) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ROL_REQUEST })

		socket.emit('mostrar_rol', { id_rol: idRol })

		socket.on('mostrar_rol', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ROL_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarRol() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_ROL })
	}
}

export function editarRol(datosFormulario) {
	return (dispatch) => {

		datosFormulario.usuarioLogeado = jwtDecode(localStorage.getItem('token')).id_personal


		dispatch({ type: EDITAR_ROL_REQUEST })

		socket.emit('editar_rol', datosFormulario)

		socket.on('editar_rol', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_ROL_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_ROL_EXITO, payload: data })
			}
		})

	}
}









