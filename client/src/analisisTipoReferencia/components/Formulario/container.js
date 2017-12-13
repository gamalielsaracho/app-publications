import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearAnalisisTipoReferencia,
	editarAnalisisTipoReferencia,
	cerrarFormularioAnalisisTipoReferencia,

	limpiarMensajeErrorAnalisisTipoReferencia
} from '../../actions'

import {
	listarReferenciasPorTipoAnalisisEdadYsexo
} from '../../../referencia/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.id_referencia) {
		errors.id_referencia = 'Parametro obligatorio.'
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
		formulario: state.analisisTipoReferencia.formulario,
		initialValues: state.analisisTipoReferencia.formulario.analisisTipoReferencia,
		enableReinitialize: state.analisisTipoReferencia.formulario.iniciarValores,
		editarContenido: state.analisisTipoReferencia.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.analisisTipoReferencia.crear,
		editar: state.analisisTipoReferencia.editar,

		// Lista de los parametros para pasarle al componente 
		// FieldSelectReferencias como propiedad.
		listarReferenciasFiltradas: state.referencia.listarFiltradas

	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearAnalisisTipoReferencia: (datosFormulario) => {
			dispatch(crearAnalisisTipoReferencia(datosFormulario))

			setTimeout(function () {
				dispatch(limpiarMensajeErrorAnalisisTipoReferencia())
			}, 5000)
		},
		editarAnalisisTipoReferencia: (datosFormulario) => {
			dispatch(editarAnalisisTipoReferencia(datosFormulario))
		},
		cerrarFormularioAnalisisTipoReferencia: () => {
			dispatch(cerrarFormularioAnalisisTipoReferencia())
		},

		// Llamar dentro de componentWillMount, para listar los parametros.
		listarReferenciasPorTipoAnalisisEdadYsexo: (idTipoAnalisis, fechaNacimiento, sexo) => {
			dispatch(listarReferenciasPorTipoAnalisisEdadYsexo(idTipoAnalisis, fechaNacimiento, sexo))
		}
	}
}

const form = reduxForm({
	form: 'FormularioAnalisisTipoReferencia',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
