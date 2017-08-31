import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPreConsulta,
	editarPreConsulta,
	cerrarFormularioPreConsulta
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
		values.descripcion.toLowerCase()
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.preConsulta.formulario,
		initialValues: state.preConsulta.formulario.preConsulta,
		enableReinitialize: state.preConsulta.formulario.iniciarValores,
		editarContenido: state.preConsulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.preConsulta.crear,
		editar: state.preConsulta.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPreConsulta: (datosFormulario) => {
			dispatch(crearPreConsulta(datosFormulario))
		},
		cerrarFormularioPreConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioPreConsulta())
		    // }
		},
		editarPreConsulta: (datosFormulario) => {
			dispatch(editarPreConsulta(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioRol',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
