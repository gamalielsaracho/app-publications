import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearConsultaSintoma,
	editarConsultaSintoma,
	cerrarFormularioConsultaSintoma
} from '../../actions'

import {
	listarSintomas
} from '../../../sintoma/actions'

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
		formulario: state.consultaSintoma.formulario,
		initialValues: state.consultaSintoma.formulario.sintomaConsulta,
		enableReinitialize: state.consultaSintoma.formulario.iniciarValores,
		editarContenido: state.consultaSintoma.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.consultaSintoma.crear,
		editar: state.consultaSintoma.editar,

		// Listar todos los síntomas para mostrarlo dentro del select option. 
		listarSintomas: state.sintoma.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearConsultaSintoma: (datosFormulario) => {
			dispatch(crearConsultaSintoma(datosFormulario))
		},
		editarConsultaSintoma: (datosFormulario) => {
			dispatch(editarConsultaSintoma(datosFormulario))
		},
		cerrarFormularioConsultaSintoma: () => {
			dispatch(cerrarFormularioConsultaSintoma())
		},

		// Función que es llamado dentro de componentWillMount.
		// para listar los síntomas.
		listarSintomasFuncion: () => {
			dispatch(listarSintomas())
		}
	}
}

const form = reduxForm({
	form: 'FormularioConsultaSintoma',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
