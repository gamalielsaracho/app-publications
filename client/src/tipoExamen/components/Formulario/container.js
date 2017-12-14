import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearTipoExamen,
	editarTipoExamen,
	cerrarFormularioTipoExamen
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
		formulario: state.tipoExamen.formulario,
		initialValues: state.tipoExamen.formulario.tipoExamen,
		enableReinitialize: state.tipoExamen.formulario.iniciarValores,
		editarContenido: state.tipoExamen.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.tipoExamen.crear,
		editar: state.tipoExamen.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearTipoExamen: (datosFormulario) => {
			dispatch(crearTipoExamen(datosFormulario))
		},
		cerrarFormularioTipoExamen: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioTipoExamen())
		    // }
		},
		editarTipoExamen: (datosFormulario) => {
			dispatch(editarTipoExamen(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioTipoExamen',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
