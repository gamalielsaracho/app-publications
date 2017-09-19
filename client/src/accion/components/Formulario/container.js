import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearAccion,
	editarAccion,
	cerrarFormularioAccion
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
		formulario: state.accion.formulario,
		initialValues: state.accion.formulario.accion,
		enableReinitialize: state.accion.formulario.iniciarValores,
		editarContenido: state.accion.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.accion.crear,
		editar: state.accion.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearAccion: (datosFormulario) => {
			dispatch(crearAccion(datosFormulario))
		},
		cerrarFormularioAccion: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioAccion())
		    // }
		},
		editarAccion: (datosFormulario) => {
			dispatch(editarAccion(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioAccion',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
