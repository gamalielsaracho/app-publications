import axios from 'axios'

import io from 'socket.io-client'

export let socket = io.connect('http://localhost:3000')

export function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export const API_URL = 'http://localhost:3000/api'

export function errorHandler(dispatch, error, type) {
	// let mensageError = error.data.error ? error.data.error : error.data

	console.log(error.data)

	// let mensageError = error.data
	// console.log(mensageError)

	// if(error.status == 401) {
	// 	mensageError = 'No estas autenticado para hacer Esto.'
	// }

	dispatch({ type: type, payload: error.data })
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