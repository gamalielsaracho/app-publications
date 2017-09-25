import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearTipoAnalisisParametro,
	cerrarFormularioTipoAnalisisParametro
} from '../../actions'

import {
	listarParametrosAnalisis
} from '../../../parametroAnalisis/actions'

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

function mapStateToProps(state, ownProps) {
	return {
		formulario: state.tipoAnalisisParametro.formulario,
		initialValues: state.tipoAnalisisParametro.formulario.parametroTipoAnalisis,
		enableReinitialize: state.tipoAnalisisParametro.formulario.iniciarValores,
		editarContenido: state.tipoAnalisisParametro.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.tipoAnalisisParametro.crear,
		editar: state.tipoAnalisisParametro.editar,

		// Lista de los parametros para pasarle al componente 
		listarParametrosAnalisis: state.parametroAnalisis.listar,

		// para obtener el id del tipo de análisis en el cual está parado.
		urls: ownProps.params
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearTipoAnalisisParametro: (datosFormulario) => {
			dispatch(crearTipoAnalisisParametro(datosFormulario))
		},
		cerrarFormularioTipoAnalisisParametro: () => {
			dispatch(cerrarFormularioTipoAnalisisParametro())
		},

		// Llamar dentro de componentWillMount, para listar los parametros.
		listarParametrosAnalisisFuncion: () => {
			dispatch(listarParametrosAnalisis())
		}
	}
}

const form = reduxForm({
	form: 'FormularioTipoAnalisisParametro',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
