import {
	ABRIR_FORMULARIO_CREAR_PARAMETRO_PRECONSULTA,

	ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_FALLO,

	CERRAR_FORMULARIO_PARAMETRO_PRECONSULTA,

	LISTAR_PARAMETROS_PRECONSULTA_REQUEST,
	LISTAR_PARAMETROS_PRECONSULTA_EXITO,
	LISTAR_PARAMETROS_PRECONSULTA_FALLO,

	// Create rol.
	CREAR_PARAMETRO_PRECONSULTA_REQUEST,
	CREAR_PARAMETRO_PRECONSULTA_EXITO,
	CREAR_PARAMETRO_PRECONSULTA_FALLO,

	// Show rol.
	MOSTRAR_PARAMETRO_PRECONSULTA_REQUEST,
	MOSTRAR_PARAMETRO_PRECONSULTA_EXITO,
	MOSTRAR_PARAMETRO_PRECONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_PARAMETRO_PRECONSULTA,

	// Editar Rol.
	EDITAR_PARAMETRO_PRECONSULTA_REQUEST,
	EDITAR_PARAMETRO_PRECONSULTA_EXITO,
	EDITAR_PARAMETRO_PRECONSULTA_FALLO,

	// Delete Rol.
	ELIMINAR_PARAMETRO_PRECONSULTA_REQUEST,
	ELIMINAR_PARAMETRO_PRECONSULTA_EXITO,
	ELIMINAR_PARAMETRO_PRECONSULTA_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var parametroPreConsultaSocket = io.connect('http://localhost:3000/parametroPreConsulta');

export function abrirFormularioCrearParametroPreConsulta() {
	return (dispatch) => {
		dispatch(reset('FormularioParametroPreConsulta'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PARAMETRO_PRECONSULTA })
	}
}

export function abrirFormularioEditarParametroPreConsulta(idParametroPreconsulta) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_REQUEST })

		parametroPreConsultaSocket.emit('mostrar_parametro_editar', { 
			id_parametroPreconsulta: idParametroPreconsulta 
		})

		parametroPreConsultaSocket.on('mostrar_parametro_editar', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioParametroPreConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PARAMETRO_PRECONSULTA })
	}
}

export function listarParametrosPreConsulta() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PARAMETROS_PRECONSULTA_REQUEST })

		var parametroPreConsultaSocket = io.connect('http://localhost:3000/parametroPreConsulta');

		parametroPreConsultaSocket.on('listar_parametros', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PARAMETROS_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PARAMETROS_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function crearParametroPreConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PARAMETRO_PRECONSULTA_REQUEST })

		parametroPreConsultaSocket.emit('crear_parametro', datosFormulario)

		parametroPreConsultaSocket.on('crear_parametro', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_PARAMETRO_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PARAMETRO_PRECONSULTA_EXITO, payload: data })
				dispatch(reset('FormularioParametroPreConsulta'))
			}
		})
	
	}
}

export function eliminarParametroPreConsulta(idParametroPreconsulta) {
	return (dispatch) => {
		// alert(idParametroPreconsulta)

		dispatch({ type: ELIMINAR_PARAMETRO_PRECONSULTA_REQUEST })

		parametroPreConsultaSocket.emit('eliminar_parametro', { 
			id_parametroPreconsulta: idParametroPreconsulta,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		parametroPreConsultaSocket.on('eliminar_parametro', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PARAMETRO_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PARAMETRO_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarParametroPreConsulta(idParametroPreconsulta) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PARAMETRO_PRECONSULTA_REQUEST })

		parametroPreConsultaSocket.emit('mostrar_parametro', { 
			id_parametroPreconsulta: idParametroPreconsulta 
		})

		parametroPreConsultaSocket.on('mostrar_parametro', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PARAMETRO_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PARAMETRO_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarParametroPreConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PARAMETRO_PRECONSULTA })
	}
}

export function editarParametroPreConsulta(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_PARAMETRO_PRECONSULTA_REQUEST })

		parametroPreConsultaSocket.emit('editar_parametro', datosFormulario)

		parametroPreConsultaSocket.on('editar_parametro', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PARAMETRO_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PARAMETRO_PRECONSULTA_EXITO, payload: data })
			}
		})

	}
}









