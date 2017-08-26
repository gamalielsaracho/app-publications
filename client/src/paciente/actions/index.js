import {
	ABRIR_FORMULARIO_CREAR_PACIENTE,

	ABRIR_FORMULARIO_EDITAR_PACIENTE_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_EXITO,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_FALLO,

	CERRAR_FORMULARIO_PACIENTE,

	LISTAR_PACIENTES_REQUEST,
	LISTAR_PACIENTES_EXITO,
	LISTAR_PACIENTES_FALLO,

	// Create rol.
	CREAR_PACIENTE_REQUEST,
	CREAR_PACIENTE_EXITO,
	CREAR_PACIENTE_FALLO,

	// Show rol.
	MOSTRAR_PACIENTE_REQUEST,
	MOSTRAR_PACIENTE_EXITO,
	MOSTRAR_PACIENTE_FALLO,

	CERRAR_MODAL_MOSTRAR_PACIENTE,

	// Editar Rol.
	EDITAR_PACIENTE_REQUEST,
	EDITAR_PACIENTE_EXITO,
	EDITAR_PACIENTE_FALLO,

	// Delete Rol.
	ELIMINAR_PACIENTE_REQUEST,
	ELIMINAR_PACIENTE_EXITO,
	ELIMINAR_PACIENTE_FALLO
} from './types'

import io from 'socket.io-client'
import { socket, formatDate } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearPaciente() {
	return (dispatch) => {
		dispatch(reset('FormularioPaciente'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PACIENTE })
	}
}

export function abrirFormularioEditarPaciente(idPaciente) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PACIENTE_REQUEST })

		socket.emit('mostrar_paciente_editar', { 
			id_paciente: idPaciente
		})

		socket.on('mostrar_paciente_editar', (data) => {

			data.fechaNacimiento = formatDate(data.fechaNacimiento)

			console.log(data)

			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PACIENTE_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PACIENTE_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPaciente() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PACIENTE })
	}
}

export function listarPacientes() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PACIENTES_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_pacientes', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PACIENTES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PACIENTES_EXITO, payload: data })
			}
		})
	}
}

export function crearPaciente(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PACIENTE_REQUEST })

		socket.emit('crear_paciente', datosFormulario)
		socket.on('crear_paciente', (data) => {

			console.log(data)

			if(data.error) {
				dispatch({ type: CREAR_PACIENTE_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PACIENTE_EXITO, payload: data })

				dispatch(reset('FormularioPaciente'))
			}
		})
	
	}
}

export function eliminarPaciente(idPaciente) {
	return (dispatch) => {
		// alert(idPaciente)

		dispatch({ type: ELIMINAR_PACIENTE_REQUEST })

		// var socket = io('http://localhost:3000')

		socket.emit('eliminar_paciente', {
			id_paciente: idPaciente
		})

		socket.on('eliminar_paciente', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PACIENTE_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PACIENTE_EXITO, payload: data })
			}
		})
	}
}

export function mostrarPaciente(idPaciente) {
	console.log('El id del Paciente es: '+idPaciente)

	return (dispatch) => {
		dispatch({ type: MOSTRAR_PACIENTE_REQUEST })

		socket.emit('mostrar_paciente', {
			id_paciente: idPaciente
		})

		socket.on('mostrar_paciente', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PACIENTE_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PACIENTE_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarPaciente() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PACIENTE })
	}
}

export function editarPaciente(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PACIENTE_REQUEST })

		socket.emit('editar_paciente', datosFormulario)

		socket.on('editar_paciente', (data) => {

			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_PACIENTE_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PACIENTE_EXITO, payload: data })
			}
		})

	}
}









