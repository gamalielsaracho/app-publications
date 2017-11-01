import {
	ABRIR_FORMULARIO_CREAR_UNIDAD_PARAMETRO_PRE,

	ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_EXITO,
	ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_FALLO,

	CERRAR_FORMULARIO_UNIDAD_PARAMETRO_PRE,

	LISTAR_UNIDADES_PARAMETRO_PRE_REQUEST,
	LISTAR_UNIDADES_PARAMETRO_PRE_EXITO,
	LISTAR_UNIDADES_PARAMETRO_PRE_FALLO,

	// Create rol.
	CREAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	CREAR_UNIDAD_PARAMETRO_PRE_EXITO,
	CREAR_UNIDAD_PARAMETRO_PRE_FALLO,

	// Show rol.
	MOSTRAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	MOSTRAR_UNIDAD_PARAMETRO_PRE_EXITO,
	MOSTRAR_UNIDAD_PARAMETRO_PRE_FALLO,

	CERRAR_MODAL_MOSTRAR_UNIDAD_PARAMETRO_PRE,

	// Editar Rol.
	EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	EDITAR_UNIDAD_PARAMETRO_PRE_EXITO,
	EDITAR_UNIDAD_PARAMETRO_PRE_FALLO,

	// Delete Rol.
	ELIMINAR_UNIDAD_PARAMETRO_PRE_REQUEST,
	ELIMINAR_UNIDAD_PARAMETRO_PRE_EXITO,
	ELIMINAR_UNIDAD_PARAMETRO_PRE_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var unidadParametroPreSocket = io.connect('http://localhost:3000/unidadParametroPre');

export function abrirFormularioCrearUnidadParametroPre() {
	return (dispatch) => {
		dispatch(reset('FormularioUnidadParametroPre'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_UNIDAD_PARAMETRO_PRE })
	}
}

export function abrirFormularioEditarUnidadParametroPre(idUnidadParametroPre) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST })

		unidadParametroPreSocket.emit('mostrar_unidadParametroPre', {
			id_unidadParametroPre: idUnidadParametroPre 
		})

		unidadParametroPreSocket.on('mostrar_unidadParametroPre', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_UNIDAD_PARAMETRO_PRE_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioUnidadParametroPre() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_UNIDAD_PARAMETRO_PRE })
	}
}

export function listarUnidadesParametroPre() {
	return (dispatch) => {

		dispatch({ type: LISTAR_UNIDADES_PARAMETRO_PRE_REQUEST })

		var unidadParametroPreSocket = io.connect('http://localhost:3000/unidadParametroPre');

		unidadParametroPreSocket.on('listar_unidadesParametroPre', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_UNIDADES_PARAMETRO_PRE_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_UNIDADES_PARAMETRO_PRE_EXITO, payload: data })
			}
		})
	}
}

export function crearUnidadParametroPre(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_UNIDAD_PARAMETRO_PRE_REQUEST })

		unidadParametroPreSocket.emit('crear_unidadParametroPre', datosFormulario)

		unidadParametroPreSocket.on('crear_unidadParametroPre', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_UNIDAD_PARAMETRO_PRE_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_UNIDAD_PARAMETRO_PRE_EXITO, payload: data })
				dispatch(reset('FormularioUnidadParametroPre'))
			}
		})
	
	}
}

export function eliminarUnidadParametroPre(idUnidadParametroPre) {
	return (dispatch) => {
		// alert(idUnidadParametroPre)

		dispatch({ type: ELIMINAR_UNIDAD_PARAMETRO_PRE_REQUEST })

		unidadParametroPreSocket.emit('eliminar_unidadParametroPre', { 
			id_unidadParametroPre: idUnidadParametroPre,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		unidadParametroPreSocket.on('eliminar_unidadParametroPre', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_UNIDAD_PARAMETRO_PRE_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_UNIDAD_PARAMETRO_PRE_EXITO, payload: data })
			}
		})
	}
}


export function mostrarUnidadParametroPre(idUnidadParametroPre) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_UNIDAD_PARAMETRO_PRE_REQUEST })

		unidadParametroPreSocket.emit('mostrar_unidadParametroPre', { 
			id_unidadParametroPre: idUnidadParametroPre 
		})

		unidadParametroPreSocket.on('mostrar_unidadParametroPre', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_UNIDAD_PARAMETRO_PRE_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_UNIDAD_PARAMETRO_PRE_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarUnidadParametroPre() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_UNIDAD_PARAMETRO_PRE })
	}
}

export function editarUnidadParametroPre(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_UNIDAD_PARAMETRO_PRE_REQUEST })

		unidadParametroPreSocket.emit('editar_unidadParametroPre', datosFormulario)

		unidadParametroPreSocket.on('editar_unidadParametroPre', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_UNIDAD_PARAMETRO_PRE_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_UNIDAD_PARAMETRO_PRE_EXITO, payload: data })
			}
		})

	}
}









