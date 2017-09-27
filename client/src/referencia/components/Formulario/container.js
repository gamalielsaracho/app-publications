import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearReferencia,
	editarReferencia,
	cerrarFormularioReferencia
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	// if(!values.id_parametroPreconsulta) {
	// 	errors.id_parametroPreconsulta = 'Parametro obligatorio.'
	// }

	// if(!values.valor) {
	// 	errors.valor = 'Obligatorio.'
	// } else if (values.valor.toString().trim() == '') {
 //   		errors.valor = 'Obligatorio.'
	// }

	return errors
}

function mapStateToProps(state) {	
	return {
		formulario: state.referencia.formulario,
		initialValues: state.referencia.formulario.referencia,
		enableReinitialize: state.referencia.formulario.iniciarValores,
		editarContenido: state.referencia.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.referencia.crear,
		editar: state.referencia.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearReferencia: (datosFormulario) => {
			dispatch(crearReferencia(datosFormulario))
		},
		editarReferencia: (datosFormulario) => {
			dispatch(editarReferencia(datosFormulario))
		},
		cerrarFormularioReferencia: () => {
			dispatch(cerrarFormularioReferencia())
		}
	}
}

const form = reduxForm({
	form: 'FormularioReferencia',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
