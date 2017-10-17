import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPresentacion,
	editarPresentacion,
	cerrarFormularioPresentacion
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
		formulario: state.presentacion.formulario,
		initialValues: state.presentacion.formulario.presentacion,
		enableReinitialize: state.presentacion.formulario.iniciarValores,
		editarContenido: state.presentacion.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.presentacion.crear,
		editar: state.presentacion.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPresentacion: (datosFormulario) => {
			dispatch(crearPresentacion(datosFormulario))
		},
		cerrarFormularioPresentacion: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioPresentacion())
		    // }
		},
		editarPresentacion: (datosFormulario) => {
			dispatch(editarPresentacion(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioPresentacion',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
