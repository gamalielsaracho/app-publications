import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
  listarEspecialidades
} from '../../../especialidades/actions'

import {
  listarRoles
} from '../../../rol/actions'

import {
	registrarPersonal
} from '../../actions'


import Registrar from './Registrar'

// nroDocumento
// id_tipoDocumento
// id_especialidad
// id_rol
// nombres
// apellidos
// correo
// nroRegistro
// telefono
// celular
// direccion
// fecha_nacimiento
// contrasena

const validate = values => {
  const errors = {}
  if (!values.nroDocumento) {
    errors.nroDocumento = 'Nro de documento obligatorio.'
  } else if (values.nroDocumento.length <= 4) {
    errors.nroDocumento = 'Por lo menos 4 caracteres.'
  }
  if (!values.id_tipoDocumento) {
    errors.id_tipoDocumento = 'Tipo de documento obligatorio.'
  }

  // Validación con ROL y ESPECIALIDAD.
  if (!values.id_especialidad) {
    errors.id_rol = 'Especialidad obligatorio.'
  }

  if (!values.id_rol) {
    errors.id_rol = 'Rol obligatorio.'
  }


  if (!values.nombres) {
    errors.nombres = 'Nombre completo es obligatorio.'
  } else if (values.nombres.length <= 10) {
    errors.nombres = 'Por lo menos 10 caracteres.'
  }
  if (!values.apellidos) {
    errors.apellidos = 'Apellido completo obligatorio.'
  } else if (values.apellidos.length < 10) {
    errors.apellidos = 'Por lo menos 10 caracteres'
  }
  if (!values.correo) {
    errors.correo = 'Correo obligatorio.'
  } else if (values.correo.length < 10) {
    errors.correo = 'Como minimo 10 caracteres'
  }
  if (!values.nroRegistro) {
    errors.nroRegistro = 'Nro de registro obligatorio.'
  } else if (values.nroRegistro.length <= 4) {
    errors.nroRegistro = 'Como minimo 4 caracteres'
  }
  // if (!values.telefono) {
  //   errors.telefono = 'Tienes que introducir tu nombre.'
  // } else if (values.telefono.length < 15) {
  //   errors.telefono = 'Must be 15 characters or less'
  // }
  if (!values.celular) {
    errors.celular = 'Nro de celular obligatorio.'
  } else if (values.celular.length <= 7) {
    errors.celular = 'Como minimo 7 caracteres.'
  }
  if (!values.direccion) {
    errors.direccion = 'Dirección obligatorio.'
  } else if (values.direccion.length < 10) {
    errors.direccion = 'Como minimo 10 caracteres.'
  }
  if (!values.fecha_nacimiento) {
    errors.fecha_nacimiento = 'Fecha de nacimiento obligatorio.'
  }
  if (!values.contrasena) {
    errors.contrasena = 'Contraseña obligatorio.'
  } else if (values.contrasena.length <= 8) {
    errors.contrasena = 'Como minimo 8 caracteres.'
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
    listaEspecialidades: state.especialidad.listar,
    listaRoles: state.rol.listar,
		registro: state.personal.registro
	}
}

function mapDispatchToProps(dispatch) {
	return {
    listarEspecialidades: () => {
      dispatch(listarEspecialidades())
    },
    listarRoles: () => {
      dispatch(listarRoles())
    },
		registrarPersonal: (datosFormulario) => {
			dispatch(registrarPersonal(datosFormulario))
		}
	}
}

const form = reduxForm({
  form: 'Registrar',
  validate
  // warn
})


export default connect(mapStateToProps, mapDispatchToProps)(form(Registrar))