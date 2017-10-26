import {
	ABRIR_FORMULARIO_CREAR_CONSULTA,

	ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO,

	CERRAR_FORMULARIO_CONSULTA,

	LISTAR_CONSULTAS_REQUEST,
	LISTAR_CONSULTAS_EXITO,
	LISTAR_CONSULTAS_FALLO,

	// Mostrar Estadística 1. 
	MOSTRAR_ESTADISTICA1_REQUEST,
	MOSTRAR_ESTADISTICA1_EXITO,
	MOSTRAR_ESTADISTICA1_FALLO,

	// Create rol.
	CREAR_CONSULTA_REQUEST,
	CREAR_CONSULTA_EXITO,
	CREAR_CONSULTA_FALLO,

	// Show rol.
	MOSTRAR_CONSULTA_REQUEST,
	MOSTRAR_CONSULTA_EXITO,
	MOSTRAR_CONSULTA_FALLO,

	CERRAR_MODAL_MOSTRAR_CONSULTA,

	// Editar Rol.
	EDITAR_CONSULTA_REQUEST,
	EDITAR_CONSULTA_EXITO,
	EDITAR_CONSULTA_FALLO,

	// Delete Rol.
	ELIMINAR_CONSULTA_REQUEST,
	ELIMINAR_CONSULTA_EXITO,
	ELIMINAR_CONSULTA_FALLO
} from './types'

import io from 'socket.io-client'
import { formatDate } from '../../globalActions'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var consultaSocket = io.connect('http://localhost:3000/consulta');

export function abrirFormularioCrearConsulta() {
	return (dispatch) => {
		dispatch(reset('FormularioConsulta'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CONSULTA })
	}
}

export function abrirFormularioEditarConsulta(idConsulta) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST })

		consultaSocket.emit('mostrar_consulta_editar', { id_consulta: idConsulta })

		consultaSocket.on('mostrar_consulta_editar', (data) => {
			console.log(data)
			
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO, payload: data.error })
			} else {
				data.fechaProximaConsulta = formatDate(data.fechaProximaConsulta)

				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CONSULTA })
	}
}


export function mostrarEstadistica1() {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ESTADISTICA1_REQUEST })

		var consultaSocket = io.connect('http://localhost:3000/consulta');

		consultaSocket.on('cantidad_diagnosticos_porAnho', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_ESTADISTICA1_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_ESTADISTICA1_EXITO, payload: data })
			}
		})
	}
}


export function listarConsultas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CONSULTAS_REQUEST })

		var consultaSocket = io.connect('http://localhost:3000/consulta');

		consultaSocket.on('listar_consultas', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_CONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CONSULTAS_EXITO, payload: data })
			}
		})
	}
}

export function listarConsultasMedico(idPersonal) {
	return (dispatch) => {

		dispatch({ type: LISTAR_CONSULTAS_REQUEST })

		// var consultaSocket = io.connect('http://localhost:3000/consulta');
		consultaSocket.emit('listar_consultas_medico', { 
			id_personal: idPersonal 
		})

		consultaSocket.on('listar_consultas_medico', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_CONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CONSULTAS_EXITO, payload: data })
			}
		})
	}
}

// para el historial Clínico.
export function listarConsultasPaciente(idPaciente) {
	return (dispatch) => {

		dispatch({ type: LISTAR_CONSULTAS_REQUEST })

		// var consultaSocket = io.connect('http://localhost:3000/consulta');
		consultaSocket.emit('listar_consultas_paciente', { 
			id_paciente: idPaciente 
		})

		consultaSocket.on('listar_consultas_paciente', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_CONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CONSULTAS_EXITO, payload: data })
			}
		})
	}
}


export function crearConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_CONSULTA_REQUEST })

		consultaSocket.emit('crear_consulta', datosFormulario)

		consultaSocket.on('crear_consulta', (data) => {

			// console.log(data)

			if(data.error) {
				dispatch({ type: CREAR_CONSULTA_FALLO, payload: data.error })
			} else {
				let d = datosFormulario
				console.log()
				dispatch({ type: CREAR_CONSULTA_EXITO, payload: data })
				dispatch(reset('FormularioConsulta'))


				browserHistory.push(`/dashboard/citas/${d.id_cita}/preconsulta/${d.id_preconsulta}/consulta/${data.idConsultaInsertada}`)
			}
		})
	
	}
}

export function eliminarConsulta(idConsulta) {
	return (dispatch) => {
		// alert(idConsulta)

		dispatch({ type: ELIMINAR_CONSULTA_REQUEST })

		consultaSocket.emit('eliminar_consulta', { id_consulta: idConsulta })

		consultaSocket.on('eliminar_consulta', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CONSULTA_EXITO, payload: data })
				
				window.history.back();
			}
		})
	}
}


export function mostrarConsulta(idConsulta) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CONSULTA_REQUEST })

		consultaSocket.emit('mostrar_consulta', { id_consulta: idConsulta })

		consultaSocket.on('mostrar_consulta', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CONSULTA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_CONSULTA })
	}
}

export function editarConsulta(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CONSULTA_REQUEST })

		consultaSocket.emit('editar_consulta', datosFormulario)

		consultaSocket.on('editar_consulta', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CONSULTA_EXITO, payload: data })
				// dispatch(mostrarConsulta(datosFormulario.id_consulta))
			}
		})

	}
}









