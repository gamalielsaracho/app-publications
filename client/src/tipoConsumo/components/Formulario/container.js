import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearTipoConsumo,
	editarTipoConsumo,
	cerrarFormularioTipoConsumo
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 5) {
   			errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.tipoConsumo.formulario,
		initialValues: state.tipoConsumo.formulario.tipoConsumo,
		enableReinitialize: state.tipoConsumo.formulario.iniciarValores,
		editarContenido: state.tipoConsumo.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.tipoConsumo.crear,
		editar: state.tipoConsumo.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearTipoConsumo: (datosFormulario) => {
			dispatch(crearTipoConsumo(datosFormulario))
		},
		cerrarFormularioTipoConsumo: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioTipoConsumo())
		    // }
		},
		editarTipoConsumo: (datosFormulario) => {
			dispatch(editarTipoConsumo(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioTipoConsumo',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
