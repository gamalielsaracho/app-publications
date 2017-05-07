import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import usuarioReducer from '../usuario/reducer'

const rootReducer = combineReducers({
	form: formReducer,
	usuario: usuarioReducer
})

export default rootReducer