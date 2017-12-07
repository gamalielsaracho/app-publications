import {
	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_TRATAMIENTO,

	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO_TRATAMIENTO,

	LISTAR_MEDICAMENTOS_TRATAMIENTOS_REQUEST,
	LISTAR_MEDICAMENTOS_TRATAMIENTOS_EXITO,
	LISTAR_MEDICAMENTOS_TRATAMIENTOS_FALLO,

	// Create cuidad.
	CREAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	CREAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	CREAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	// Show departamento.
	MOSTRAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	MOSTRAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	MOSTRAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_MEDICAMENTO_TRATAMIENTO,

	// Editar departamento.
	EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO,

	// Delete departamento.
	ELIMINAR_MEDICAMENTO_TRATAMIENTO_REQUEST,
	ELIMINAR_MEDICAMENTO_TRATAMIENTO_EXITO,
	ELIMINAR_MEDICAMENTO_TRATAMIENTO_FALLO
} from './types'

import jwtDecode from 'jwt-decode'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var medicamentoTratamientoSocket = io.connect('http://localhost:3000/medicamentoTratamiento');

export function abrirFormularioCrearMedicamentoTratamiento() {
	return (dispatch) => {
		dispatch(reset('FormularioMedicamentoTratamiento'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MEDICAMENTO_TRATAMIENTO })
	}
}

export function abrirFormularioEditarMedicamentoTratamiento(idMedicamentoTratamiento) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST })

		medicamentoTratamientoSocket.emit('mostrar_medicamentoTratamiento_editar', { 
			id_medicamentoTratamiento: idMedicamentoTratamiento
		})

		medicamentoTratamientoSocket.on('mostrar_medicamentoTratamiento_editar', (data) => {
			// console.log('mostrar_medicamentoTratamiento_editar')
			// console.log(data)
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioMedicamentoTratamiento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MEDICAMENTO_TRATAMIENTO })
	}
}

export function listarMedicamentosTratamientosByIdTratamiento(idTratamiento) {
	return (dispatch) => {

		dispatch({ type: LISTAR_MEDICAMENTOS_TRATAMIENTOS_REQUEST })

		var medicamentoTratamientoSocket = io.connect('http://localhost:3000/medicamentoTratamiento');

		medicamentoTratamientoSocket.emit('listar_medicamentosXtratamientos_byIdTratamiento', {
			id_tratamiento: idTratamiento
		})

		medicamentoTratamientoSocket.on('listar_medicamentosXtratamientos_byIdTratamiento', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_MEDICAMENTOS_TRATAMIENTOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_MEDICAMENTOS_TRATAMIENTOS_EXITO, payload: data })
			}
		})
	}
}

export function crearMedicamentoTratamiento(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_MEDICAMENTO_TRATAMIENTO_REQUEST })


		medicamentoTratamientoSocket.emit('crear_medicamentoTratamiento', datosFormulario)
		
		medicamentoTratamientoSocket.on('crear_medicamentoTratamiento', (data) => {
			if(data.error) {
				dispatch({ type: CREAR_MEDICAMENTO_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch(reset('FormularioMedicamentoTratamiento'))
				dispatch({ type: CREAR_MEDICAMENTO_TRATAMIENTO_EXITO, payload: data })
			}
		})
	
	}
}

export function eliminarMedicamentoTratamiento(idMedicamentoTratamiento) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_MEDICAMENTO_TRATAMIENTO_REQUEST })

		medicamentoTratamientoSocket.emit('eliminar_medicamentoTratamiento', { 
			id_medicamentoTratamiento: idMedicamentoTratamiento,
			idPersonal: jwtDecode(localStorage.getItem('token')).id_personal
		})

		medicamentoTratamientoSocket.on('eliminar_medicamentoTratamiento', (data) => {
			if(data.error) {
				dispatch({ type: ELIMINAR_MEDICAMENTO_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_MEDICAMENTO_TRATAMIENTO_EXITO, payload: data })
			}
		})
	}
}


export function mostrarMedicamentoTratamiento(idMedicamentoTratamiento) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_MEDICAMENTO_TRATAMIENTO_REQUEST })

		medicamentoTratamientoSocket.emit('mostrar_medicamentoTratamiento', { 
			id_medicamentoTratamiento: idMedicamentoTratamiento
		})

		medicamentoTratamientoSocket.on('mostrar_medicamentoTratamiento', (data) => {
			if(data.error) {
				dispatch({ type: MOSTRAR_MEDICAMENTO_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_MEDICAMENTO_TRATAMIENTO_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarMedicamentoTratamiento() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_MEDICAMENTO_TRATAMIENTO })
	}
}

export function editarMedicamentoTratamiento(datosFormulario) {
	return (dispatch) => {
		datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		dispatch({ type: EDITAR_MEDICAMENTO_TRATAMIENTO_REQUEST })

		medicamentoTratamientoSocket.emit('editar_medicamentoTratamiento', datosFormulario)

		medicamentoTratamientoSocket.on('editar_medicamentoTratamiento', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_MEDICAMENTO_TRATAMIENTO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_MEDICAMENTO_TRATAMIENTO_EXITO, payload: data })
			}
		})

	}
}









