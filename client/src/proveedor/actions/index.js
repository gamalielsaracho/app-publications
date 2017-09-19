import {
	ABRIR_FORMULARIO_CREAR_PROVEEDOR,

	ABRIR_FORMULARIO_EDITAR_PROVEEDOR_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PROVEEDOR_EXITO,
	ABRIR_FORMULARIO_EDITAR_PROVEEDOR_FALLO,

	CERRAR_FORMULARIO_PROVEEDOR,

	LISTAR_PROVEEDORES_REQUEST,
	LISTAR_PROVEEDORES_EXITO,
	LISTAR_PROVEEDORES_FALLO,

	// Create rol.
	CREAR_PROVEEDOR_REQUEST,
	CREAR_PROVEEDOR_EXITO,
	CREAR_PROVEEDOR_FALLO,

	// Show rol.
	MOSTRAR_PROVEEDOR_REQUEST,
	MOSTRAR_PROVEEDOR_EXITO,
	MOSTRAR_PROVEEDOR_FALLO,

	CERRAR_MODAL_MOSTRAR_PROVEEDOR,

	// Editar Rol.
	EDITAR_PROVEEDOR_REQUEST,
	EDITAR_PROVEEDOR_EXITO,
	EDITAR_PROVEEDOR_FALLO,

	// Delete Rol.
	ELIMINAR_PROVEEDOR_REQUEST,
	ELIMINAR_PROVEEDOR_EXITO,
	ELIMINAR_PROVEEDOR_FALLO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var proveedorSocket = io.connect('http://localhost:3000/proveedor');

export function abrirFormularioCrearProveedor() {
	return (dispatch) => {
		dispatch(reset('FormularioProveedor'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PROVEEDOR })
	}
}

export function abrirFormularioEditarProveedor(idProveedor) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PROVEEDOR_REQUEST })

		proveedorSocket.emit('mostrar_proveedor', { 
			id_proveedor: idProveedor 
		})

		proveedorSocket.on('mostrar_proveedor', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PROVEEDOR_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PROVEEDOR_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioProveedor() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PROVEEDOR })
	}
}

export function listarProveedores() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PROVEEDORES_REQUEST })

		var proveedorSocket = io.connect('http://localhost:3000/proveedor');

		proveedorSocket.on('listar_proveedores', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_PROVEEDORES_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PROVEEDORES_EXITO, payload: data })
			}
		})
	}
}

export function crearProveedor(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PROVEEDOR_REQUEST })

		proveedorSocket.emit('crear_proveedor', datosFormulario)

		proveedorSocket.on('crear_proveedor', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_PROVEEDOR_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PROVEEDOR_EXITO, payload: data })
				dispatch(reset('FormularioProveedor'))
			}
		})
	
	}
}

export function eliminarProveedor(idProveedor) {
	return (dispatch) => {
		// alert(idProveedor)

		dispatch({ type: ELIMINAR_PROVEEDOR_REQUEST })

		proveedorSocket.emit('eliminar_proveedor', { 
			id_proveedor: idProveedor 
		})

		proveedorSocket.on('eliminar_proveedor', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PROVEEDOR_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PROVEEDOR_EXITO, payload: data })
			}
		})
	}
}


export function mostrarProveedor(idProveedor) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PROVEEDOR_REQUEST })

		proveedorSocket.emit('mostrar_proveedor', { 
			id_proveedor: idProveedor
		})

		proveedorSocket.on('mostrar_proveedor', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PROVEEDOR_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PROVEEDOR_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarProveedor() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PROVEEDOR })
	}
}

export function editarProveedor(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PROVEEDOR_REQUEST })

		proveedorSocket.emit('editar_proveedor', datosFormulario)

		proveedorSocket.on('editar_proveedor', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PROVEEDOR_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PROVEEDOR_EXITO, payload: data })
			}
		})

	}
}









