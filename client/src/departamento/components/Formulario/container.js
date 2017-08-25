import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearDepartamento,
	editarDepartamento,
	cerrarFormularioDepartamento
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.departamento.formulario,
		initialValues: state.departamento.formulario.departamento,
		enableReinitialize: state.departamento.formulario.iniciarValores,
		editarContenido: state.departamento.formulario.iniciarValores
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearDepartamento: (datosFormulario) => {
			dispatch(crearDepartamento(datosFormulario))
		},
		cerrarFormularioDepartamento: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioDepartamento())
		    // }
		},
		editarDepartamento: (datosFormulario) => {
			dispatch(editarDepartamento(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioDepartamento',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
