import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearTipoAnalisis,
	editarTipoAnalisis,
	cerrarFormularioTipoAnalisis
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
		formulario: state.tipoAnalisis.formulario,
		initialValues: state.tipoAnalisis.formulario.tipoAnalisis,
		enableReinitialize: state.tipoAnalisis.formulario.iniciarValores,
		editarContenido: state.tipoAnalisis.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.tipoAnalisis.crear,
		editar: state.tipoAnalisis.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearTipoAnalisis: (datosFormulario) => {
			dispatch(crearTipoAnalisis(datosFormulario))
		},
		cerrarFormularioTipoAnalisis: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioTipoAnalisis())
		    // }
		},
		editarTipoAnalisis: (datosFormulario) => {
			dispatch(editarTipoAnalisis(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioTipoAnalisis',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))