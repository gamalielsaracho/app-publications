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
  } else {
      if(values.nroDocumento.length < 4) {
        errors.nroDocumento = 'Por lo menos 4 caracteres.'
      }
  }

  if (!values.id_tipoDocumento) {
    errors.id_tipoDocumento = 'Tipo de documento obligatorio.'
  }

  // Validación con ROL y ESPECIALIDAD.
  // if (!values.id_especialidad) {
  //   errors.id_rol = 'Especialidad obligatorio.'
  // }

  if (!values.id_rol) {
    errors.id_rol = 'Rol obligatorio.'
  }


  if (!values.nombres) {
    errors.nombres = 'Nombre completo es obligatorio.'
  } else if (values.nombres.length <= 3) {
    errors.nombres = 'Por lo menos 3 caracteres.'
  }

  if (!values.apellidos) {
    errors.apellidos = 'Apellido completo obligatorio.'
  } else if (values.apellidos.length < 3) {
    errors.apellidos = 'Por lo menos 3 caracteres'
  }
  if (!values.correo) {
    errors.correo = 'Correo obligatorio.'
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
  } else if (values.celular.length <= 5) {
    errors.celular = 'Como minimo 5 caracteres.'
  }
  if (!values.direccion) {
    errors.direccion = 'Dirección obligatorio.'
  } else if (values.direccion.length < 5) {
    errors.direccion = 'Como minimo 5 caracteres.'
  }
  if (!values.fecha_nacimiento) {
    errors.fecha_nacimiento = 'Fecha de nacimiento obligatorio.'
  }
  if (!values.contrasena) {
    errors.contrasena = 'Contraseña obligatorio.'
  } else if (values.contrasena.length <= 5) {
    errors.contrasena = 'Como minimo 5 caracteres.'
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
    listarEspecialidades: state.especialidad.listar,
    listaRoles: state.rol.listar,
		registro: state.personal.registro
	}
}

function mapDispatchToProps(dispatch) {
	return {
    listarEspecialidadesFuncion: () => {
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