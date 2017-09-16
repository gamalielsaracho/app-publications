import {
	ABRIR_FORMULARIO_CREAR_DISIS,

	ABRIR_FORMULARIO_EDITAR_DISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_DISIS_FALLO,

	CERRAR_FORMULARIO_DISIS,

	LISTAR_DISIS_REQUEST,
	LISTAR_DISIS_EXITO,
	LISTAR_DISIS_FALLO,

	// Create rol.
	CREAR_DISIS_REQUEST,
	CREAR_DISIS_EXITO,
	CREAR_DISIS_FALLO,

	// Show rol.
	MOSTRAR_DISIS_REQUEST,
	MOSTRAR_DISIS_EXITO,
	MOSTRAR_DISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_DISIS,

	// Editar Rol.
	EDITAR_DISIS_REQUEST,
	EDITAR_DISIS_EXITO,
	EDITAR_DISIS_FALLO,

	// Delete Rol.
	ELIMINAR_DISIS_REQUEST,
	ELIMINAR_DISIS_EXITO,
	ELIMINAR_DISIS_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var dosisSocket = io.connect('http://localhost:3000/dosis');

export function abrirFormularioCrearDosis() {
	return (dispatch) => {
		dispatch(reset('FormularioDosis'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_DISIS })
	}
}

export function abrirFormularioEditarDosis(idDosis) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_DISIS_REQUEST })

		dosisSocket.emit('mostrar_dosis', { id_dosis: idDosis })

		dosisSocket.on('mostrar_dosis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DISIS_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioDosis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_DISIS })
	}
}

export function listarDosis() {
	return (dispatch) => {

		dispatch({ type: LISTAR_DISIS_REQUEST })

		var dosisSocket = io.connect('http://localhost:3000/dosis');

		dosisSocket.on('listar_dosis', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_DISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_DISIS_EXITO, payload: data })
			}
		})
	}
}

export function crearDosis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_DISIS_REQUEST })

		dosisSocket.emit('crear_dosis', datosFormulario)

		dosisSocket.on('crear_dosis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_DISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_DISIS_EXITO, payload: data })
				dispatch(reset('FormularioDosis'))
			}
		})
	
	}
}

export function eliminarDosis(idDosis) {
	return (dispatch) => {
		// alert(idDosis)

		dispatch({ type: ELIMINAR_DISIS_REQUEST })

		dosisSocket.emit('eliminar_dosis', { id_dosis: idDosis })

		dosisSocket.on('eliminar_dosis', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_DISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_DISIS_EXITO, payload: data })
			}
		})
	}
}


export function mostrarDosis(idDosis) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_DISIS_REQUEST })

		dosisSocket.emit('mostrar_dosis', { id_dosis: idDosis })

		dosisSocket.on('mostrar_dosis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_DISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_DISIS_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarDosis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_DISIS })
	}
}

export function editarDosis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_DISIS_REQUEST })

		dosisSocket.emit('editar_dosis', datosFormulario)

		dosisSocket.on('editar_dosis', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_DISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_DISIS_EXITO, payload: data })
			}
		})

	}
}









