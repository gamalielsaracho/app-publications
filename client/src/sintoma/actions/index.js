import {
	ABRIR_FORMULARIO_CREAR_SINTOMA,

	ABRIR_FORMULARIO_EDITAR_SINTOMA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_SINTOMA_EXITO,
	ABRIR_FORMULARIO_EDITAR_SINTOMA_FALLO,

	CERRAR_FORMULARIO_SINTOMA,

	LISTAR_SINTOMAS_REQUEST,
	LISTAR_SINTOMAS_EXITO,
	LISTAR_SINTOMAS_FALLO,

	// Create rol.
	CREAR_SINTOMA_REQUEST,
	CREAR_SINTOMA_EXITO,
	CREAR_SINTOMA_FALLO,

	// Show rol.
	MOSTRAR_SINTOMA_REQUEST,
	MOSTRAR_SINTOMA_EXITO,
	MOSTRAR_SINTOMA_FALLO,

	CERRAR_MODAL_MOSTRAR_SINTOMA,

	// Editar Rol.
	EDITAR_SINTOMA_REQUEST,
	EDITAR_SINTOMA_EXITO,
	EDITAR_SINTOMA_FALLO,

	// Delete Rol.
	ELIMINAR_SINTOMA_REQUEST,
	ELIMINAR_SINTOMA_EXITO,
	ELIMINAR_SINTOMA_FALLO
} from './types'

import io from 'socket.io-client'

import jwtDecode from 'jwt-decode'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var sintomaSocket = io.connect('http://localhost:3000/sintoma');

export function abrirFormularioCrearSintoma() {
	return (dispatch) => {
		dispatch(reset('FormularioSintoma'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_SINTOMA })
	}
}

export function abrirFormularioEditarSintoma(idSintoma) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_SINTOMA_REQUEST })

		sintomaSocket.emit('mostrar_sintoma', { id_sintoma: idSintoma })

		sintomaSocket.on('mostrar_sintoma', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_SINTOMA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_SINTOMA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioSintoma() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_SINTOMA })
	}
}

export function listarSintomas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_SINTOMAS_REQUEST })

		var sintomaSocket = io.connect('http://localhost:3000/sintoma');

		sintomaSocket.on('listar_sintomas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_SINTOMAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_SINTOMAS_EXITO, payload: data })
			}
		})
	}
}

export function crearSintoma(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_SINTOMA_REQUEST })

		sintomaSocket.emit('crear_sintoma', datosFormulario)

		sintomaSocket.on('crear_sintoma', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_SINTOMA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_SINTOMA_EXITO, payload: data })
				dispatch(reset('FormularioSintoma'))
			}
		})
	
	}
}

export function eliminarSintoma(idSintoma) {
	return (dispatch) => {
		// alert(idSintoma)

		dispatch({ type: ELIMINAR_SINTOMA_REQUEST })

		sintomaSocket.emit('eliminar_sintoma', {
			id_sintoma: idSintoma,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		sintomaSocket.on('eliminar_sintoma', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_SINTOMA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_SINTOMA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarSintoma(idSintoma) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_SINTOMA_REQUEST })

		sintomaSocket.emit('mostrar_sintoma', { id_sintoma: idSintoma })

		sintomaSocket.on('mostrar_sintoma', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_SINTOMA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_SINTOMA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarSintoma() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_SINTOMA })
	}
}

export function editarSintoma(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_SINTOMA_REQUEST })

		sintomaSocket.emit('editar_sintoma', datosFormulario)

		sintomaSocket.on('editar_sintoma', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_SINTOMA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_SINTOMA_EXITO, payload: data })
			}
		})

	}
}









