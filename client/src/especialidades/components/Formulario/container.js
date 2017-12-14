import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearEspecialidad,
	editarEspecialidad,
	cerrarFormularioEspecialidad
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
      	} else if (values.descripcion.trim().length < 5) {
	   		errors.descripcion = 'Tiene que ser por lo menos 5 caracteres.'
      	}
	}


	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.especialidad.formulario,
		initialValues: state.especialidad.formulario.especialidad,
		enableReinitialize: state.especialidad.formulario.iniciarValores,
		editarContenido: state.especialidad.formulario.iniciarValores,
	
		// Para obtener el error al crear o editar.
		crear: state.especialidad.crear,
		editar: state.especialidad.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearEspecialidad: (datosFormulario) => {
			dispatch(crearEspecialidad(datosFormulario))
		},
		cerrarFormularioEspecialidad: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioEspecialidad())
		    // }
		},
		editarEspecialidad: (datosFormulario) => {
			dispatch(editarEspecialidad(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'Formulario',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
