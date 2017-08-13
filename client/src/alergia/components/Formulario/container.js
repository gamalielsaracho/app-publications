import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearAlergia,
	editarAlergia,
	cerrarFormularioAlergia
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
		formulario: state.alergia.formulario,
		initialValues: state.alergia.formulario.alergia,
		enableReinitialize: state.alergia.formulario.iniciarValores,
		editarContenido: state.alergia.formulario.iniciarValores
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearAlergia: (datosFormulario) => {
			dispatch(crearAlergia(datosFormulario))
		},
		cerrarFormularioAlergia: () => {
			dispatch(cerrarFormularioAlergia())
		},
		editarAlergia: (datosFormulario) => {
			dispatch(editarAlergia(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioAlergia',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
