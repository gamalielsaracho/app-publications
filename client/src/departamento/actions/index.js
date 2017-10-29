import {
	ABRIR_FORMULARIO_CREAR_DEPARTAMENTO,

	ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_FALLO,

	CERRAR_FORMULARIO_DEPARTAMENTO,

	LISTAR_DEPARTAMENTOS_REQUEST,
	LISTAR_DEPARTAMENTOS_EXITO,
	LISTAR_DEPARTAMENTOS_FALLO,

	// Create cuidad.
	CREAR_DEPARTAMENTO_REQUEST,
	CREAR_DEPARTAMENTO_EXITO,
	CREAR_DEPARTAMENTO_FALLO,

	// Show departamento.
	MOSTRAR_DEPARTAMENTO_REQUEST,
	MOSTRAR_DEPARTAMENTO_EXITO,
	MOSTRAR_DEPARTAMENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_DEPARTAMENTO,

	// Editar departamento.
	EDITAR_DEPARTAMENTO_REQUEST,
	EDITAR_DEPARTAMENTO_EXITO,
	EDITAR_DEPARTAMENTO_FALLO,

	// Delete departamento.
	ELIMINAR_DEPARTAMENTO_REQUEST,
	ELIMINAR_DEPARTAMENTO_EXITO,
	ELIMINAR_DEPARTAMENTO_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'
import { socket } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearDepartamento() {
	return (dispatch) => {
		dispatch(reset('FormularioDepartamento'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_DEPARTAMENTO })
	}
}

export function abrirFormularioEditarDepartamento(idDepartamento) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_REQUEST })

		socket.emit('mostrar_departamento', { id_departamento: idDepartamento })

		socket.on('mostrar_departamento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DEPARTAMENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioDepartamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_DEPARTAMENTO })
	}
}

export function listarDepartamentos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_DEPARTAMENTOS_REQUEST })

		var socket = io('http://localhost:3000')

		socket.on('listar_departamentos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_DEPARTAMENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_DEPARTAMENTOS_EXITO, payload: data })
			}
		})
	}
}

export function crearDepartamento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_DEPARTAMENTO_REQUEST })

		socket.emit('crear_departamento', datosFormulario)
		socket.on('crear_departamento', (data) => {
			if(data.error) {
				dispatch({ type: CREAR_DEPARTAMENTO_FALLO, payload: data.error })
			} else {
				dispatch(reset('FormularioDepartamento'))
				dispatch({ type: CREAR_DEPARTAMENTO_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarDepartamento(idDepartamento) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_DEPARTAMENTO_REQUEST })

		socket.emit('eliminar_departamento', { 
			id_departamento: idDepartamento,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		socket.on('eliminar_departamento', (data) => {
			if(data.error) {
				dispatch({ type: ELIMINAR_DEPARTAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_DEPARTAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarDepartamento(idDepartamento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_DEPARTAMENTO_REQUEST })

		socket.emit('mostrar_departamento', { id_departamento: idDepartamento })

		socket.on('mostrar_departamento', (data) => {
			if(data.error) {
				dispatch({ type: MOSTRAR_DEPARTAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_DEPARTAMENTO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarDepartamento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_DEPARTAMENTO })
	}
}

export function editarDepartamento(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		dispatch({ type: EDITAR_DEPARTAMENTO_REQUEST })

		socket.emit('editar_departamento', datosFormulario)

		socket.on('editar_departamento', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_DEPARTAMENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_DEPARTAMENTO_EXITO, payload: data })
			}
		})

	}
}









