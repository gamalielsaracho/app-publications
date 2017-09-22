import {
	ABRIR_FORMULARIO_CREAR_TIPO_EXAMEN,

	ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_REQUEST,
	ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_EXITO,
	ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_FALLO,

	CERRAR_FORMULARIO_TIPO_EXAMEN,

	LISTAR_TIPOS_EXAMENES_REQUEST,
	LISTAR_TIPOS_EXAMENES_EXITO,
	LISTAR_TIPOS_EXAMENES_FALLO,

	// Create rol.
	CREAR_TIPO_EXAMEN_REQUEST,
	CREAR_TIPO_EXAMEN_EXITO,
	CREAR_TIPO_EXAMEN_FALLO,

	// Show rol.
	MOSTRAR_TIPO_EXAMEN_REQUEST,
	MOSTRAR_TIPO_EXAMEN_EXITO,
	MOSTRAR_TIPO_EXAMEN_FALLO,

	CERRAR_MODAL_MOSTRAR_TIPO_EXAMEN,

	// Editar Rol.
	EDITAR_TIPO_EXAMEN_REQUEST,
	EDITAR_TIPO_EXAMEN_EXITO,
	EDITAR_TIPO_EXAMEN_FALLO,

	// Delete Rol.
	ELIMINAR_TIPO_EXAMEN_REQUEST,
	ELIMINAR_TIPO_EXAMEN_EXITO,
	ELIMINAR_TIPO_EXAMEN_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var tipoExamenSocket = io.connect('http://localhost:3000/tipoExamen');

export function abrirFormularioCrearTipoExamen() {
	return (dispatch) => {
		dispatch(reset('FormularioTipoExamen'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_TIPO_EXAMEN })
	}
}

export function abrirFormularioEditarTipoExamen(idTipoExamen) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_REQUEST })

		tipoExamenSocket.emit('mostrar_tipoExamen', { id_tipoExamen: idTipoExamen })

		tipoExamenSocket.on('mostrar_tipoExamen', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_EXAMEN_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioTipoExamen() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_TIPO_EXAMEN })
	}
}

export function listarTiposExamenes() {
	return (dispatch) => {

		dispatch({ type: LISTAR_TIPOS_EXAMENES_REQUEST })

		var tipoExamenSocket = io.connect('http://localhost:3000/tipoExamen');

		tipoExamenSocket.on('listar_tiposExamenes', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_TIPOS_EXAMENES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_TIPOS_EXAMENES_EXITO, payload: data })
			}
		})
	}
}

export function crearTipoExamen(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_TIPO_EXAMEN_REQUEST })

		tipoExamenSocket.emit('crear_tipoExamen', datosFormulario)

		tipoExamenSocket.on('crear_tipoExamen', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_TIPO_EXAMEN_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_TIPO_EXAMEN_EXITO, payload: data })
				dispatch(reset('FormularioTipoExamen'))
			}
		})
	
	}
}

export function eliminarTipoExamen(idTipoExamen) {
	return (dispatch) => {
		// alert(idTipoExamen)

		dispatch({ type: ELIMINAR_TIPO_EXAMEN_REQUEST })

		tipoExamenSocket.emit('eliminar_tipoExamen', { id_tipoExamen: idTipoExamen })

		tipoExamenSocket.on('eliminar_tipoExamen', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_TIPO_EXAMEN_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_TIPO_EXAMEN_EXITO, payload: data })
			}
		})
	}
}


export function mostrarTipoExamen(idTipoExamen) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_TIPO_EXAMEN_REQUEST })

		tipoExamenSocket.emit('mostrar_tipoExamen', { id_tipoExamen: idTipoExamen })

		tipoExamenSocket.on('mostrar_tipoExamen', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_TIPO_EXAMEN_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_TIPO_EXAMEN_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarTipoExamen() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_TIPO_EXAMEN })
	}
}

export function editarTipoExamen(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_TIPO_EXAMEN_REQUEST })

		tipoExamenSocket.emit('editar_tipoExamen', datosFormulario)

		tipoExamenSocket.on('editar_tipoExamen', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_TIPO_EXAMEN_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_TIPO_EXAMEN_EXITO, payload: data })
			}
		})

	}
}









