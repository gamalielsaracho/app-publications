import {
	ABRIR_FORMULARIO_CREAR_TIPO_CONSUMO,

	ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_EXITO,
	ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_FALLO,

	CERRAR_FORMULARIO_TIPO_CONSUMO,

	LISTAR_TIPOS_CONSUMOS_REQUEST,
	LISTAR_TIPOS_CONSUMOS_EXITO,
	LISTAR_TIPOS_CONSUMOS_FALLO,

	// Create rol.
	CREAR_TIPO_CONSUMO_REQUEST,
	CREAR_TIPO_CONSUMO_EXITO,
	CREAR_TIPO_CONSUMO_FALLO,

	// Show rol.
	MOSTRAR_TIPO_CONSUMO_REQUEST,
	MOSTRAR_TIPO_CONSUMO_EXITO,
	MOSTRAR_TIPO_CONSUMO_FALLO,

	CERRAR_MODAL_MOSTRAR_TIPO_CONSUMO,

	// Editar Rol.
	EDITAR_TIPO_CONSUMO_REQUEST,
	EDITAR_TIPO_CONSUMO_EXITO,
	EDITAR_TIPO_CONSUMO_FALLO,

	// Delete Rol.
	ELIMINAR_TIPO_CONSUMO_REQUEST,
	ELIMINAR_TIPO_CONSUMO_EXITO,
	ELIMINAR_TIPO_CONSUMO_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var tipoConsumoSocket = io.connect('http://localhost:3000/tipoConsumo');

export function abrirFormularioCrearTipoConsumo() {
	return (dispatch) => {
		dispatch(reset('FormularioTipoConsumo'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_TIPO_CONSUMO })
	}
}

export function abrirFormularioEditarTipoConsumo(idTipoConsumo) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_REQUEST })

		tipoConsumoSocket.emit('mostrar_tipoConsumo', { id_tipoConsumo: idTipoConsumo })

		tipoConsumoSocket.on('mostrar_tipoConsumo', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_TIPO_CONSUMO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioTipoConsumo() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_TIPO_CONSUMO })
	}
}

export function listarTiposConsumos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_TIPOS_CONSUMOS_REQUEST })

		var tipoConsumoSocket = io.connect('http://localhost:3000/tipoConsumo');

		tipoConsumoSocket.on('listar_tiposConsumos', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_TIPOS_CONSUMOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_TIPOS_CONSUMOS_EXITO, payload: data })
			}
		})
	}
}

export function crearTipoConsumo(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_TIPO_CONSUMO_REQUEST })

		tipoConsumoSocket.emit('crear_tipoConsumo', datosFormulario)

		tipoConsumoSocket.on('crear_tipoConsumo', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_TIPO_CONSUMO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_TIPO_CONSUMO_EXITO, payload: data })
				dispatch(reset('FormularioTipoConsumo'))
			}
		})
	
	}
}

export function eliminarTipoConsumo(idTipoConsumo) {
	return (dispatch) => {
		// alert(idTipoConsumo)

		dispatch({ type: ELIMINAR_TIPO_CONSUMO_REQUEST })

		tipoConsumoSocket.emit('eliminar_tipoConsumo', { id_tipoConsumo: idTipoConsumo })

		tipoConsumoSocket.on('eliminar_tipoConsumo', (data) => {
			// console.log(data)

			if(data.error) {
				dispatch({ type: ELIMINAR_TIPO_CONSUMO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_TIPO_CONSUMO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarTipoConsumo(idTipoConsumo) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_TIPO_CONSUMO_REQUEST })

		tipoConsumoSocket.emit('mostrar_tipoConsumo', { id_tipoConsumo: idTipoConsumo })

		tipoConsumoSocket.on('mostrar_tipoConsumo', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_TIPO_CONSUMO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_TIPO_CONSUMO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarTipoConsumo() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_TIPO_CONSUMO })
	}
}

export function editarTipoConsumo(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_TIPO_CONSUMO_REQUEST })

		tipoConsumoSocket.emit('editar_tipoConsumo', datosFormulario)

		tipoConsumoSocket.on('editar_tipoConsumo', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_TIPO_CONSUMO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_TIPO_CONSUMO_EXITO, payload: data })
			}
		})

	}
}









