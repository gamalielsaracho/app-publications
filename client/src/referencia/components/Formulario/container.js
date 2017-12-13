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

	// diasMinimos
	// diasMaximos
	// mesesMinimos
	// mesesMaximos
	// anosMinimos
	// anosMaximos
	// superior
	// inferior
	// sexo

	if(!values.inferior) {
		errors.inferior = 'Valor obligatorio.'
	} else if(values.inferior < 0) {
		errors.inferior = 'Valor invalido.'
	}


	if(!values.superior) {
		errors.superior = 'Valor obligatorio.'
	} else if(values.superior < 0) {
		errors.superior = 'Valor invalido.'
	}

	if(!values.sexo) {
		errors.sexo = 'Obligatorio.'
	}

	// ---------------------
	if(values.diasMinimos < 0) {
		errors.diasMinimos = 'Valor invalido.'
	}

	if(values.diasMaximos < 0) {
		errors.diasMaximos = 'Valor invalido.'
	}

	if(values.mesesMinimos < 0) {
		errors.mesesMinimos = 'Valor invalido.'
	}

	if(values.mesesMaximos < 0) {
		errors.mesesMaximos = 'Valor invalido.'
	}

	if(values.anosMinimos < 0) {
		errors.anosMinimos = 'Valor invalido.'
	}

	if(values.anosMaximos < 0) {
		errors.anosMaximos = 'Valor invalido.'
	}


	let condition = (
		!values.diasMinimos &&
		!values.diasMaximos &&
		!values.mesesMinimos &&
		!values.mesesMaximos &&
		!values.anosMinimos &&
		!values.anosMaximos
	)

	if((values.sexo || values.inferior || values.superior) && (condition)) {
		errors.diasMinimos = 'Tienes Completar el formulario.'
	}


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
