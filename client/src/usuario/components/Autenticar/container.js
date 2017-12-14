import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	autenticarPersonal
} from '../../actions'

import Autenticar from './Autenticar'

const validate = values => {
  const errors = {}
  
  if (!values.correo) {
    errors.correo = 'Tienes que introducir un correo.'
  }

  if (!values.contrasena) {
    errors.contrasena = 'Tienes que introducir una contraseña.'
  } else if (values.contrasena.length < 5) {
    errors.contrasena = 'Tiene que ser por lo menos 5 caracteres.'
  }
  
  return errors
}

function mapStateToProps(state) {
	return {
		autenticacion: state.personal.autenticacion
	}
}

function mapDispatchToProps(dispatch) {
	return {
		autenticarPersonal: (datosFormulario) => {
			dispatch(autenticarPersonal(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'Autenticar',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Autenticar))