import {

	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_FALLO,

	LISTAR_PRECONSULTA_PARAMETROS_REQUEST,
	LISTAR_PRECONSULTA_PARAMETROS_EXITO,
	LISTAR_PRECONSULTA_PARAMETROS_FALLO,

	// Create rol.
	CREAR_PRECONSULTA_PARAMETRO_REQUEST,
	CREAR_PRECONSULTA_PARAMETRO_EXITO,
	CREAR_PRECONSULTA_PARAMETRO_FALLO,

	CERRAR_FORMULARIO_PRECONSULTA_PARAMETRO,

	// Show rol.
	MOSTRAR_PRECONSULTA_PARAMETRO_REQUEST,
	MOSTRAR_PRECONSULTA_PARAMETRO_EXITO,
	MOSTRAR_PRECONSULTA_PARAMETRO_FALLO,

	CERRAR_MODAL_MOSTRAR_PRECONSULTA_PARAMETRO,

	// Editar Rol.
	EDITAR_PRECONSULTA_PARAMETRO_REQUEST,
	EDITAR_PRECONSULTA_PARAMETRO_EXITO,
	EDITAR_PRECONSULTA_PARAMETRO_FALLO,

	// Delete Rol.
	ELIMINAR_PRECONSULTA_PARAMETRO_REQUEST,
	ELIMINAR_PRECONSULTA_PARAMETRO_EXITO,
	ELIMINAR_PRECONSULTA_PARAMETRO_FALLO
} from './types'

import io from 'socket.io-client'

// PreConsulta x Parametro
var socketPreConsultaParametro = io.connect('http://localhost:3000/preConsultaParametro');

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'


export function abrirFormularioEditarPreConsultaParametro(idPreConsulta, idParametroPreconsulta) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_REQUEST })

		socketPreConsultaParametro.emit('mostrar_parametroPreConsulta_editar', { 
			id_preconsulta: idPreConsulta,
			id_parametroPreconsulta: idParametroPreconsulta
		})

		socketPreConsultaParametro.on('mostrar_parametroPreConsulta_editar', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_PARAMETRO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPreConsultaParametro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PRECONSULTA_PARAMETRO })
	}
}

export function listarPreConsultaParametros(idPreConsulta) {
	return (dispatch) => {

		dispatch({ type: LISTAR_PRECONSULTA_PARAMETROS_REQUEST })


		socketPreConsultaParametro.emit('listar_parametrosPreConsulta', {
			id_preconsulta: idPreConsulta
		})

		socketPreConsultaParametro.on('listar_parametrosPreConsulta', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: LISTAR_PRECONSULTA_PARAMETROS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PRECONSULTA_PARAMETROS_EXITO, payload: data })
			}
		})
	}
}

export function crearPreConsultaParametro(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PRECONSULTA_PARAMETRO_REQUEST })

		socketPreConsultaParametro.emit('crear_parametroPreConsulta', datosFormulario)

		socketPreConsultaParametro.on('crear_parametroPreConsulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_PRECONSULTA_PARAMETRO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PRECONSULTA_PARAMETRO_EXITO, payload: data })
				
				dispatch(reset('FormularioPreConsultaParametro'))
			}
		})
	
	}
}

export function eliminarPreConsultaParametro(idPreConsulta, idParametroPreconsulta) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_PRECONSULTA_PARAMETRO_REQUEST })

		// var socketPreConsultaParametro = io('http://localhost:3000')

		socketPreConsultaParametro.emit('eliminar_parametroPreConsulta', {
			id_preconsulta: idPreConsulta,
			id_parametroPreconsulta: idParametroPreconsulta
		})

		socketPreConsultaParametro.on('eliminar_parametroPreConsulta', (data) => {

			if(data.error) {
				dispatch({ type: ELIMINAR_PRECONSULTA_PARAMETRO_FALLO, payload: data.error })
			} else {
				
				dispatch({ type: ELIMINAR_PRECONSULTA_PARAMETRO_EXITO, payload: data })
				dispatch(reset('FormularioPreConsultaParametro'))
			}
		})
	}
}


export function mostrarPreConsultaParametro(idPreConsulta, idParametroPreconsulta) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PRECONSULTA_PARAMETRO_REQUEST })

		socketPreConsultaParametro.emit('mostrar_parametroPreConsulta', {
			id_preconsulta: idPreConsulta,
			id_parametroPreconsulta: idParametroPreconsulta
		})

		socketPreConsultaParametro.on('mostrar_parametroPreConsulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PRECONSULTA_PARAMETRO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PRECONSULTA_PARAMETRO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarPreConsultaParametro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PRECONSULTA_PARAMETRO })
	}
}

export function editarPreConsultaParametro(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PRECONSULTA_PARAMETRO_REQUEST })
		
		socketPreConsultaParametro.emit('editar_parametroPreConsulta', datosFormulario)

		socketPreConsultaParametro.on('editar_parametroPreConsulta', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PRECONSULTA_PARAMETRO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PRECONSULTA_PARAMETRO_EXITO, payload: data })
			}
		})

	}
}









