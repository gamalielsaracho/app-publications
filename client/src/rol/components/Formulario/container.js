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

	if(!values.nombre) {
		errors.nombre = 'Tienes que introducir un nombre.'
	}else if (values.nombre.length < 5) {
   		errors.nombre = 'Tiene que ser por lo menos 5 characteres.'
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
	form: 'Formulario',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
