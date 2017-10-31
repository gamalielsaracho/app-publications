import {
	ABRIR_FORMULARIO_CREAR_AREA,

	ABRIR_FORMULARIO_EDITAR_AREA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_AREA_EXITO,
	ABRIR_FORMULARIO_EDITAR_AREA_FALLO,

	CERRAR_FORMULARIO_AREA,

	LISTAR_AREAS_REQUEST,
	LISTAR_AREAS_EXITO,
	LISTAR_AREAS_FALLO,

	// Create Area.
	CREAR_AREA_REQUEST,
	CREAR_AREA_EXITO,
	CREAR_AREA_FALLO,

	// Show Area.
	MOSTRAR_AREA_REQUEST,
	MOSTRAR_AREA_EXITO,
	MOSTRAR_AREA_FALLO,

	CERRAR_MODAL_MOSTRAR_AREA,

	// Editar Area.
	EDITAR_AREA_REQUEST,
	EDITAR_AREA_EXITO,
	EDITAR_AREA_FALLO,

	// Delete Area.
	ELIMINAR_AREA_REQUEST,
	ELIMINAR_AREA_EXITO,
	ELIMINAR_AREA_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearArea() {
	return (dispatch) => {
		dispatch(reset('FormularioArea'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_AREA })
	}
}

export function abrirFormularioEditarArea(idArea) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_AREA_REQUEST })

		socket.emit('mostrar_area', { id_area: idArea })

		socket.on('mostrar_area', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_AREA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_AREA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioArea() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_AREA })
	}
}

export function listarAreas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_AREAS_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_areas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_AREAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_AREAS_EXITO, payload: data })
			}
		})
	}
}

export function crearArea(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_AREA_REQUEST })

		socket.emit('crear_area', datosFormulario)
		socket.on('crear_area', (data) => {
			if(data.error) {
				dispatch({ type: CREAR_AREA_FALLO, payload: data.error })
			} else {
				dispatch(reset('FormularioArea'))

				dispatch({ type: CREAR_AREA_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarArea(idArea) {
	return (dispatch) => {
		// alert(idArea)

		dispatch({ type: ELIMINAR_AREA_REQUEST })

		// var socket = io('http://localhost:3000')

		socket.emit('eliminar_area', { 
			id_area: idArea,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		socket.on('eliminar_area', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_AREA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_AREA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarArea(idArea) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_AREA_REQUEST })

		socket.emit('mostrar_area', { id_area: idArea })

		socket.on('mostrar_area', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_AREA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_AREA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarArea() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_AREA })
	}
}

export function editarArea(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		dispatch({ type: EDITAR_AREA_REQUEST })

		socket.emit('editar_area', datosFormulario)

		socket.on('editar_area', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_AREA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_AREA_EXITO, payload: data })
			}
		})

	}
}









