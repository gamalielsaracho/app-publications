import {
	ABRIR_FORMULARIO_CREAR_UNIDAD_ANALISIS,

	ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_FALLO,

	CERRAR_FORMULARIO_UNIDAD_ANALISIS,

	LISTAR_UNIDADES_ANALISIS_REQUEST,
	LISTAR_UNIDADES_ANALISIS_EXITO,
	LISTAR_UNIDADES_ANALISIS_FALLO,

	// Create rol.
	CREAR_UNIDAD_ANALISIS_REQUEST,
	CREAR_UNIDAD_ANALISIS_EXITO,
	CREAR_UNIDAD_ANALISIS_FALLO,

	// Show rol.
	MOSTRAR_UNIDAD_ANALISIS_REQUEST,
	MOSTRAR_UNIDAD_ANALISIS_EXITO,
	MOSTRAR_UNIDAD_ANALISIS_FALLO,

	CERRAR_MODAL_MOSTRAR_UNIDAD_ANALISIS,

	// Editar Rol.
	EDITAR_UNIDAD_ANALISIS_REQUEST,
	EDITAR_UNIDAD_ANALISIS_EXITO,
	EDITAR_UNIDAD_ANALISIS_FALLO,

	// Delete Rol.
	ELIMINAR_UNIDAD_ANALISIS_REQUEST,
	ELIMINAR_UNIDAD_ANALISIS_EXITO,
	ELIMINAR_UNIDAD_ANALISIS_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var unidadAnalisisSocket = io.connect('http://localhost:3000/unidadAnalisis');

export function abrirFormularioCrearUnidadAnalisis() {
	return (dispatch) => {
		dispatch(reset('FormularioUnidadAnalisis'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_UNIDAD_ANALISIS })
	}
}

export function abrirFormularioEditarUnidadAnalisis(idUnidadAnalisis) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_REQUEST })

		unidadAnalisisSocket.emit('mostrar_unidadAnalisis', { 
			id_unidadAnalisis: idUnidadAnalisis 
		})

		unidadAnalisisSocket.on('mostrar_unidadAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioUnidadAnalisis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_UNIDAD_ANALISIS })
	}
}

export function listarUnidadesAnalisis() {
	return (dispatch) => {

		dispatch({ type: LISTAR_UNIDADES_ANALISIS_REQUEST })

		var unidadAnalisisSocket = io.connect('http://localhost:3000/unidadAnalisis');

		unidadAnalisisSocket.on('listar_unidadesAnalisis', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_UNIDADES_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_UNIDADES_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function crearUnidadAnalisis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_UNIDAD_ANALISIS_REQUEST })

		unidadAnalisisSocket.emit('crear_unidadAnalisis', datosFormulario)

		unidadAnalisisSocket.on('crear_unidadAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_UNIDAD_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_UNIDAD_ANALISIS_EXITO, payload: data })
				dispatch(reset('FormularioUnidadAnalisis'))
			}
		})
	
	}
}

export function eliminarUnidadAnalisis(idUnidadAnalisis) {
	return (dispatch) => {
		// alert(idUnidadAnalisis)

		dispatch({ type: ELIMINAR_UNIDAD_ANALISIS_REQUEST })

		unidadAnalisisSocket.emit('eliminar_unidadAnalisis', { 
			id_unidadAnalisis: idUnidadAnalisis 
		})

		unidadAnalisisSocket.on('eliminar_unidadAnalisis', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_UNIDAD_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_UNIDAD_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function mostrarUnidadAnalisis(idUnidadAnalisis) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_UNIDAD_ANALISIS_REQUEST })

		unidadAnalisisSocket.emit('mostrar_unidadAnalisis', { 
			id_unidadAnalisis: idUnidadAnalisis 
		})

		unidadAnalisisSocket.on('mostrar_unidadAnalisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_UNIDAD_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_UNIDAD_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarUnidadAnalisis() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_UNIDAD_ANALISIS })
	}
}

export function editarUnidadAnalisis(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_UNIDAD_ANALISIS_REQUEST })

		unidadAnalisisSocket.emit('editar_unidadAnalisis', datosFormulario)

		unidadAnalisisSocket.on('editar_unidadAnalisis', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_UNIDAD_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_UNIDAD_ANALISIS_EXITO, payload: data })
			}
		})

	}
}









