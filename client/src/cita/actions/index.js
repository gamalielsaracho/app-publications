import {
	ABRIR_FORMULARIO_CREAR_CITA,

	ABRIR_FORMULARIO_EDITAR_CITA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CITA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CITA_FALLO,

	CERRAR_FORMULARIO_CITA,

	LISTAR_CITAS_REQUEST,
	LISTAR_CITAS_EXITO,
	LISTAR_CITAS_FALLO,

	// Create rol.
	CREAR_CITA_REQUEST,
	CREAR_CITA_EXITO,
	CREAR_CITA_FALLO,

	// Show rol.
	MOSTRAR_CITA_REQUEST,
	MOSTRAR_CITA_EXITO,
	MOSTRAR_CITA_FALLO,

	CERRAR_MODAL_MOSTRAR_CITA,

	// Editar Rol.
	EDITAR_CITA_REQUEST,
	EDITAR_CITA_EXITO,
	EDITAR_CITA_FALLO,

	// Delete Rol.
	ELIMINAR_CITA_REQUEST,
	ELIMINAR_CITA_EXITO,
	ELIMINAR_CITA_FALLO,

	ACTUALIZAR_FORMULARIO_CITA_FILTRO,

	MOSTRAR_CITA_AGREGAR_PRECONSULTA_REQUEST,
	MOSTRAR_CITA_AGREGAR_PRECONSULTA_EXITO,
	MOSTRAR_CITA_AGREGAR_PRECONSULTA_FALLO,

	CERRAR_MOSTRAR_CITA_AGREGAR_PRECONSULTA
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var citaSocket = io.connect('http://localhost:3000/cita');

export function alertaPrueba(contenido) {
	return (dispatch) => {
        alert(contenido)

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CITA })
	}
}

export function abrirFormularioCrearCita() {
	return (dispatch) => {
		dispatch(reset('FormularioCita'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_CITA })
	}
}

export function abrirFormularioEditarCita(idCita) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_CITA_REQUEST })

		citaSocket.emit('mostrar_cita_editar', {
			id_cita: idCita
		})

		citaSocket.on('mostrar_cita_editar', (data) => {
			console.log('mostrar_cita_editar')
			console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_CITA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioCita() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_CITA })
	}
}

export function listarCitas() {
	return (dispatch) => {

		dispatch({ type: LISTAR_CITAS_REQUEST })

		let citaSocket = io.connect('http://localhost:3000/cita')

		citaSocket.on('listar_citas', (data) => {
			// console.log(data)

			if(data.error) {
				dispatch({ type: LISTAR_CITAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CITAS_EXITO, payload: data })
			}
		})
	}
}

export function listarCitasMedico(idPersonal) {
	return (dispatch) => {

		dispatch({ type: LISTAR_CITAS_REQUEST })

		// let citaSocket = io.connect('http://localhost:3000/cita')
		citaSocket.emit('listar_citas_medico', { 
			id_personal: idPersonal 
		})

		citaSocket.on('listar_citas_medico', (data) => {
			if(data.error) {
				dispatch({ type: LISTAR_CITAS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_CITAS_EXITO, payload: data })
			}
		})
	}
}

export function crearCita(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_CITA_REQUEST })

		citaSocket.emit('crear_cita', datosFormulario)
		citaSocket.on('crear_cita', (data) => {
			if(data.err) {
				dispatch({ type: CREAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_CITA_EXITO, payload: data })
			}
		})
	
		dispatch(reset('FormularioCita'))
	}
}

export function eliminarCita(idCita) {
	return (dispatch) => {
		// alert(idCita)

		dispatch({ type: ELIMINAR_CITA_REQUEST })

		citaSocket.emit('eliminar_cita', {
			id_cita: idCita
		})

		citaSocket.on('eliminar_cita', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_CITA_EXITO, payload: data })
			}
		})
	}
}


export function mostrarCita(idCita) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_CITA_REQUEST })

		citaSocket.emit('mostrar_cita', { 
			id_cita: idCita
		})

		citaSocket.on('mostrar_cita', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CITA_EXITO, payload: data })
			}
		})
	}
}


export function cerrarModalMostrarCita() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MODAL_MOSTRAR_CITA })
	}
}

export function editarCita(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CITA_REQUEST })

		citaSocket.emit('editar_cita', datosFormulario)

		citaSocket.on('editar_cita', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CITA_EXITO, payload: data })
			}
		})

	}
}

// Acción para actualizar solamente la clave foranea de 
// una cita. 
export function editarCitaIdPreConsultaField(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_CITA_REQUEST })

		citaSocket.emit('editar_cita_idPreConsultaField', datosFormulario)

		citaSocket.on('editar_cita_idPreConsultaField', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_CITA_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_CITA_EXITO, payload: data })
			}
		})

	}
}

export function actualizarFormularioFiltro(valoresInput) {
	return (dispatch) => {
		// console.log(valoresInput)
		
		dispatch({ type: ACTUALIZAR_FORMULARIO_CITA_FILTRO, valores: valoresInput  })
	}
}


export function mostrarCitaAgregarPreConsulta(idCita) {
	return (dispatch) => {

		dispatch({ type: MOSTRAR_CITA_AGREGAR_PRECONSULTA_REQUEST })

		citaSocket.emit('mostrar_cita', { 
			id_cita: idCita
		})

		citaSocket.on('mostrar_cita', (data) => {
			// console.log('LA CITA ESSSSSSS->>>')

			// console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_CITA_AGREGAR_PRECONSULTA_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_CITA_AGREGAR_PRECONSULTA_EXITO, payload: data })
			}
		})
	}
}

export function cerrarMostrarCitaAgregarPreConsulta() {
	return (dispatch) => {
		dispatch({ type: CERRAR_MOSTRAR_CITA_AGREGAR_PRECONSULTA })
	}
}





