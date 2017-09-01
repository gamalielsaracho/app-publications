import {
	ABRIR_FORMULARIO_CREAR_NIVEL,

	ABRIR_FORMULARIO_EDITAR_NIVEL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_NIVEL_EXITO,
	ABRIR_FORMULARIO_EDITAR_NIVEL_FALLO,

	CERRAR_FORMULARIO_NIVEL,

	LISTAR_NIVELES_REQUEST,
	LISTAR_NIVELES_EXITO,
	LISTAR_NIVELES_FALLO,

	// Create rol.
	CREAR_NIVEL_REQUEST,
	CREAR_NIVEL_EXITO,
	CREAR_NIVEL_FALLO,

	// Show rol.
	MOSTRAR_NIVEL_REQUEST,
	MOSTRAR_NIVEL_EXITO,
	MOSTRAR_NIVEL_FALLO,

	CERRAR_MODAL_MOSTRAR_NIVEL,

	// Editar Rol.
	EDITAR_NIVEL_REQUEST,
	EDITAR_NIVEL_EXITO,
	EDITAR_NIVEL_FALLO,

	// Delete Rol.
	ELIMINAR_NIVEL_REQUEST,
	ELIMINAR_NIVEL_EXITO,
	ELIMINAR_NIVEL_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var nivelSocket = io.connect('http://localhost:3000/nivel');

export function abrirFormularioCrearNivel() {
	return (dispatch) => {
		dispatch(reset('FormularioNivel'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_NIVEL })
	}
}

export function abrirFormularioEditarNivel(idNivel) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_NIVEL_REQUEST })

		nivelSocket.emit('mostrar_nivel', { id_nivel: idNivel })

		nivelSocket.on('mostrar_nivel', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_NIVEL_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_NIVEL_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioNivel() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_NIVEL })
	}
}

export function listarNiveles() {
	return (dispatch) => {

		dispatch({ type: LISTAR_NIVELES_REQUEST })

		var nivelSocket = io.connect('http://localhost:3000/nivel');

		nivelSocket.on('listar_niveles', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_NIVELES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_NIVELES_EXITO, payload: data })
			}
		})
	}
}

export function crearNivel(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_NIVEL_REQUEST })

		nivelSocket.emit('crear_nivel', datosFormulario)

		nivelSocket.on('crear_nivel', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_NIVEL_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_NIVEL_EXITO, payload: data })
				dispatch(reset('FormularioNivel'))
			}
		})
	
	}
}

export function eliminarNivel(idNivel) {
	return (dispatch) => {
		// alert(idNivel)

		dispatch({ type: ELIMINAR_NIVEL_REQUEST })

		nivelSocket.emit('eliminar_nivel', { id_nivel: idNivel })

		nivelSocket.on('eliminar_nivel', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_NIVEL_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_NIVEL_EXITO, payload: data })
			}
		})
	}
}


export function mostrarNivel(idNivel) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_NIVEL_REQUEST })

		nivelSocket.emit('mostrar_nivel', { id_nivel: idNivel })

		nivelSocket.on('mostrar_nivel', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_NIVEL_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_NIVEL_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarNivel() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_NIVEL })
	}
}

export function editarNivel(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_NIVEL_REQUEST })

		nivelSocket.emit('editar_nivel', datosFormulario)

		nivelSocket.on('editar_nivel', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_NIVEL_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_NIVEL_EXITO, payload: data })
			}
		})

	}
}









