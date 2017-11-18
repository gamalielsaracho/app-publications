import {
	ABRIR_FORMULARIO_CREAR_PRECONSULTA,

	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_PRECONSULTA_FALLO,

	CERRAR_FORMULARIO_PRECONSULTA,

	LISTAR_PRECONSULTAS_REQUEST,
	LISTAR_PRECONSULTAS_EXITO,
	LISTAR_PRECONSULTAS_FALLO,

	ABRIR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA,

	LISTAR_PRECONSULTAS_FECHA_DIA_REQUEST,
	LISTAR_PRECONSULTAS_FECHA_DIA_EXITO,
	LISTAR_PRECONSULTAS_FECHA_DIA_FALLO,

	CERRAR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA,

	// Create rol.
	CREAR_PRECONSULTA_REQUEST,
	CREAR_PRECONSULTA_EXITO,
	CREAR_PRECONSULTA_FALLO,

	// Show rol.
	MOSTRAR_PRECONSULTA_REQUEST,
	MOSTRAR_PRECONSULTA_EXITO,
	MOSTRAR_PRECONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_PRECONSULTA,

	// Editar Rol.
	EDITAR_PRECONSULTA_REQUEST,
	EDITAR_PRECONSULTA_EXITO,
	EDITAR_PRECONSULTA_FALLO,

	// Delete Rol.
	ELIMINAR_PRECONSULTA_REQUEST,
	ELIMINAR_PRECONSULTA_EXITO,
	ELIMINAR_PRECONSULTA_FALLO,

	// Formulario Filtro.
	ABRIR_FORMULARIO_FILTRO,
	CERRAR_FORMULARIO_FILTRO
} from './types'

import io from 'socket.io-client'
import moment from 'moment'


import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var preconsultaSocket = io.connect('http://localhost:3000/preconsulta');

export function abrirFormularioFiltro() {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_FILTRO })
	}
}

export function cerrarFormularioFiltro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_FILTRO })
	}
}


export function abrirModalListarPreConsultasFechaDia() {
	return (dispatch) => {
		dispatch({ type: ABRIR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA })
	}
}

export function cerrarModalListarPreConsultasFechaDia() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_LISTAR_PRECONSULTAS_FECHA_DIA })
	}
}


export function listarPreConsultasFechaDia(fechaCita, idPaciente) {
	return (dispatch) => {
		dispatch({ type: LISTAR_PRECONSULTAS_FECHA_DIA_REQUEST })

		preconsultaSocket.emit('listar_preconsultas_fechaDia', { 
			fechaCita: fechaCita,
			id_paciente: idPaciente
		})

		preconsultaSocket.on('listar_preconsultas_fechaDia', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: LISTAR_PRECONSULTAS_FECHA_DIA_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PRECONSULTAS_FECHA_DIA_EXITO, payload: data })
			}
		})
	}
}

export function abrirFormularioCrearPreConsulta() {
	return (dispatch) => {
		dispatch(reset('FormularioPreConsulta'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PRECONSULTA })
	}
}

export function abrirFormularioEditarPreConsulta(idPreConsulta) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_REQUEST })

		preconsultaSocket.emit('mostrar_preconsulta_editar', { id_preconsulta: idPreConsulta })

		preconsultaSocket.on('mostrar_preconsulta_editar', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioPreConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PRECONSULTA })
	}
}

export function listarPreConsultas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PRECONSULTAS_REQUEST })

		var preconsultaSocket = io.connect('http://localhost:3000/preconsulta');

		preconsultaSocket.on('listar_preconsultas', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: LISTAR_PRECONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_PRECONSULTAS_EXITO, payload: data })
			}
		})
	}
}

export function crearPreConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_PRECONSULTA_REQUEST })

		preconsultaSocket.emit('crear_preconsulta', datosFormulario)
		
		preconsultaSocket.on('crear_preconsulta', (data) => {
			console.log(data)

			if(data.error) {
				dispatch({ type: CREAR_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch(reset('FormularioPreConsulta'))
				dispatch({ type: CREAR_PRECONSULTA_EXITO, payload: data })

				// browserHistory.push(`/dashboard/citas/${datosFormulario.id_cita}/preconsulta/${data.idPreconsultaInsertada}`)
			}
		})
	
	}
}

export function eliminarPreConsulta(idPreConsulta) {
	return (dispatch) => {
		// alert(idPreConsulta)

		dispatch({ type: ELIMINAR_PRECONSULTA_REQUEST })

		preconsultaSocket.emit('eliminar_preconsulta', { id_preconsulta: idPreConsulta })

		preconsultaSocket.on('eliminar_preconsulta', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarPreConsulta(idPreConsulta) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PRECONSULTA_REQUEST })

		preconsultaSocket.emit('mostrar_preconsulta', { id_preconsulta: idPreConsulta })

		preconsultaSocket.on('mostrar_preconsulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarPreConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_PRECONSULTA })
	}
}

export function editarPreConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_PRECONSULTA_REQUEST })

		preconsultaSocket.emit('editar_preconsulta', datosFormulario)

		preconsultaSocket.on('editar_preconsulta', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PRECONSULTA_EXITO, payload: data })
			}
		})

	}
}




