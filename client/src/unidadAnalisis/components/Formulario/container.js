import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearUnidadAnalisis,
	editarUnidadAnalisis,
	cerrarFormularioUnidadAnalisis
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 1) {
   			errors.descripcion = 'Tienes que introducir una descripción.'
	}

	// if(!values.nombre) {
	// 	errors.nombre = 'Tienes que introducir un nombre.'
	// }else if (values.nombre.trim().length < 1) {
 //   			errors.nombre = 'Tienes que introducir un nombre.'
	// }

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.unidadAnalisis.formulario,
		initialValues: state.unidadAnalisis.formulario.unidadAnalisis,
		enableReinitialize: state.unidadAnalisis.formulario.iniciarValores,
		editarContenido: state.unidadAnalisis.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.unidadAnalisis.crear,
		editar: state.unidadAnalisis.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearUnidadAnalisis: (datosFormulario) => {
			dispatch(crearUnidadAnalisis(datosFormulario))
		},
		cerrarFormularioUnidadAnalisis: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioUnidadAnalisis())
		    // }
		},
		editarUnidadAnalisis: (datosFormulario) => {
			dispatch(editarUnidadAnalisis(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioUnidadAnalisis',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
