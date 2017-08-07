import React from 'react'
import ReactDOM from 'react-dom'

import {
	verificarTokenPersonal
} from '././usuario/actions'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')
console.log(token)

if(token) {
	store.dispatch(verificarTokenPersonal(token))
	console.log("hola de el punto de entrada.")
}else {
	console.log("no hay token..")
}

import routes from './routes'

ReactDOM.render(<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>, document.getElementById('root'))