import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearUnidadMedicamento,
	editarUnidadMedicamento,
	cerrarFormularioUnidadMedicamento
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 1) {
   			errors.descripcion = 'Tienes que introducir una descripción.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.unidadMedicamento.formulario,
		initialValues: state.unidadMedicamento.formulario.unidadMedicamento,
		enableReinitialize: state.unidadMedicamento.formulario.iniciarValores,
		editarContenido: state.unidadMedicamento.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.unidadMedicamento.crear,
		editar: state.unidadMedicamento.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearUnidadMedicamento: (datosFormulario) => {
			dispatch(crearUnidadMedicamento(datosFormulario))
		},
		cerrarFormularioUnidadMedicamento: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioUnidadMedicamento())
		    // }
		},
		editarUnidadMedicamento: (datosFormulario) => {
			dispatch(editarUnidadMedicamento(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioUnidadMedicamento',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
