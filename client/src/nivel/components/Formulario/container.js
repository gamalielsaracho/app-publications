import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearNivel,
	editarNivel,
	cerrarFormularioNivel
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
 	var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else {
		if(!patronTexto.test(values.descripcion)) {
        	errors.descripcion = 'Solo texto.'
      	} else if(values.descripcion.length < 3) {
   			errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
      	}
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.nivel.formulario,
		initialValues: state.nivel.formulario.nivel,
		enableReinitialize: state.nivel.formulario.iniciarValores,
		editarContenido: state.nivel.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.nivel.crear,
		editar: state.nivel.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearNivel: (datosFormulario) => {
			dispatch(crearNivel(datosFormulario))
		},
		cerrarFormularioNivel: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioNivel())
		    // }
		},
		editarNivel: (datosFormulario) => {
			dispatch(editarNivel(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioNivel',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
