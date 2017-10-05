import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearAnalisisTipo,
	cerrarFormularioAnalisisTipo
} from '../../actions'

import {
	listarTiposAnalisis
} from '../../../tipoAnalisis/actions'

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
		formulario: state.analisisTipo.formulario,

		// Para obtener el error al crear o editar.
		crear: state.analisisTipo.crear,

		// Lista de los tipos de análisis para mostrar dentro del select option.
		listarTiposAnalisis: state.tipoAnalisis.listar

	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearAnalisisTipo: (datosFormulario) => {
			dispatch(crearAnalisisTipo(datosFormulario))
		},
		cerrarFormularioAnalisisTipo: () => {
			dispatch(cerrarFormularioAnalisisTipo())
		},

		// Llamar dentro de componentWillMount, para listar los parametros.
		listarTiposAnalisisFuncion: () => {
			dispatch(listarTiposAnalisis())
		}
	}
}

const form = reduxForm({
	form: 'FormularioAnalisisTipo',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
