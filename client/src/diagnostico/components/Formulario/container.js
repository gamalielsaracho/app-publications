import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearDiagnostico,
	editarDiagnostico,
	cerrarFormularioDiagnostico
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
		formulario: state.diagnostico.formulario,
		initialValues: state.diagnostico.formulario.diagnostico,
		enableReinitialize: state.diagnostico.formulario.iniciarValores,
		editarContenido: state.diagnostico.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.diagnostico.crear,
		editar: state.diagnostico.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearDiagnostico: (datosFormulario) => {
			dispatch(crearDiagnostico(datosFormulario))
		},
		cerrarFormularioDiagnostico: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioDiagnostico())
		    // }
		},
		editarDiagnostico: (datosFormulario) => {
			dispatch(editarDiagnostico(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioDiagnostico',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
