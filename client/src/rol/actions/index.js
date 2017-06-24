import {
	ABRIR_FORMULARIO_CREAR_ROL,
	CERRAR_FORMULARIO_CREAR_ROL,

	CREAR_ROL_REQUEST,
	CREAR_ROL_EXITO,
	CREAR_ROL_FALLO,

	LISTAR_ROLES_REQUEST,
	LISTAR_ROLES_EXITO,
	LISTAR_ROLES_FALLO
} from './types'

import {
	errorHandler,
	postData,
	getData,
	putData,
	deleteData
} from '../../globalActions'

import {API_URL} from '../../globalActions'

import { browserHistory } from 'react-router'
import {reset} from 'redux-form'

export function abrirFormularioRol() {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_CREAR_ROL })
	}
}

export function cerrarFormularioRol() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CREAR_ROL })
	}
}

export function crearRol(datosFormulario) {
	return (dispatch) => {
		const url = `/roles/crear`

		dispatch({ type: CREAR_ROL_REQUEST })

		postData(CREAR_ROL_EXITO, CREAR_ROL_FALLO, true, url, dispatch, datosFormulario)
	
		dispatch(reset('Crear'))
	}
}

export function listarRoles() {
	return (dispatch) => {
		const url = `/roles`

		dispatch({ type: LISTAR_ROLES_REQUEST })

		getData(LISTAR_ROLES_EXITO, LISTAR_ROLES_FALLO, true, url, dispatch)
	}
}










