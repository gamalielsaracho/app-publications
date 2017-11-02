import {
	ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS,

	ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_FALLO,

	CERRAR_FORMULARIO_TIPO_ANALISIS,

	LISTAR_TIPOS_ANALISIS_REQUEST,
	LISTAR_TIPOS_ANALISIS_EXITO,
	LISTAR_TIPOS_ANALISIS_FALLO,

	// Create rol.
	CREAR_TIPO_ANALISIS_REQUEST,
	CREAR_TIPO_ANALISIS_EXITO,
	CREAR_TIPO_ANALISIS_FALLO,

	// Show rol.
	MOSTRAR_TIPO_ANALISIS_REQUEST,
	MOSTRAR_TIPO_ANALISIS_EXITO,
	MOSTRAR_TIPO_ANALISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_TIPO_ANALISIS,

	// Editar Rol.
	EDITAR_TIPO_ANALISIS_REQUEST,
	EDITAR_TIPO_ANALISIS_EXITO,
	EDITAR_TIPO_ANALISIS_FALLO,

	// Delete Rol.
	ELIMINAR_TIPO_ANALISIS_REQUEST,
	ELIMINAR_TIPO_ANALISIS_EXITO,
	ELIMINAR_TIPO_ANALISIS_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var tipoAnalisisSocket = io.connect('http://localhost:3000/tipoAnalisis');

export function abrirFormularioCrearTipoAnalisis() {
	return (dispatch) => {
		dispatch(reset('FormularioTipoAnalisis'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_TIPO_ANALISIS })
	}
}

export function abrirFormularioEditarTipoAnalisis(idTipoAnalisis) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_REQUEST })

		tipoAnalisisSocket.emit('mostrar_tipoAnalisis', { 
			id_tipoAnalisis: idTipoAnalisis 
		})

		tipoAnalisisSocket.on('mostrar_tipoAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioTipoAnalisis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_TIPO_ANALISIS })
	}
}

export function listarTiposAnalisis() {
	return (dispatch) => {

		dispatch({ type: LISTAR_TIPOS_ANALISIS_REQUEST })

		var tipoAnalisisSocket = io.connect('http://localhost:3000/tipoAnalisis');

		tipoAnalisisSocket.on('listar_tiposAnalisis', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_TIPOS_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_TIPOS_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function crearTipoAnalisis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_TIPO_ANALISIS_REQUEST })

		tipoAnalisisSocket.emit('crear_tipoAnalisis', datosFormulario)

		tipoAnalisisSocket.on('crear_tipoAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_TIPO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_TIPO_ANALISIS_EXITO, payload: data })
				dispatch(reset('FormularioTipoAnalisis'))
			}
		})
	
	}
}

export function eliminarTipoAnalisis(idTipoAnalisis) {
	return (dispatch) => {
		// alert(idTipoAnalisis)

		dispatch({ type: ELIMINAR_TIPO_ANALISIS_REQUEST })

		tipoAnalisisSocket.emit('eliminar_tipoAnalisis', { 
			id_tipoAnalisis: idTipoAnalisis,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		tipoAnalisisSocket.on('eliminar_tipoAnalisis', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_TIPO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_TIPO_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function mostrarTipoAnalisis(idTipoAnalisis) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_TIPO_ANALISIS_REQUEST })

		tipoAnalisisSocket.emit('mostrar_tipoAnalisis', { 
			id_tipoAnalisis: idTipoAnalisis 
		})

		tipoAnalisisSocket.on('mostrar_tipoAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_TIPO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_TIPO_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarTipoAnalisis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_TIPO_ANALISIS })
	}
}

export function editarTipoAnalisis(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_TIPO_ANALISIS_REQUEST })

		tipoAnalisisSocket.emit('editar_tipoAnalisis', datosFormulario)

		tipoAnalisisSocket.on('editar_tipoAnalisis', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_TIPO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_TIPO_ANALISIS_EXITO, payload: data })
			}
		})

	}
}









