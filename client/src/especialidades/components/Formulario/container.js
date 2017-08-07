import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearEspecialidad,
	editarEspecialidad,
	cerrarFormularioEspecialidad
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
		formulario: state.especialidad.formulario,
		initialValues: state.especialidad.formulario.especialidad,
		enableReinitialize: state.especialidad.formulario.iniciarValores,
		editarContenido: state.especialidad.formulario.iniciarValores
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearEspecialidad: (datosFormulario) => {
			dispatch(crearEspecialidad(datosFormulario))
		},
		cerrarFormularioEspecialidad: () => {
			dispatch(cerrarFormularioEspecialidad())
		},
		editarEspecialidad: (datosFormulario) => {
			dispatch(editarEspecialidad(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'Formulario',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
