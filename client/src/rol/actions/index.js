import {
	ABRIR_FORMULARIO_CREAR_ROL,
	CERRAR_FORMULARIO_CREAR_ROL,

	LISTAR_ROLES_REQUEST,
	LISTAR_ROLES_EXITO,
	LISTAR_ROLES_FALLO,

	CREAR_ROL_REQUEST,
	CREAR_ROL_EXITO,
	CREAR_ROL_FALLO,

	MOSTRAR_ROL_REQUEST,
	MOSTRAR_ROL_EXITO,
	MOSTRAR_ROL_FALLO,

	CERRAR_MODAL_MOSTRAR_ROL,

	EDITAR_ROL_REQUEST,
	EDITAR_ROL_EXITO,
	EDITAR_ROL_FALLO,

	ELIMINAR_ROL_REQUEST,
	ELIMINAR_ROL_EXITO,
	ELIMINAR_ROL_FALLO
} from './types'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioRol() {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_CREAR_ROL })
	}
}

export function cerrarFormularioRol() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CREAR_ROL })
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
	
		dispatch(reset('Crear'))
	}
}

export function eliminarRole(idRol) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_ROL_REQUEST })

		// var socket = io('http://localhost:3000')

		socket.emit('eliminar_rol', { id_rol: idRol })

		socket.on('eliminar_rol', (data) => {

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











