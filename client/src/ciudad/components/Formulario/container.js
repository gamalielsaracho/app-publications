import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearCiudad,
	editarCiudad,
	cerrarFormularioCiudad
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
		formulario: state.ciudad.formulario,
		initialValues: state.ciudad.formulario.ciudad,
		enableReinitialize: state.ciudad.formulario.iniciarValores,
		editarContenido: state.ciudad.formulario.iniciarValores
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearCiudad: (datosFormulario) => {
			dispatch(crearCiudad(datosFormulario))
		},
		cerrarFormularioCiudad: () => {
			dispatch(cerrarFormularioCiudad())
		},
		editarCiudad: (datosFormulario) => {
			dispatch(editarCiudad(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioCiudad',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))