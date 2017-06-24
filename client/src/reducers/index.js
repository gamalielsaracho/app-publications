import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import usuarioReducer from '../usuario/reducer'
import rolReducer from '../rol/reducer'


const rootReducer = combineReducers({
	form: formReducer,
	usuario: usuarioReducer,
	rol: rolReducer
})

export default rootReducer