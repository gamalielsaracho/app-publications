import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearUnidadParametroPre,
	editarUnidadParametroPre,
	cerrarFormularioUnidadParametroPre
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 1) {
   			errors.descripcion = 'Tiene que ser por lo menos 1 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.unidadParametroPre.formulario,
		initialValues: state.unidadParametroPre.formulario.unidadParametroPre,
		enableReinitialize: state.unidadParametroPre.formulario.iniciarValores,
		editarContenido: state.unidadParametroPre.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.unidadParametroPre.crear,
		editar: state.unidadParametroPre.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearUnidadParametroPre: (datosFormulario) => {
			dispatch(crearUnidadParametroPre(datosFormulario))
		},
		cerrarFormularioUnidadParametroPre: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioUnidadParametroPre())
		    // }
		},
		editarUnidadParametroPre: (datosFormulario) => {
			dispatch(editarUnidadParametroPre(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioUnidadParametroPre',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
