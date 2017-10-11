import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearSintoma,
	editarSintoma,
	cerrarFormularioSintoma
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 3) {
   			errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.sintoma.formulario,
		initialValues: state.sintoma.formulario.sintoma,
		enableReinitialize: state.sintoma.formulario.iniciarValores,
		editarContenido: state.sintoma.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.sintoma.crear,
		editar: state.sintoma.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearSintoma: (datosFormulario) => {
			dispatch(crearSintoma(datosFormulario))
		},
		cerrarFormularioSintoma: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioSintoma())
		    // }
		},
		editarSintoma: (datosFormulario) => {
			dispatch(editarSintoma(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioSintoma',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
