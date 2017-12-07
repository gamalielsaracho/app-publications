import axios from 'axios'
import moment from 'moment'

import io from 'socket.io-client'

export let socket = io.connect('http://localhost:3000')

export function calcularEdad(fechaPaciente) {
	// console.log()
	var dateNow = new Date()
	var date = new Date(fechaPaciente)

	var anhoActual = dateNow.getFullYear()
	var anhoPaciente = date.getFullYear()

	var mesPaciente = date.getMonth() + 1

	// edad del paciente
	var dato = anhoActual - anhoPaciente

	if(dato == 0) {
		var cantidadMeses = 12 - mesPaciente

		if(cantidadMeses > 1) {
			dato = `${cantidadMeses} Meses.`
		}else {
			dato = `${cantidadMeses} Mes.`
		}
	}


	return dato
}

export function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}


export function habilitadoSegunFecha(fechaCreacion) {
	var fechaActual = new Date()

	// var month = (d.getMonth() + 1)
	// var day = d.getDate()
	// var year = d.getFullYear()

	let fechaCreacionDias = moment(fechaCreacion).format('DD')
	// let fechaCreacionDias = '07'

	let fechaActualDias = moment(fechaActual).format('DD')

	let fechaCreacionMeses = moment(fechaCreacion).format('MM')
	// let fechaCreacionMeses = '12'

	let fechaActualMeses = moment(fechaActual).format('MM')

	let fechaCreacionAnhos = moment(fechaCreacion).format('YYYY')
	// let fechaCreacionAnhos = '2012'

	let fechaActualAnhos = moment(fechaActual).format('YYYY')


	let condition = (
		fechaCreacionDias == fechaActualDias && 

		fechaCreacionMeses == fechaActualMeses && 

		fechaCreacionAnhos == fechaActualAnhos 
	)
	console.log('CREACIÓN')
	console.log('dias: '+fechaCreacionDias)
	console.log('meses: '+fechaCreacionMeses)
	console.log('anos: '+fechaCreacionAnhos)


	console.log('ACTUAL')
	console.log('dias: '+fechaActualDias)
	console.log('meses: '+fechaActualMeses)
	console.log('anos: '+fechaActualAnhos)

	if(condition) {
		return 1
	} else {
		return 0
	}
}

export const API_URL = 'http://localhost:3000/api'

export function errorHandler(dispatch, error, type) {
	// let mensageError = error.data.error ? error.data.error : error.data

	// console.log(error.data.error)

	// let mensageError = error.data
	// console.log(mensageError)

	// if(error.status == 401) {
	// 	mensageError = 'No estas autenticado para hacer Esto.'
	// }

	dispatch({ type: type, payload: error.data.error })
}

// ....

export function postData(action, errorType, isAuthReq, url, dispatch, datos) {
	const requestUrl = API_URL + url

	let headers = {}

	if(isAuthReq) {
		headers = {
			headers: { 'Authorization': localStorage.getItem('token') }
		}
	}

	axios.post(requestUrl, datos, headers)
	.then((response) => {
		// var contenido = response.data

		// datos.id_rol = contenido.id_rol 

		// contenido.datoInsertado = datos
		// contenido.datoInsertado.id_rol = contenido.id_rol

		// console.log(contenido)

		dispatch({ type: action, payload: response.data })
	})
	.catch((error) => {
		errorHandler(dispatch, error.response, errorType)
	})
}


export function getData(action, errorType, isAuthReq, url, dispatch) {
	const requestUrl = API_URL + url

	let headers = {}

	if(isAuthReq) {
		headers = {
			headers: { 'Authorization': localStorage.getItem('token') }
		}
	}

	axios.get(requestUrl, headers)
	.then((response) => {
		// console.log(response.data)
		
		dispatch({ type: action, payload: response.data })
	})
	.catch((error) => {
		errorHandler(dispatch, error.response, errorType)
	})
}


export function putData(action, errorType, isAuthReq, url, dispatch, data) {
	const requestUrl = API_URL + url

	let headers = {}

	if(isAuthReq) {
		headers = {
			headers: { 'Authorization': localStorage.getItem('token') }
		}
	}

	axios.put(requestUrl, data, headers)
	.then((response) => {
		dispatch({ type: action, payload: response.data })
	})
	.catch((error) => {
		errorHandler(dispatch, error.response, errorType)
	})
}


export function deleteData(action, errorType, isAuthReq, url, dispatch) {
	const requestUrl = API_URL + url

	let headers = {}

	if(isAuthReq) {
		headers = {
			headers: { 'Authorization': localStorage.getItem('token') }
		}
	}

	axios.delete(requestUrl, headers)
	.then((response) => {
		console.log(response.data)
		dispatch({ type: action, payload: response.data })
	})
	.catch((error) => {
		errorHandler(dispatch, error.response, errorType)
	})
}