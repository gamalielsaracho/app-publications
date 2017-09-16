import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearNombreMedicamento,
	editarNombreMedicamento,
	cerrarFormularioNombreMedicamento
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 4) {
   			errors.descripcion = 'Tiene que ser por lo menos 4 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.nombreMedicamento.formulario,
		initialValues: state.nombreMedicamento.formulario.nombreMedicamento,
		enableReinitialize: state.nombreMedicamento.formulario.iniciarValores,
		editarContenido: state.nombreMedicamento.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.nombreMedicamento.crear,
		editar: state.nombreMedicamento.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearNombreMedicamento: (datosFormulario) => {
			dispatch(crearNombreMedicamento(datosFormulario))
		},
		cerrarFormularioNombreMedicamento: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioNombreMedicamento())
		    // }
		},
		editarNombreMedicamento: (datosFormulario) => {
			dispatch(editarNombreMedicamento(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioNombreMedicamento',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
