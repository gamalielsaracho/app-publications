import {
	ABRIR_FORMULARIO_CREAR_PACIENTE_ALERGIA,

	ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_FALLO,

	CERRAR_FORMULARIO_PACIENTE_ALERGIA,

	LISTAR_PACIENTE_ALERGIAS_REQUEST,
	LISTAR_PACIENTE_ALERGIAS_EXITO,
	LISTAR_PACIENTE_ALERGIAS_FALLO,

	// Create rol.
	CREAR_PACIENTE_ALERGIA_REQUEST,
	CREAR_PACIENTE_ALERGIA_EXITO,
	CREAR_PACIENTE_ALERGIA_FALLO,

	// Show rol.
	MOSTRAR_PACIENTE_ALERGIA_REQUEST,
	MOSTRAR_PACIENTE_ALERGIA_EXITO,
	MOSTRAR_PACIENTE_ALERGIA_FALLO,

	CERRAR_MODAL_MOSTRAR_PACIENTE_ALERGIA,

	// Editar Rol.
	EDITAR_PACIENTE_ALERGIA_REQUEST,
	EDITAR_PACIENTE_ALERGIA_EXITO,
	EDITAR_PACIENTE_ALERGIA_FALLO,

	// Delete Rol.
	ELIMINAR_PACIENTE_ALERGIA_REQUEST,
	ELIMINAR_PACIENTE_ALERGIA_EXITO,
	ELIMINAR_PACIENTE_ALERGIA_FALLO
} from './types'

import io from 'socket.io-client'
// import { socket } from '../../globalActions'

var pacienteAlergia = io.connect('http://localhost:3000/pacienteAlergia');

// pacienteAlergia.on('broadcast',function(data){
// 	// document.body.innerHTML = '';
// 	// document.write(data.description);
// 	console.log(data)
// });

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

export function abrirFormularioCrearPacienteAlergia() {
	return (dispatch) => {
		dispatch(reset('FormularioAlergiaPaciente'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PACIENTE_ALERGIA })
	}
}

export function abrirFormularioEditarPacienteAlergia(nroDocumento, id_tipoDocumento, id_alergia) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_REQUEST })

		pacienteAlergia.emit('mostrar_alergiaPaciente', { 
			nroDocumento: nroDocumento,
			id_tipoDocumento: id_tipoDocumento,
			id_alergia: id_alergia
		})

		pacienteAlergia.on('mostrar_alergiaPaciente', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PACIENTE_ALERGIA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPacienteAlergia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PACIENTE_ALERGIA })
	}
}

export function listarPacienteAlergias(nroDocumento, id_tipoDocumento) {
	return (dispatch) => {

		dispatch({ type: LISTAR_PACIENTE_ALERGIAS_REQUEST })


		pacienteAlergia.emit('listar_alergiasPaciente', {
			nroDocumento: nroDocumento,
			id_tipoDocumento: id_tipoDocumento
		})

		pacienteAlergia.on('listar_alergiasPaciente', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: LISTAR_PACIENTE_ALERGIAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PACIENTE_ALERGIAS_EXITO, payload: data })
			}
		})
	}
}

export function crearPacienteAlergia(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PACIENTE_ALERGIA_REQUEST })

		pacienteAlergia.emit('crear_alergiaPaciente', datosFormulario)

		pacienteAlergia.on('crear_alergiaPaciente', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_PACIENTE_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_PACIENTE_ALERGIA_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioAlergiaPaciente'))
	}
}

export function eliminarPacienteAlergia(nroDocumento, id_tipoDocumento, id_alergia) {
	return (dispatch) => {

		dispatch({ type: ELIMINAR_PACIENTE_ALERGIA_REQUEST })

		// var pacienteAlergia = io('http://localhost:3000')

		pacienteAlergia.emit('eliminar_alergiaPaciente', {
			nroDocumento: nroDocumento,
			id_tipoDocumento: id_tipoDocumento,
			id_alergia: id_alergia
		})

		pacienteAlergia.on('eliminar_alergiaPaciente', (data) => {

			if(data.error) {
				dispatch({ type: ELIMINAR_PACIENTE_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PACIENTE_ALERGIA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarPacienteAlergia(nroDocumento, id_tipoDocumento, id_alergia) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PACIENTE_ALERGIA_REQUEST })

		pacienteAlergia.emit('mostrar_alergiaPaciente', {
			nroDocumento: nroDocumento,
			id_tipoDocumento: id_tipoDocumento,
			id_alergia: id_alergia
		})

		pacienteAlergia.on('mostrar_alergiaPaciente', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PACIENTE_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PACIENTE_ALERGIA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarPacienteAlergia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PACIENTE_ALERGIA })
	}
}

export function editarPacienteAlergia(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PACIENTE_ALERGIA_REQUEST })

		pacienteAlergia.emit('editar_alergiaPaciente', datosFormulario)

		pacienteAlergia.on('editar_alergiaPaciente', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PACIENTE_ALERGIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PACIENTE_ALERGIA_EXITO, payload: data })
			}
		})

	}
}









