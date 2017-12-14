import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearTipoAnalisis,
	editarTipoAnalisis,
	cerrarFormularioTipoAnalisis
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
    var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else {
		if (!patronTexto.test(values.descripcion)) {
      		errors.descripcion = 'Solo texto.'
	    } else if(values.descripcion.length < 3){
	    	errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
	    }
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.tipoAnalisis.formulario,
		initialValues: state.tipoAnalisis.formulario.tipoAnalisis,
		enableReinitialize: state.tipoAnalisis.formulario.iniciarValores,
		editarContenido: state.tipoAnalisis.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.tipoAnalisis.crear,
		editar: state.tipoAnalisis.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearTipoAnalisis: (datosFormulario) => {
			dispatch(crearTipoAnalisis(datosFormulario))
		},
		cerrarFormularioTipoAnalisis: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioTipoAnalisis())
		    // }
		},
		editarTipoAnalisis: (datosFormulario) => {
			dispatch(editarTipoAnalisis(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioTipoAnalisis',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
