import {
	ABRIR_FORMULARIO_CREAR_ESPECIALIDAD,

	ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_EXITO,
	ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_FALLO,

	CERRAR_FORMULARIO_ESPECIALIDAD,

	LISTAR_ESPECIALIDADES_REQUEST,
	LISTAR_ESPECIALIDADES_EXITO,
	LISTAR_ESPECIALIDADES_FALLO,

	// Create Especialidad.
	CREAR_ESPECIALIDAD_REQUEST,
	CREAR_ESPECIALIDAD_EXITO,
	CREAR_ESPECIALIDAD_FALLO,

	// Show Especialidad.
	MOSTRAR_ESPECIALIDAD_REQUEST,
	MOSTRAR_ESPECIALIDAD_EXITO,
	MOSTRAR_ESPECIALIDAD_FALLO,

	CERRAR_MODAL_MOSTRAR_ESPECIALIDAD,

	// Editar Especialidad.
	EDITAR_ESPECIALIDAD_REQUEST,
	EDITAR_ESPECIALIDAD_EXITO,
	EDITAR_ESPECIALIDAD_FALLO,

	// Delete Especialidad.
	ELIMINAR_ESPECIALIDAD_REQUEST,
	ELIMINAR_ESPECIALIDAD_EXITO,
	ELIMINAR_ESPECIALIDAD_FALLO
} from './types'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

// var especialidadSocket = io.connect('http://localhost:3000/especialidad');

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearEspecialidad() {
	return (dispatch) => {
		dispatch(reset('Formulario'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ESPECIALIDAD })
	}
}

export function abrirFormularioEditarEspecialidad(idEspecialidad) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_REQUEST })

		socket.emit('mostrar_especialidad', { id_especialidad: idEspecialidad })

		socket.on('mostrar_especialidad', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ESPECIALIDAD_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioEspecialidad() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ESPECIALIDAD })
	}
}

export function listarEspecialidades() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ESPECIALIDADES_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_especialidades', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ESPECIALIDADES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ESPECIALIDADES_EXITO, payload: data })
			}
		})
	}
}

export function crearEspecialidad(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_ESPECIALIDAD_REQUEST })

		socket.emit('crear_especialidad', datosFormulario)
		socket.on('crear_especialidad', (data) => {
			if(data.error) {
				dispatch({ type: CREAR_ESPECIALIDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_ESPECIALIDAD_EXITO , payload: data })
				dispatch(reset('Formulario'))
			}
		})
	
	}
}

export function eliminarEspecialidad(idEspecialidad) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_ESPECIALIDAD_REQUEST })

		socket.emit('eliminar_especialidad', { id_especialidad: idEspecialidad })

		socket.on('eliminar_especialidad', (data) => {

			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ESPECIALIDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ESPECIALIDAD_EXITO, payload: data })
			}
		})
	}
}


export function mostrarEspecialidad(idEspecialidad) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ESPECIALIDAD_REQUEST })

		socket.emit('mostrar_especialidad', { id_especialidad: idEspecialidad })

		socket.on('mostrar_especialidad', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ESPECIALIDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ESPECIALIDAD_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarEspecialidad() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_ESPECIALIDAD })
	}
}

export function editarEspecialidad(datosFormulario) {
	return (dispatch) => {

		console.log(datosFormulario)

		dispatch({ type: EDITAR_ESPECIALIDAD_REQUEST })

		socket.emit('editar_especialidad', datosFormulario)

		socket.on('editar_especialidad', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_ESPECIALIDAD_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_ESPECIALIDAD_EXITO, payload: data })
			}
		})

	}
}









