import {
	LISTAR_ANALISIS_REQUEST,
	LISTAR_ANALISIS_EXITO,
	LISTAR_ANALISIS_FALLO,

	// Create rol.
	CREAR_ANALISIS_REQUEST,
	CREAR_ANALISIS_EXITO,
	CREAR_ANALISIS_FALLO,

	// Show rol.
	MOSTRAR_ANALISIS_REQUEST,
	MOSTRAR_ANALISIS_EXITO,
	MOSTRAR_ANALISIS_FALLO,

	MOSTRAR_ANALISIS_VISTA_PREVIA_REQUEST,
	MOSTRAR_ANALISIS_VISTA_PREVIA_EXITO,
	MOSTRAR_ANALISIS_VISTA_PREVIA_FALLO,

	MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_REQUEST,
	MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_EXITO,
	MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_FALLO,

	// Delete Rol.
	ELIMINAR_ANALISIS_REQUEST,
	ELIMINAR_ANALISIS_EXITO,
	ELIMINAR_ANALISIS_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var analisisSocket = io.connect('http://localhost:3000/analisis');

export function listarAnalisis() {
	return (dispatch) => {

		dispatch({ type: LISTAR_ANALISIS_REQUEST })

		var analisisSocket = io.connect('http://localhost:3000/analisis');

		analisisSocket.on('listar_analisis', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_ANALISIS_EXITO, payload: data })
			}
		})
	}
}

export function crearAnalisis(datosObtenidos) {
	return (dispatch) => {

		dispatch({ type: CREAR_ANALISIS_REQUEST })

		analisisSocket.emit('crear_analisis', datosObtenidos)

		analisisSocket.on('crear_analisis', (data) => {
			// console.log(data)
			
			if(data.error) {
				dispatch({ type: CREAR_ANALISIS_FALLO, payload: data.error })
			} else {
				browserHistory.push(`/dashboard/solicitudes-laboratorio/${data.id_analisisSolicitado}/analisis/${data.id_analisis}/analisis-tipos`)

				dispatch({ type: CREAR_ANALISIS_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarAnalisis(urlToRedirect, idAnalisis) {
	return (dispatch) => {
		// alert(idAnalisis)

		dispatch({ type: ELIMINAR_ANALISIS_REQUEST })

		analisisSocket.emit('eliminar_analisis', { id_analisis: idAnalisis })

		analisisSocket.on('eliminar_analisis', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_ANALISIS_EXITO, payload: data })
				browserHistory.push(urlToRedirect)
			}
		})
	}
}


export function mostrarAnalisis(idAnalisis) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ANALISIS_REQUEST })

		analisisSocket.emit('mostrar_analisis', { id_analisis: idAnalisis })

		analisisSocket.on('mostrar_analisis', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ANALISIS_EXITO, payload: data })
			}
		})
	}
}


export function mostrarAnalisisVistaPrevia(idAnalisis) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ANALISIS_VISTA_PREVIA_REQUEST })

		analisisSocket.emit('mostrar_analisis_vista_previa', { id_analisis: idAnalisis })

		analisisSocket.on('mostrar_analisis_vista_previa', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ANALISIS_VISTA_PREVIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ANALISIS_VISTA_PREVIA_EXITO, payload: data })
			}
		})
	}
}

export function mostrarmostrarAnalisisPorIdAnalisisSolicitado(idAnalisisSolicitado) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_REQUEST })

		analisisSocket.emit('mostrar_por_idAnalisisSolicitado', { 
			id_analisisSolicitado: idAnalisisSolicitado
		})

		analisisSocket.on('mostrar_por_idAnalisisSolicitado', (data) => {
			// console.log(data)

			if(data.error) {
				dispatch({ type: MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ANALISIS_POR_ID_ANALISIS_SOLICITADO_EXITO, payload: data })
			}
		})
	}
}