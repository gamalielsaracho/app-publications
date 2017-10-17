import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearDroga,
	editarDroga,
	cerrarFormularioDroga
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
		formulario: state.droga.formulario,
		initialValues: state.droga.formulario.droga,
		enableReinitialize: state.droga.formulario.iniciarValores,
		editarContenido: state.droga.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.droga.crear,
		editar: state.droga.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearDroga: (datosFormulario) => {
			dispatch(crearDroga(datosFormulario))
		},
		cerrarFormularioDroga: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioDroga())
		    // }
		},
		editarDroga: (datosFormulario) => {
			dispatch(editarDroga(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioDroga',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
