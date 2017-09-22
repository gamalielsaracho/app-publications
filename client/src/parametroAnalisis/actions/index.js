import {
	ABRIR_FORMULARIO_CREAR_PARAMETRO_ANALISIS,

	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_FALLO,

	CERRAR_FORMULARIO_PARAMETRO_ANALISIS,

	LISTAR_PARAMETROS_ANALISIS_REQUEST,
	LISTAR_PARAMETROS_ANALISIS_EXITO,
	LISTAR_PARAMETROS_ANALISIS_FALLO,

	// Create rol.
	CREAR_PARAMETRO_ANALISIS_REQUEST,
	CREAR_PARAMETRO_ANALISIS_EXITO,
	CREAR_PARAMETRO_ANALISIS_FALLO,

	// Show rol.
	MOSTRAR_PARAMETRO_ANALISIS_REQUEST,
	MOSTRAR_PARAMETRO_ANALISIS_EXITO,
	MOSTRAR_PARAMETRO_ANALISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_PARAMETRO_ANALISIS,

	// Editar Rol.
	EDITAR_PARAMETRO_ANALISIS_REQUEST,
	EDITAR_PARAMETRO_ANALISIS_EXITO,
	EDITAR_PARAMETRO_ANALISIS_FALLO,

	// Delete Rol.
	ELIMINAR_PARAMETRO_ANALISIS_REQUEST,
	ELIMINAR_PARAMETRO_ANALISIS_EXITO,
	ELIMINAR_PARAMETRO_ANALISIS_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var parametroAnalisisSocket = io.connect('http://localhost:3000/parametroAnalisis');

export function abrirFormularioCrearParametroAnalisis() {
	return (dispatch) => {
		dispatch(reset('FormularioParametroAnalisis'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PARAMETRO_ANALISIS })
	}
}

export function abrirFormularioEditarParametroAnalisis(idParametroAnalisis) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('mostrar_parametroAnalisis', { 
			id_parametroAnalisis: idParametroAnalisis 
		})

		parametroAnalisisSocket.on('mostrar_parametroAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioParametroAnalisis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PARAMETRO_ANALISIS })
	}
}

export function listarParametrosAnalisis() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PARAMETROS_ANALISIS_REQUEST })

		var parametroAnalisisSocket = io.connect('http://localhost:3000/parametroAnalisis');

		parametroAnalisisSocket.on('listar_parametrosAnalisis', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PARAMETROS_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PARAMETROS_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function crearParametroAnalisis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('crear_parametroAnalisis', datosFormulario)

		parametroAnalisisSocket.on('crear_parametroAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_PARAMETRO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PARAMETRO_ANALISIS_EXITO, payload: data })
				dispatch(reset('FormularioParametroAnalisis'))
			}
		})
	
	}
}

export function eliminarParametroAnalisis(idParametroAnalisis) {
	return (dispatch) => {
		// alert(idParametroAnalisis)

		dispatch({ type: ELIMINAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('eliminar_parametroAnalisis', { 
			id_parametroAnalisis: idParametroAnalisis 
		})

		parametroAnalisisSocket.on('eliminar_parametroAnalisis', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PARAMETRO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PARAMETRO_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function mostrarParametroAnalisis(idParametroAnalisis) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('mostrar_parametroAnalisis', { 
			id_parametroAnalisis: idParametroAnalisis 
		})

		parametroAnalisisSocket.on('mostrar_parametroAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PARAMETRO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PARAMETRO_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarParametroAnalisis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PARAMETRO_ANALISIS })
	}
}

export function editarParametroAnalisis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('editar_parametroAnalisis', datosFormulario)

		parametroAnalisisSocket.on('editar_parametroAnalisis', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PARAMETRO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PARAMETRO_ANALISIS_EXITO, payload: data })
			}
		})

	}
}









