import {
	ABRIR_FORMULARIO_CREAR_DIAGNOSTICO,

	ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_EXITO,
	ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_FALLO,

	CERRAR_FORMULARIO_DIAGNOSTICO,

	LISTAR_DIAGNOSTICOS_REQUEST,
	LISTAR_DIAGNOSTICOS_EXITO,
	LISTAR_DIAGNOSTICOS_FALLO,

	// Create rol.
	CREAR_DIAGNOSTICO_REQUEST,
	CREAR_DIAGNOSTICO_EXITO,
	CREAR_DIAGNOSTICO_FALLO,

	// Show rol.
	MOSTRAR_DIAGNOSTICO_REQUEST,
	MOSTRAR_DIAGNOSTICO_EXITO,
	MOSTRAR_DIAGNOSTICO_FALLO,

	CERRAR_MODAL_MOSTRAR_DIAGNOSTICO,

	// Editar Rol.
	EDITAR_DIAGNOSTICO_REQUEST,
	EDITAR_DIAGNOSTICO_EXITO,
	EDITAR_DIAGNOSTICO_FALLO,

	// Delete Rol.
	ELIMINAR_DIAGNOSTICO_REQUEST,
	ELIMINAR_DIAGNOSTICO_EXITO,
	ELIMINAR_DIAGNOSTICO_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var diagnosticoSocket = io.connect('http://localhost:3000/diagnostico');

export function abrirFormularioCrearDiagnostico() {
	return (dispatch) => {
		dispatch(reset('FormularioDiagnostico'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_DIAGNOSTICO })
	}
}

export function abrirFormularioEditarDiagnostico(idDiagnostico) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_REQUEST })

		diagnosticoSocket.emit('mostrar_diagnostico', { id_diagnostico: idDiagnostico })

		diagnosticoSocket.on('mostrar_diagnostico', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_DIAGNOSTICO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioDiagnostico() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_DIAGNOSTICO })
	}
}

export function listarDiagnosticos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_DIAGNOSTICOS_REQUEST })

		var diagnosticoSocket = io.connect('http://localhost:3000/diagnostico');

		diagnosticoSocket.on('listar_diagnosticos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_DIAGNOSTICOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_DIAGNOSTICOS_EXITO, payload: data })
			}
		})
	}
}

export function crearDiagnostico(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_DIAGNOSTICO_REQUEST })

		diagnosticoSocket.emit('crear_diagnostico', datosFormulario)

		diagnosticoSocket.on('crear_diagnostico', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_DIAGNOSTICO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_DIAGNOSTICO_EXITO, payload: data })
				dispatch(reset('FormularioDiagnostico'))
			}
		})
	
	}
}

export function eliminarDiagnostico(idDiagnostico) {
	return (dispatch) => {
		// alert(idDiagnostico)

		dispatch({ type: ELIMINAR_DIAGNOSTICO_REQUEST })

		diagnosticoSocket.emit('eliminar_diagnostico', { 
			id_diagnostico: idDiagnostico,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		diagnosticoSocket.on('eliminar_diagnostico', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_DIAGNOSTICO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_DIAGNOSTICO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarDiagnostico(idDiagnostico) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_DIAGNOSTICO_REQUEST })

		diagnosticoSocket.emit('mostrar_diagnostico', { id_diagnostico: idDiagnostico })

		diagnosticoSocket.on('mostrar_diagnostico', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_DIAGNOSTICO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_DIAGNOSTICO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarDiagnostico() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_DIAGNOSTICO })
	}
}

export function editarDiagnostico(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal
		
		dispatch({ type: EDITAR_DIAGNOSTICO_REQUEST })

		diagnosticoSocket.emit('editar_diagnostico', datosFormulario)

		diagnosticoSocket.on('editar_diagnostico', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_DIAGNOSTICO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_DIAGNOSTICO_EXITO, payload: data })
			}
		})

	}
}









