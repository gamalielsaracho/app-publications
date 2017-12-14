import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearArea,
	editarArea,
	cerrarFormularioArea
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
      	} else if (values.descripcion.length < 3){
	   		errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
      	}
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.area.formulario,
		initialValues: state.area.formulario.area,
		enableReinitialize: state.area.formulario.iniciarValores,
		editarContenido: state.area.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.area.crear,
		editar: state.area.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearArea: (datosFormulario) => {
			dispatch(crearArea(datosFormulario))
		},
		cerrarFormularioArea: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioArea())
		    // }
		},
		editarArea: (datosFormulario) => {
			dispatch(editarArea(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioArea',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
