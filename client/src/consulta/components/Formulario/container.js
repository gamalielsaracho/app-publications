import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearConsulta,
	editarConsulta,
	cerrarFormularioConsulta
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 5) {
   			errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.consulta.formulario,
		initialValues: state.consulta.formulario.consulta,
		enableReinitialize: state.consulta.formulario.iniciarValores,
		editarContenido: state.consulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.consulta.crear,
		editar: state.consulta.editar

	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearConsulta: (datosFormulario) => {
			dispatch(crearConsulta(datosFormulario))
		},
		cerrarFormularioConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioConsulta())
		    // }
		},
		editarConsulta: (datosFormulario) => {
			dispatch(editarConsulta(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioConsulta',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
