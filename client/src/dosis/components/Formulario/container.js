import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearDosis,
	editarDosis,
	cerrarFormularioDosis
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.valor) {
		errors.valor = 'Tienes que introducir un valor.'
	}else if (values.valor.trim().length < 1) {
   			errors.valor = 'Tienes que introducir un valor.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.dosis.formulario,
		initialValues: state.dosis.formulario.dosis,
		enableReinitialize: state.dosis.formulario.iniciarValores,
		editarContenido: state.dosis.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.dosis.crear,
		editar: state.dosis.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearDosis: (datosFormulario) => {
			dispatch(crearDosis(datosFormulario))
		},
		cerrarFormularioDosis: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioDosis())
		    // }
		},
		editarDosis: (datosFormulario) => {
			dispatch(editarDosis(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioDosis',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
