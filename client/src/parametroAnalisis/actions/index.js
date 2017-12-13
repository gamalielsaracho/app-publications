import {
	ABRIR_FORMULARIO_CREAR_PARAMETRO_ANALISIS,

	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_EXITO,
	ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_FALLO,

	CERRAR_FORMULARIO_PARAMETRO_ANALISIS,

	LISTAR_PARAMETROS_ANALISIS_BY_IDTIPOANALISIS_REQUEST,
	LISTAR_PARAMETROS_ANALISIS_BY_IDTIPOANALISIS_EXITO,
	LISTAR_PARAMETROS_ANALISIS_BY_IDTIPOANALISIS_FALLO,

	// Create rol.
	CREAR_PARAMETRO_ANALISIS_REQUEST,
	CREAR_PARAMETRO_ANALISIS_EXITO,
	CREAR_PARAMETRO_ANALISIS_FALLO,

	// Show rol.
	MOSTRAR_PARAMETRO_ANALISIS_REQUEST,
	MOSTRAR_PARAMETRO_ANALISIS_EXITO,
	MOSTRAR_PARAMETRO_ANALISIS_FALLO,

	// Editar Rol.
	EDITAR_PARAMETRO_ANALISIS_REQUEST,
	EDITAR_PARAMETRO_ANALISIS_EXITO,
	EDITAR_PARAMETRO_ANALISIS_FALLO,

	// Delete Rol.
	ELIMINAR_PARAMETRO_ANALISIS_REQUEST,
	ELIMINAR_PARAMETRO_ANALISIS_EXITO,
	ELIMINAR_PARAMETRO_ANALISIS_FALLO,


	LIMPIAR_MENSAJE_ERROR_PARAMETRO_ANALISIS
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

import jwtDecode from 'jwt-decode'

var parametroAnalisisSocket = io.connect('http://localhost:3000/parametroAnalisis');


export function limpiarMensajeErrorParametroAnalisis() {
	return (dispatch) => {
		dispatch({ type: LIMPIAR_MENSAJE_ERROR_PARAMETRO_ANALISIS })
	}
}


export function abrirFormularioCrearParametroAnalisis() {
	return (dispatch) => {
		dispatch(reset('FormularioParametroAnalisis'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PARAMETRO_ANALISIS })
	}
}

export function abrirFormularioEditarParametroAnalisis(idParametroAnalisis) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('mostrar_parametroAnalisis_editar', { 
			id_parametroAnalisis: idParametroAnalisis 
		})

		parametroAnalisisSocket.on('mostrar_parametroAnalisis_editar', (data) => {
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


export function listarParametrosAnalisisByIdTipoAnalisis(idTipoAnalisis) {
	return (dispatch) => {

		dispatch({ type: LISTAR_PARAMETROS_ANALISIS_BY_IDTIPOANALISIS_REQUEST })

		var parametroAnalisisSocket = io.connect('http://localhost:3000/parametroAnalisis');

		parametroAnalisisSocket.emit('listar_parametrosAnalisis_byIdTipoAnalisis', {
			id_tipoAnalisis: idTipoAnalisis
		})

		parametroAnalisisSocket.on('listar_parametrosAnalisis_byIdTipoAnalisis', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PARAMETROS_ANALISIS_BY_IDTIPOANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PARAMETROS_ANALISIS_BY_IDTIPOANALISIS_EXITO, payload: data })
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
			id_parametroAnalisis: idParametroAnalisis,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
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


export function editarParametroAnalisis(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal


		dispatch({ type: EDITAR_PARAMETRO_ANALISIS_REQUEST })

		parametroAnalisisSocket.emit('editar_parametroAnalisis', datosFormulario)

		parametroAnalisisSocket.on('editar_parametroAnalisis', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_PARAMETRO_ANALISIS_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PARAMETRO_ANALISIS_EXITO, payload: data })
			}
		})

	}
}









