import {
	ABRIR_FORMULARIO_CREAR_ANALISIS_SOLICITADO,

	ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_EXITO,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_FALLO,

	CERRAR_FORMULARIO_ANALISIS_SOLICITADO,

	LISTAR_ANALISIS_SOLICITADOS_REQUEST,
	LISTAR_ANALISIS_SOLICITADOS_EXITO,
	LISTAR_ANALISIS_SOLICITADOS_FALLO,

	// Create rol.
	CREAR_ANALISIS_SOLICITADO_REQUEST,
	CREAR_ANALISIS_SOLICITADO_EXITO,
	CREAR_ANALISIS_SOLICITADO_FALLO,

	// Show rol.
	MOSTRAR_ANALISIS_SOLICITADO_REQUEST,
	MOSTRAR_ANALISIS_SOLICITADO_EXITO,
	MOSTRAR_ANALISIS_SOLICITADO_FALLO,

	// Editar Rol.
	EDITAR_ANALISIS_SOLICITADO_REQUEST,
	EDITAR_ANALISIS_SOLICITADO_EXITO,
	EDITAR_ANALISIS_SOLICITADO_FALLO,

	// Delete Rol.
	ELIMINAR_ANALISIS_SOLICITADO_REQUEST,
	ELIMINAR_ANALISIS_SOLICITADO_EXITO,
	ELIMINAR_ANALISIS_SOLICITADO_FALLO
} from './types'

import io from 'socket.io-client'
import moment from 'moment'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var analisisSolicitadoSocket = io.connect('http://localhost:3000/analisisSolicitado');

export function abrirFormularioCrearAnalisisSolicitado() {
	return (dispatch) => {
		dispatch(reset('FormularioAnalisisSolicitado'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_ANALISIS_SOLICITADO })
	}
}


export function abrirFormularioEditarAnalisisSolicitado(idAnalisisSolicitado) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_REQUEST })

		analisisSolicitadoSocket.emit('mostrar_analisisSolicitado_editar', { 
			id_analisisSolicitado: idAnalisisSolicitado 
		})

		analisisSolicitadoSocket.on('mostrar_analisisSolicitado_editar', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_FALLO, payload: data.error })
			} else {
				data.fechaArealizar = moment(data.fechaArealizar).format('YYYY-MM-DD')
				
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_ANALISIS_SOLICITADO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarFormularioAnalisisSolicitado() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_ANALISIS_SOLICITADO })
	}
}


export function listarAnalisisSolicitados() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ANALISIS_SOLICITADOS_REQUEST })

		var analisisSolicitadoSocket = io.connect('http://localhost:3000/analisisSolicitado');

		analisisSolicitadoSocket.on('listar_analisisSolicitados', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ANALISIS_SOLICITADOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ANALISIS_SOLICITADOS_EXITO, payload: data })
			}
		})
	}
}


// Para el historial Clínico.
export function listarAnalisisSolicitadosPorIdPaciente(IdPaciente) {
	return (dispatch) => {

		dispatch({ type: LISTAR_ANALISIS_SOLICITADOS_REQUEST })

		// var analisisSolicitadoSocket = io.connect('http://localhost:3000/analisisSolicitado');

		analisisSolicitadoSocket.emit('listar_analisisSolicitados_porIdPaciente', { 
			id_paciente: IdPaciente 
		})

		analisisSolicitadoSocket.on('listar_analisisSolicitados_porIdPaciente', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ANALISIS_SOLICITADOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ANALISIS_SOLICITADOS_EXITO, payload: data })
			}
		})
	}
}


export function crearAnalisisSolicitado(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_ANALISIS_SOLICITADO_REQUEST })

		analisisSolicitadoSocket.emit('crear_analisisSolicitado', datosFormulario)

		analisisSolicitadoSocket.on('crear_analisisSolicitado', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_ANALISIS_SOLICITADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_ANALISIS_SOLICITADO_EXITO, payload: data })
				dispatch(reset('FormularioAnalisisSolicitado'))
			}
		})
	
	}
}


export function eliminarAnalisisSolicitado(idAnalisisSolicitado, urlToRedirect) {
	return (dispatch) => {
		// alert(idAnalisisSolicitado)

		dispatch({ type: ELIMINAR_ANALISIS_SOLICITADO_REQUEST })

		analisisSolicitadoSocket.emit('eliminar_analisisSolicitado', { 
			id_analisisSolicitado: idAnalisisSolicitado 
		})

		analisisSolicitadoSocket.on('eliminar_analisisSolicitado', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ANALISIS_SOLICITADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ANALISIS_SOLICITADO_EXITO, payload: data })
				
				browserHistory.push(urlToRedirect)
			}
		})
	}
}


export function mostrarAnalisisSolicitado(idAnalisisSolicitado) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ANALISIS_SOLICITADO_REQUEST })
		// let condition = {}

		// condition.showBy = showBy
		// condition.id_data = idData

		analisisSolicitadoSocket.emit('mostrar_analisisSolicitado', {
			id_analisisSolicitado: idAnalisisSolicitado
		})

		analisisSolicitadoSocket.on('mostrar_analisisSolicitado', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ANALISIS_SOLICITADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ANALISIS_SOLICITADO_EXITO, payload: data })
			}
		})
	}
}


export function editarAnalisisSolicitado(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_ANALISIS_SOLICITADO_REQUEST })

		analisisSolicitadoSocket.emit('editar_analisisSolicitado', datosFormulario)

		analisisSolicitadoSocket.on('editar_analisisSolicitado', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_ANALISIS_SOLICITADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_ANALISIS_SOLICITADO_EXITO, payload: data })
			}
		})

	}
}









