import {
	ABRIR_FORMULARIO_CREAR_FARMACEUTICA,

	ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_EXITO,
	ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_FALLO,

	CERRAR_FORMULARIO_FARMACEUTICA,

	LISTAR_FARMACEUTICAS_REQUEST,
	LISTAR_FARMACEUTICAS_EXITO,
	LISTAR_FARMACEUTICAS_FALLO,

	// Create rol.
	CREAR_FARMACEUTICA_REQUEST,
	CREAR_FARMACEUTICA_EXITO,
	CREAR_FARMACEUTICA_FALLO,

	// Show rol.
	MOSTRAR_FARMACEUTICA_REQUEST,
	MOSTRAR_FARMACEUTICA_EXITO,
	MOSTRAR_FARMACEUTICA_FALLO,

	CERRAR_MODAL_MOSTRAR_FARMACEUTICA,

	// Editar Rol.
	EDITAR_FARMACEUTICA_REQUEST,
	EDITAR_FARMACEUTICA_EXITO,
	EDITAR_FARMACEUTICA_FALLO,

	// Delete Rol.
	ELIMINAR_FARMACEUTICA_REQUEST,
	ELIMINAR_FARMACEUTICA_EXITO,
	ELIMINAR_FARMACEUTICA_FALLO
} from './types'

import io from 'socket.io-client'

import jwtDecode from 'jwt-decode'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var farmaceuticaSocket = io.connect('http://localhost:3000/farmaceutica');

export function abrirFormularioCrearFarmaceutica() { 
	return (dispatch) => {
		dispatch(reset('FormularioFarmaceutica'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_FARMACEUTICA })
	}
}

export function abrirFormularioEditarFarmaceutica(idFarmaceutica) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_REQUEST })

		farmaceuticaSocket.emit('mostrar_farmaceutica', { 
			id_farmaceutica: idFarmaceutica 
		})

		farmaceuticaSocket.on('mostrar_farmaceutica', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_FARMACEUTICA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioFarmaceutica() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_FARMACEUTICA })
	}
}

export function listarFarmaceuticas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_FARMACEUTICAS_REQUEST })

		var farmaceuticaSocket = io.connect('http://localhost:3000/farmaceutica');

		farmaceuticaSocket.on('listar_farmaceuticas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_FARMACEUTICAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_FARMACEUTICAS_EXITO, payload: data })
			}
		})
	}
}

export function crearFarmaceutica(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_FARMACEUTICA_REQUEST })

		farmaceuticaSocket.emit('crear_farmaceutica', datosFormulario)

		farmaceuticaSocket.on('crear_farmaceutica', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_FARMACEUTICA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_FARMACEUTICA_EXITO, payload: data })
				dispatch(reset('FormularioFarmaceutica'))
			}
		})
	
	}
}

export function eliminarFarmaceutica(idFarmaceutica) {
	return (dispatch) => {
		// alert(idFarmaceutica)

		dispatch({ type: ELIMINAR_FARMACEUTICA_REQUEST })

		farmaceuticaSocket.emit('eliminar_farmaceutica', {
			id_farmaceutica: idFarmaceutica,
			id_personal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		farmaceuticaSocket.on('eliminar_farmaceutica', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_FARMACEUTICA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_FARMACEUTICA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarFarmaceutica(idFarmaceutica) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_FARMACEUTICA_REQUEST })

		farmaceuticaSocket.emit('mostrar_farmaceutica', { 
			id_farmaceutica: idFarmaceutica 
		})

		farmaceuticaSocket.on('mostrar_farmaceutica', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_FARMACEUTICA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_FARMACEUTICA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarFarmaceutica() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_FARMACEUTICA })
	}
}

export function editarFarmaceutica(datosFormulario) {
	return (dispatch) => {
		datosFormulario.id_personal = jwtDecode(localStorage.getItem('token')).id_personal

		dispatch({ type: EDITAR_FARMACEUTICA_REQUEST })

		farmaceuticaSocket.emit('editar_farmaceutica', datosFormulario)

		farmaceuticaSocket.on('editar_farmaceutica', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_FARMACEUTICA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_FARMACEUTICA_EXITO, payload: data })
			}
		})

	}
}









