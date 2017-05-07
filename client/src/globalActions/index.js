import axios from 'axios'

export const API_URL = 'http://localhost:3000/api'

export function errorHandler(dispatch, error, type) {
	// let mensageError = error.data.error ? error.data.error : error.data

	let mensageError = error.data
	console.log(mensageError)
	if(error.status == 401) {
		mensageError = 'No estas autenticado para hacer Esto.'
	}

	dispatch({ type: type, payload: mensageError })
}

// ....


export function postData(action, errorType, isAuthReq, url, dispatch, data) {
	const requestUrl = API_URL + url

	let headers = {}

	if(isAuthReq) {
		headers = {
			headers: { 'Authorization': localStorage.getItem('token') }
		}
	}

	axios.post(requestUrl, data, headers)
	.then((response) => {
		console.log(response.data)
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
		console.log(response.data)

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
		dispatch({ type: action, payload: response.data })
	})
	.catch((error) => {
		errorHandler(dispatch, error.response, errorType)
	})
}