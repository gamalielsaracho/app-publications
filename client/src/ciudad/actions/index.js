import {
	ABRIR_FORMULARIO_CREAR_CIUDAD,

	ABRIR_FORMULARIO_EDITAR_CIUDAD_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CIUDAD_EXITO,
	ABRIR_FORMULARIO_EDITAR_CIUDAD_FALLO,

	CERRAR_FORMULARIO_CIUDAD,

	LISTAR_CIUDADES_REQUEST,
	LISTAR_CIUDADES_EXITO,
	LISTAR_CIUDADES_FALLO,

	// Create cuidad.
	CREAR_CIUDAD_REQUEST,
	CREAR_CIUDAD_EXITO,
	CREAR_CIUDAD_FALLO,

	// Show ciudad.
	MOSTRAR_CIUDAD_REQUEST,
	MOSTRAR_CIUDAD_EXITO,
	MOSTRAR_CIUDAD_FALLO,

	CERRAR_MODAL_MOSTRAR_CIUDAD,

	// Editar ciudad.
	EDITAR_CIUDAD_REQUEST,
	EDITAR_CIUDAD_EXITO,
	EDITAR_CIUDAD_FALLO,

	// Delete ciudad.
	ELIMINAR_CIUDAD_REQUEST,
	ELIMINAR_CIUDAD_EXITO,
	ELIMINAR_CIUDAD_FALLO
} from './types'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearCiudad() {
	return (dispatch) => {
		dispatch(reset('FormularioCiudad'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CIUDAD })
	}
}

export function abrirFormularioEditarCiudad(idCiudad) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CIUDAD_REQUEST })

		socket.emit('mostrar_ciudad', { id_ciudad: idCiudad })

		socket.on('mostrar_ciudad', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CIUDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CIUDAD_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioCiudad() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CIUDAD })
	}
}

export function listarCiudades() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CIUDADES_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_ciudades', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_CIUDADES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CIUDADES_EXITO, payload: data })
			}
		})
	}
}

export function crearCiudad(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_CIUDAD_REQUEST })

		socket.emit('crear_ciudad', datosFormulario)
		socket.on('crear_ciudad', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_CIUDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CIUDAD_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioCiudad'))
	}
}

export function eliminarCiudad(idCiudad) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_CIUDAD_REQUEST })

		socket.emit('eliminar_ciudad', { id_ciudad: idCiudad })

		socket.on('eliminar_ciudad', (data) => {
			if(data.error) {
				dispatch({ type: ELIMINAR_CIUDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CIUDAD_EXITO, payload: data })
			}
		})
	}
}


export function mostrarCiudad(idCiudad) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CIUDAD_REQUEST })

		socket.emit('mostrar_ciudad', { id_ciudad: idCiudad })

		socket.on('mostrar_ciudad', (data) => {
			if(data.error) {
				dispatch({ type: MOSTRAR_CIUDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CIUDAD_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarCiudad() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_CIUDAD })
	}
}

export function editarCiudad(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CIUDAD_REQUEST })

		socket.emit('editar_ciudad', datosFormulario)

		socket.on('editar_ciudad', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CIUDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CIUDAD_EXITO, payload: data })
			}
		})

	}
}









