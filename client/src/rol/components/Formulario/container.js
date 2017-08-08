import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearRol,
	editarRol,
	cerrarFormularioRol
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
		formulario: state.rol.formulario,
		initialValues: state.rol.formulario.rol,
		enableReinitialize: state.rol.formulario.iniciarValores,
		editarContenido: state.rol.formulario.iniciarValores
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearRol: (datosFormulario) => {
			dispatch(crearRol(datosFormulario))
		},
		cerrarFormularioRol: () => {
			dispatch(cerrarFormularioRol())
		},
		editarRol: (datosFormulario) => {
			dispatch(editarRol(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioRol',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
