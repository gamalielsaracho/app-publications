import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearAnalisisSolicitadoTipo
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

		// Para obtener el error al crear.
		crear: state.analisisSolicitadoTipo.crear,

		// Lista de los tipos de análisis para pasarle al componente 
		// select option.
		listarTiposAnalisis: state.tipoAnalisis.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearAnalisisSolicitadoTipo: (datosFormulario) => {
			dispatch(crearAnalisisSolicitadoTipo(datosFormulario))
		},

		// Llamar dentro de componentWillMount, para listar los tipos de análisis.
		listarTiposAnalisisFuncion: () => {
			dispatch(listarTiposAnalisis())
		}
	}
}

const form = reduxForm({
	form: 'FormularioAnalisisSolicitadoTipo',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
