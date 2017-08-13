import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearArea,
	editarArea,
	cerrarFormularioArea
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length <= 5) {
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.area.formulario,
		initialValues: state.area.formulario.area,
		enableReinitialize: state.area.formulario.iniciarValores,
		editarContenido: state.area.formulario.iniciarValores
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearArea: (datosFormulario) => {
			dispatch(crearArea(datosFormulario))
		},
		cerrarFormularioArea: () => {
			dispatch(cerrarFormularioArea())
		},
		editarArea: (datosFormulario) => {
			dispatch(editarArea(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioArea',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
