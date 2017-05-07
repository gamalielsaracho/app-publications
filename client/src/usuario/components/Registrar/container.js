import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	registrarUsuario
} from '../../actions'

import Registrar from './Registrar'

const validate = values => {
  const errors = {}
  if (!values.nombre) {
    errors.nombre = 'Tienes que introducir tu nombre.'
  } else if (values.nombre.length < 15) {
    errors.nombre = 'Must be 15 characters or less'
  }
  if (!values.apellido) {
    errors.apellido = 'Tienes que introducir tu apellido.'
  } else if (values.apellido.length < 8) {
    errors.apellido = 'Tiene que ser 8 characteres.'
  }
  if (!values.correo) {
    errors.correo = 'Tienes que introducir un correo.'
  } else if (values.correo.length < 8) {
    errors.correo = 'Tiene que ser por lo menos 8 characteres.'
  }
  if (!values.contrasena) {
    errors.contrasena = 'Tienes que introducir una contraseña.'
  } else if (values.contrasena.length < 7) {
    errors.contrasena = 'Tiene que ser por lo menos 7 characteres.'
  }
  
  return errors
}

// const warn = values => {
//   const warnings = {}
//   if (values.nombre.length) {
//     warnings.apellido = 'Prueba warnings... :)'
//   }
//   return warnings
// }

function mapStateToProps(state) {
	return {
		registro: state.usuario.registro
	}
}

function mapDispatchToProps(dispatch) {
	return {
		registrarUsuario: (datosFormulario) => {
			dispatch(registrarUsuario(datosFormulario))
		}
	}
}

const form = reduxForm({
  form: 'Registrar',
  validate
  // warn
})


export default connect(mapStateToProps, mapDispatchToProps)(form(Registrar))