import {
	REGISTRAR_PERSONAL_REQUEST,
	REGISTRAR_PERSONAL_EXITO,
	REGISTRAR_PERSONAL_FALLO,

	AUTENTICAR_PERSONAL_REQUEST,
	AUTENTICAR_PERSONAL_EXITO,
	AUTENTICAR_PERSONAL_FALLO,

	VERIFICAR_TOKEN_PERSONAL_EXITO,
	VERIFICAR_TOKEN_PERSONAL_FALLO,

	SALIR_PERSONAL,

	LISTAR_PERSONALES_REQUEST,
	LISTAR_PERSONALES_EXITO,
	LISTAR_PERSONALES_FALLO,

	LISTAR_MEDICOS_REQUEST,
	LISTAR_MEDICOS_EXITO,
	LISTAR_MEDICOS_FALLO,

	ACTUALIZAR_FORMULARIO_FILTRO,


	ABRIR_FORMULARIO_EDITAR_PERSONAL_REQUEST,
	ABRIR_FORMULARIO_EDITAR_PERSONAL_EXITO,
	ABRIR_FORMULARIO_EDITAR_PERSONAL_FALLO,

	EDITAR_PERSONAL_REQUEST,
	EDITAR_PERSONAL_EXITO,
	EDITAR_PERSONAL_FALLO,

	ABRIR_FORMULARIO_CREAR_PERSONAL,

	CERRAR_FORMULARIO_PERSONAL,

	MOSTRAR_PERSONAL_REQUEST,
	MOSTRAR_PERSONAL_EXITO,
	MOSTRAR_PERSONAL_FALLO
} from './types'

import io from 'socket.io-client'
import { reset } from 'redux-form'

import { browserHistory } from 'react-router'

import moment from 'moment'

var socketPersonal = io('http://localhost:3000')


export function abrirFormularioCrearPersonal() {
	return (dispatch) => {
		dispatch(reset('FormularioPersonal'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_PERSONAL })
	}
}


export function abrirFormularioEditarPersonal(idPersonal) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERSONAL_REQUEST })

		socketPersonal.emit('mostrar_personal_editar', { id_personal: idPersonal })

		socketPersonal.on('mostrar_personal_editar', (data) => {
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERSONAL_FALLO, payload: data.error })
			} else {
				data.fecha_nacimiento = moment(data.fecha_nacimiento).format('YYYY-MM-DD')
				
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_PERSONAL_EXITO, payload: data })
			}
		})
	}
}


export function editarPersonal(datosFormulario) {
	return (dispatch) => {
		// datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

		dispatch({ type: EDITAR_PERSONAL_REQUEST })

		socketPersonal.emit('editar_personal', datosFormulario)

		socketPersonal.on('editar_personal', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: EDITAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_PERSONAL_EXITO, payload: data })
			}
		})

	}
}

export function cerrarFormularioPersonal() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_PERSONAL })
	}
}


export function mostrarPersonal(idPersonal) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_PERSONAL_REQUEST })

		socketPersonal.emit('mostrar_personal', { id_personal: idPersonal })

		socketPersonal.on('mostrar_personal', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: MOSTRAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: MOSTRAR_PERSONAL_EXITO, payload: data })
			}
		})
	}
}



export function registrarPersonal(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: REGISTRAR_PERSONAL_REQUEST })

		socketPersonal.emit('registrar_personal', datosFormulario)

		socketPersonal.on('registrar_personal', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: REGISTRAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: REGISTRAR_PERSONAL_EXITO, payload: data })
				browserHistory.push('entrar')
			}
		})
	}
}

export function autenticarPersonal(datosFormulario) {

	return (dispatch) => {
		dispatch({ type: AUTENTICAR_PERSONAL_REQUEST })

		socketPersonal.emit('autenticar_personal', datosFormulario)

		socketPersonal.on('autenticar_personal', (data) => {
			if(data.error) {
				dispatch({ type: AUTENTICAR_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: AUTENTICAR_PERSONAL_EXITO, payload: data })
				
				localStorage.setItem('token', data.token)

				const token = localStorage.getItem('token')

				dispatch(verificarTokenPersonal(token))

				// enviar al perfil del Personal. cool.!
				browserHistory.push(`dashboard`)
			}
		})
	}
}

export function verificarTokenPersonal(token) {

	return (dispatch) => {

		socketPersonal.emit('verificar_token', { token: token })
		
		socketPersonal.on('verificar_token', (data) => {
			if(data.error) {
				dispatch({ type: VERIFICAR_TOKEN_PERSONAL_FALLO, payload: data.error })
			} else {
				dispatch({ type: VERIFICAR_TOKEN_PERSONAL_EXITO, payload: data })
			}
		})
	}
}

export function salirPersonal() {

	return (dispatch) => {
		dispatch({ type: SALIR_PERSONAL })

		localStorage.removeItem('token')

		browserHistory.push(`/`)
	}
}

export function listarPersonales() {
	return (dispatch) => {

		dispatch({ type: LISTAR_PERSONALES_REQUEST })

		var socketPersonal = io.connect('http://localhost:3000')


		socketPersonal.on('listar_personales', function(data) {
			if(data.error) {
				dispatch({ type: LISTAR_PERSONALES_FALLO, payload: data.error })
			} else {	
				dispatch({ type: LISTAR_PERSONALES_EXITO, payload: data })
			}
		})

	}
}


export function listarMedicos() {
	return (dispatch) => {

		dispatch({ type: LISTAR_MEDICOS_REQUEST })

		// var socketPersonal = io.connect('http://localhost:3000')

		socketPersonal.on('listar_personales_medicos', function(data) {
			if(data.error) {
				dispatch({ type: LISTAR_MEDICOS_FALLO, payload: data.error })
			} else {	
				dispatch({ type: LISTAR_MEDICOS_EXITO, payload: data })
			}
		})

	}
}

export function actualizarFormularioFiltro(valoresInput) {
	return (dispatch) => {
		// console.log(valoresInput)
		dispatch({ type: ACTUALIZAR_FORMULARIO_FILTRO, valores: valoresInput  })
	}
}
