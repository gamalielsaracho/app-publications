import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
  listarEspecialidades
} from '../../../especialidades/actions'

import {
  listarRoles
} from '../../../rol/actions'

import {
	registrarPersonal,
  cerrarFormularioPersonal,
  editarPersonal
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

  var patronNumero = /^\d*$/; //Expresión regular para aceptar solo números enteros
  
  var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

  // var patronTexto = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/; //


  // // Este método regresa true si la cadena coincide con el patrón definido en la expresión regular
  // if (patron.test(numero)) {            
  //   alert(“Número es correcto”)
  // }else {
  // alert(“El número es incorrecto”);
  // }

  if (!values.nroDocumento) {
    errors.nroDocumento = 'Nro de documento obligatorio.'
  } else {
      if(!patronNumero.test(values.nroDocumento)) {
        errors.nroDocumento = 'Solo números positivos.'
      } else if(values.nroDocumento.length < 4){
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
  } else {
    if(values.id_rol == 1) {
      if (!values.id_especialidad) {
        errors.id_especialidad = 'Especialidad obligatorio.'
      }
    }
  }


  if (!values.nombres) {
    errors.nombres = 'Nombre completo es obligatorio.'
  } else {
    if (!patronTexto.test(values.nombres)) {
      errors.nombres = 'Solo texto.'
    } else if(values.nombres.length <= 3){
      errors.nombres = 'Por lo menos 3 caracteres.'
    } 
  }

  if (!values.apellidos) {
    errors.apellidos = 'Apellido completo obligatorio.'
  } else {
     if (!patronTexto.test(values.apellidos)) {
      errors.apellidos = 'Solo texto.'
    } else if(values.apellidos.length <= 3){
      errors.apellidos = 'Por lo menos 3 caracteres.'
    }
  }

  if (!values.correo) {
    errors.correo = 'Correo obligatorio.'
  }

  if (!values.nroRegistro) {
    errors.nroRegistro = 'Nro de registro obligatorio.'
  } else {
      if(!patronNumero.test(values.nroRegistro)) {
        errors.nroRegistro = 'Solo números positivos.'
      } else if(values.nroRegistro.length < 4){
        errors.nroRegistro = 'Por lo menos 4 caracteres.'
      }
  }

  
  if(!patronNumero.test(values.telefono)) {
    errors.telefono = 'Solo números positivos.'
  } else if(values.telefono.length < 9) {
    errors.telefono = 'Por lo menos 9 caracteres.'
  }
 

  if (!values.celular) {
    errors.celular = 'Nro de celular obligatorio.'
  } else {
      if(!patronNumero.test(values.celular)) {
        errors.celular = 'Solo números positivos.'
      } else if(values.celular.length < 10){
        errors.celular = 'Por lo menos 10 caracteres.'
      }
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

    formulario: state.personal.formulario,
    initialValues: state.personal.formulario.personal,
    enableReinitialize: state.personal.formulario.iniciarValores,
    editarContenido: state.personal.formulario.iniciarValores,

    // Para obtener el error al crear o editar.
    crear: state.personal.crear,
    editar: state.personal.editar
	}
}

function mapDispatchToProps(dispatch) {
	return {
    cerrarFormularioPersonal: () => {
      dispatch(cerrarFormularioPersonal())
    },
    listarEspecialidadesFuncion: () => {
      dispatch(listarEspecialidades())
    },
    listarRoles: () => {
      dispatch(listarRoles())
    },
		registrarPersonal: (datosFormulario) => {
			dispatch(registrarPersonal(datosFormulario))
		},
    editarPersonal: (datosFormulario) => {
      dispatch(editarPersonal(datosFormulario))
    }
	}
}

const form = reduxForm({
  form: 'FormularioPersonal',
  validate
  // warn
})


export default connect(mapStateToProps, mapDispatchToProps)(form(Registrar))