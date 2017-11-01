import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPreConsultaParametro,
	editarPreConsultaParametro,
	cerrarFormularioPreConsultaParametro
} from '../../actions'

import {
	listarParametrosPreConsulta
} from '../../../parametroPreConsulta/actions'

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
		formulario: state.preConsultaParametro.formulario,
		initialValues: state.preConsultaParametro.formulario.parametroPreConsulta,
		enableReinitialize: state.preConsultaParametro.formulario.iniciarValores,
		editarContenido: state.preConsultaParametro.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.preConsultaParametro.crear,
		editar: state.preConsultaParametro.editar,

		// Lista de los parametros para pasarle al componente 
		// FieldSelectParametrosPre como propiedad.
		listarParametrosPreConsulta: state.parametroPreConsulta.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPreConsultaParametro: (datosFormulario) => {
			dispatch(crearPreConsultaParametro(datosFormulario))
		},
		editarPreConsultaParametro: (datosFormulario) => {
			dispatch(editarPreConsultaParametro(datosFormulario))
		},
		cerrarFormularioPreConsultaParametro: () => {
			dispatch(cerrarFormularioPreConsultaParametro())
		},

		// Llamar dentro de componentWillMount, para listar los parametros.
		listarParametrosPreConsultaFuncion: () => {
			dispatch(listarParametrosPreConsulta())
		}
	}
}

const form = reduxForm({
	form: 'FormularioPreConsultaParametro',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
