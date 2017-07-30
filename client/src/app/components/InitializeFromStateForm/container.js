import { connect } from 'react-redux'
import { load as loadAccount } from './account'
import { Field, reduxForm } from 'redux-form'

import { mostrarEditarRol } from '../../../rol/actions'

import InitializeFromStateForm from './InitializeFromStateForm'

const data = {
  // used to populate "account" reducer when "Load" is clicked
  nombre: 'GAMAAAA.'
  // lastName: 'Doe',
  // age: '42',
  // sex: 'female',
  // employed: true,
  // favoriteColor: 'Blue',
  // bio: 'Born to write amazing Redux code.'
}

function mapStateToProps(state) {
	// console.log("eeee:"+state.rol.mostrarEditar.rol.nombre)

	return {
		initialValues: state.rol.mostrarEditar.rol,
		enableReinitialize: true
	}
}

function mapDispatchToProps(dispatch) {
	return {
		mostrarEditarRol: (idRol) => {
			dispatch(mostrarEditarRol(idRol))
		}
	}
}


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
let form = reduxForm({
  form: 'initializeFromState' // a unique identifier for this form
})

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps, mapDispatchToProps)(form(InitializeFromStateForm))
