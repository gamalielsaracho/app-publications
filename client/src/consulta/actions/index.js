import {
	ABRIR_FORMULARIO_CREAR_CONSULTA,

	ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO,

	CERRAR_FORMULARIO_CONSULTA,

	LISTAR_CONSULTAS_REQUEST,
	LISTAR_CONSULTAS_EXITO,
	LISTAR_CONSULTAS_FALLO,

	// Create rol.
	CREAR_CONSULTA_REQUEST,
	CREAR_CONSULTA_EXITO,
	CREAR_CONSULTA_FALLO,

	// Show rol.
	MOSTRAR_CONSULTA_REQUEST,
	MOSTRAR_CONSULTA_EXITO,
	MOSTRAR_CONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_CONSULTA,

	// Editar Rol.
	EDITAR_CONSULTA_REQUEST,
	EDITAR_CONSULTA_EXITO,
	EDITAR_CONSULTA_FALLO,

	// Delete Rol.
	ELIMINAR_CONSULTA_REQUEST,
	ELIMINAR_CONSULTA_EXITO,
	ELIMINAR_CONSULTA_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var consultaSocket = io.connect('http://localhost:3000/consulta');

export function abrirFormularioCrearConsulta() {
	return (dispatch) => {
		dispatch(reset('FormularioConsulta'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CONSULTA })
	}
}

export function abrirFormularioEditarConsulta(idConsulta) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST })

		consultaSocket.emit('mostrar_consulta', { id_consulta: idConsulta })

		consultaSocket.on('mostrar_consulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CONSULTA })
	}
}

export function listarConsultas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CONSULTAS_REQUEST })

		var consultaSocket = io.connect('http://localhost:3000/consulta');

		consultaSocket.on('listar_consultas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_CONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CONSULTAS_EXITO, payload: data })
			}
		})
	}
}

export function crearConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_CONSULTA_REQUEST })

		consultaSocket.emit('crear_consulta', datosFormulario)

		consultaSocket.on('crear_consulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CONSULTA_EXITO, payload: data })
				dispatch(reset('FormularioConsulta'))
			}
		})
	
	}
}

export function eliminarConsulta(idConsulta) {
	return (dispatch) => {
		// alert(idConsulta)

		dispatch({ type: ELIMINAR_CONSULTA_REQUEST })

		consultaSocket.emit('eliminar_consulta', { id_consulta: idConsulta })

		consultaSocket.on('eliminar_consulta', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarConsulta(idConsulta) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CONSULTA_REQUEST })

		consultaSocket.emit('mostrar_consulta', { id_consulta: idConsulta })

		consultaSocket.on('mostrar_consulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_CONSULTA })
	}
}

export function editarConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CONSULTA_REQUEST })

		consultaSocket.emit('editar_consulta', datosFormulario)

		consultaSocket.on('editar_consulta', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CONSULTA_EXITO, payload: data })
			}
		})

	}
}








