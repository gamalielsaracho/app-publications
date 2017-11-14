
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

export default function configureStore(initialState) {
	// creando el store.
	// const store = createStore(rootReducer, initialState)
  
	const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore, initialState)
	const store = createStoreWithMiddleware(reducers)
	return store
}
