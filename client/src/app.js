import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

import routes from './routes'

ReactDOM.render(<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>, document.getElementById('root'))