import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearConsultaDiagnostico,
	editarConsultaDiagnostico,
	cerrarFormularioConsultaDiagnostico
} from '../../actions'

import {
	listarDiagnosticos
} from '../../../diagnostico/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.id_parametroPreconsulta) {
		errors.id_parametroPreconsulta = 'Parametro obligatorio.'
	}

	if(!values.valor) {
		errors.valor = 'Obligatorio.'
	} else if (values.valor.toString().trim() == '') {
   		errors.valor = 'Obligatorio.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.consultaDiagnostico.formulario,
		initialValues: state.consultaDiagnostico.formulario.consultaDiagnostico,
		enableReinitialize: state.consultaDiagnostico.formulario.iniciarValores,
		editarContenido: state.consultaDiagnostico.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.consultaDiagnostico.crear,
		editar: state.consultaDiagnostico.editar,

		// listar todos los diagnósticos para mostrar dentro del select option.
		listarDiagnosticos: state.diagnostico.listar

	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearConsultaDiagnostico: (datosFormulario) => {
			dispatch(crearConsultaDiagnostico(datosFormulario))
		},
		editarConsultaDiagnostico: (datosFormulario) => {
			dispatch(editarConsultaDiagnostico(datosFormulario))
		},
		cerrarFormularioConsultaDiagnostico: () => {
			dispatch(cerrarFormularioConsultaDiagnostico())
		},

		// Llamar a la función listarDiagnosticosFuncion dentro de componentWillMount.
		listarDiagnosticosFuncion: () => {
			dispatch(listarDiagnosticos())
		}
	}
}

const form = reduxForm({
	form: 'FormularioConsultaDiagnostico',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
