import {
	ABRIR_FORMULARIO_CREAR_CONSULTA,

	ABRIR_FORMULARIO_EDITAR_CONSULTA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_FALLO,

	CERRAR_FORMULARIO_CONSULTA,

	LISTAR_CONSULTAS_REQUEST,
	LISTAR_CONSULTAS_EXITO,
	LISTAR_CONSULTAS_FALLO,

	// Mostrar Estadística. 
	MOSTRAR_ESTADISTICA_REQUEST,
	MOSTRAR_ESTADISTICA_EXITO,
	MOSTRAR_ESTADISTICA_FALLO,

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
	ELIMINAR_CONSULTA_FALLO,


	LIMPIAR_MENSAJE_ERROR_CONSULTA,

	// Formulario Filtro.
	ABRIR_FORMULARIO_FILTRO,
	CERRAR_FORMULARIO_FILTRO,


	REPORTE_LISTAR_CONSULTAS_REQUEST,
	REPORTE_LISTAR_CONSULTAS_EXITO,
	REPORTE_LISTAR_CONSULTAS_FALLO
} from './types'

import io from 'socket.io-client'

import axios from 'axios'

import {
	postData,
	getData,
	putData,
	deleteData,
	errorHandler,

	API_URL
} from '../../globalActions'

import moment from 'moment'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var consultaSocket = io.connect('http://localhost:3000/consulta');


export function reporteListarConsultas() {
	return (dispatch) => {

		dispatch({ type: REPORTE_LISTAR_CONSULTAS_REQUEST })
		var consultaSocket = io.connect('http://localhost:3000/consulta');

		consultaSocket.on('reporte_listar_consultas', (data) => {
			// console.log(data)
			
			if(data.error) {
				dispatch({ type: REPORTE_LISTAR_CONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: REPORTE_LISTAR_CONSULTAS_EXITO, payload: data })
			}
		})
	}
}

export function limpiarMensajeErrorConsulta() {
	return (dispatch) => {
		dispatch({ type: LIMPIAR_MENSAJE_ERROR_CONSULTA })
	}
}


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
				data.fechaProximaConsulta = moment(data.fechaProximaConsulta).format('YYYY-MM-DD')

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
		let url = `/consultaDiagnosticos/grafica1`

		dispatch({ type: MOSTRAR_ESTADISTICA_REQUEST })

		getData(MOSTRAR_ESTADISTICA_EXITO, MOSTRAR_ESTADISTICA_FALLO, true, url, dispatch)

	}
}


export function mostrarEstadistica2() {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_ESTADISTICA_REQUEST })

		let url = `/consultaDiagnosticos/grafica2`

		getData(MOSTRAR_ESTADISTICA_EXITO, MOSTRAR_ESTADISTICA_FALLO, true, url, dispatch)

	}
}

export function listarConsultasPreConsulta(idPreConsulta) {
	return (dispatch) => {

		dispatch({ type: LISTAR_CONSULTAS_REQUEST })

		// var consultaSocket = io.connect('http://localhost:3000/consulta');

		consultaSocket.emit('listar_consultas_preConsulta', { 
			id_preconsulta: idPreConsulta
		})

		consultaSocket.on('listar_consultas_preConsulta', (data) => {
			console.log(data)

			if(data.error) {
				dispatch({ type: LISTAR_CONSULTAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CONSULTAS_EXITO, payload: data })
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

				dispatch({ type: CREAR_CONSULTA_EXITO, payload: data })
				dispatch(reset('FormularioConsulta'))

				// browserHistory.push(`/dashboard/pre-consultas/${d.id_preconsulta}/consulta/${data.idConsultaInsertada}`)
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
				// console.log(data)
				// Guardamos el id del médico de la consulta que se desea ver.
				localStorage.setItem('idMedico', data.consulta.id_personal)

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









