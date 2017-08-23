import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearCiudad,
	editarCiudad,
	cerrarFormularioCiudad,
} from '../../actions'

import {
	listarDepartamentos,
	abrirFormularioCrearDepartamento
} from '../../../departamento/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.id_departamento) {
		errors.id_departamento = 'Tienes que introducir un departamento.'
	}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.ciudad.formulario,
		initialValues: state.ciudad.formulario.ciudad,
		enableReinitialize: state.ciudad.formulario.iniciarValores,
		editarContenido: state.ciudad.formulario.iniciarValores,

		listaDepartamentos: state.departamento.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearCiudad: (datosFormulario) => {
			dispatch(crearCiudad(datosFormulario))
		},
		cerrarFormularioCiudad: () => {
			var r = confirm("Está seguro que desea cancelar?");
		    if (r == true) {
				dispatch(cerrarFormularioCiudad())
		    }
		},
		editarCiudad: (datosFormulario) => {
			dispatch(editarCiudad(datosFormulario))
		},


		listarDepartamentos: () => {
			dispatch(listarDepartamentos())
		},
		abrirFormularioCrearDepartamento: () => {
			dispatch(abrirFormularioCrearDepartamento())
		}
	}
}

const form = reduxForm({
	form: 'FormularioCiudad',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
