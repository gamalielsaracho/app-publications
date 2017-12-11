import {
	MOSTRAR_TRATAMIENTO_IDCONSULTA_REQUEST,
	MOSTRAR_TRATAMIENTO_IDCONSULTA_EXITO,
	MOSTRAR_TRATAMIENTO_IDCONSULTA_FALLO,

	CREAR_TRATAMIENTO_REQUEST,
	CREAR_TRATAMIENTO_EXITO,
	CREAR_TRATAMIENTO_FALLO,

	MOSTRAR_TRATAMIENTO_REQUEST,
	MOSTRAR_TRATAMIENTO_EXITO,
	MOSTRAR_TRATAMIENTO_FALLO,

	ELIMINAR_TRATAMIENTO_REQUEST,
	ELIMINAR_TRATAMIENTO_EXITO,
	ELIMINAR_TRATAMIENTO_FALLO,

	LIMPIAR_MENSAJE_ERROR_TRATAMIENTO,

	IMPRIMIR_TRATAMIENTO,

	// FIND LIST.
	LISTAR_TRATAMIENTOS_REQUEST,
	LISTAR_TRATAMIENTOS_EXITO,
	LISTAR_TRATAMIENTOS_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var tratamientoSocket = io.connect('http://localhost:3000/tratamiento');


export function listarTratamientos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_TRATAMIENTOS_REQUEST })

		var tratamientoSocket = io.connect('http://localhost:3000/tratamiento');

		tratamientoSocket.on('listar_tratamientos', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_TRATAMIENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_TRATAMIENTOS_EXITO, payload: data })
			}
		})
	}
}



export function imprimirTratamiento(idTratamiento) {
	return (dispatch) => {

		tratamientoSocket.emit('actualizar_tratamiento_imprimido', { 
			id_tratamiento: idTratamiento
		})

		tratamientoSocket.on('actualizar_tratamiento_imprimido', (data) => {

			if(data.error) {
				console.error(data.error)
			} else {
				dispatch({ type: IMPRIMIR_TRATAMIENTO })
			}
		})
	}
}

export function limpiarMensajeErrorTratamiento() {
	return (dispatch) => {
		dispatch({ type: LIMPIAR_MENSAJE_ERROR_TRATAMIENTO })
	}
}

export function mostrarTratamientoIdConsulta(idConsulta) {
	return (dispatch) => {

		dispatch({ type: MOSTRAR_TRATAMIENTO_IDCONSULTA_REQUEST })

		var tratamientoSocket = io.connect('http://localhost:3000/tratamiento');

		tratamientoSocket.emit('mostrar_tratamiento_idConsulta', {
			id_consulta: idConsulta
		})


		tratamientoSocket.on('mostrar_tratamiento_idConsulta', (data) => {
			console.log('mostrar_tratamiento_idConsulta')
			console.log(data)

			if(data.error) {
				dispatch({ type: MOSTRAR_TRATAMIENTO_IDCONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_TRATAMIENTO_IDCONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function crearTratamiento(idConsulta) {
	return (dispatch) => {

		dispatch({ type: CREAR_TRATAMIENTO_REQUEST })

		tratamientoSocket.emit('crear_tratamiento', {
			id_consulta: idConsulta
		})

		tratamientoSocket.on('crear_tratamiento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				
				dispatch({ type: CREAR_TRATAMIENTO_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarTratamiento(idTratamiento) {
	return (dispatch) => {
		// alert(idNivel)

		dispatch({ type: ELIMINAR_TRATAMIENTO_REQUEST })

		tratamientoSocket.emit('eliminar_tratamiento', { 
			id_tratamiento: idTratamiento
		})

		tratamientoSocket.on('eliminar_tratamiento', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_TRATAMIENTO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarTratamiento(idTratamiento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_TRATAMIENTO_REQUEST })

		tratamientoSocket.emit('mostrar_tratamiento', {
			id_tratamiento: idTratamiento
		})

		tratamientoSocket.on('mostrar_tratamiento', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_TRATAMIENTO_EXITO, payload: data })
			}
		})
	}
}

