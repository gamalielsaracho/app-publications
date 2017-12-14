import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearCiudad,
	editarCiudad,
	cerrarFormularioCiudad,
} from '../../actions'

import {
	listarDepartamentos
} from '../../../departamento/actions'

import Formulario from './Formulario'

const validate = (values) => {
 	 var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

	const errors = {}

	if(!values.id_departamento) {
		errors.id_departamento = 'Tienes que introducir un departamento.'
	}

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
		formulario: state.ciudad.formulario,
		initialValues: state.ciudad.formulario.ciudad,
		enableReinitialize: state.ciudad.formulario.iniciarValores,
		editarContenido: state.ciudad.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.ciudad.crear,
		editar: state.ciudad.editar,

		// Llamamos Todos los departamentos para pasarle al select option.
		listarDepartamentos: state.departamento.listar		
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearCiudad: (datosFormulario) => {
			dispatch(crearCiudad(datosFormulario))
		},
		cerrarFormularioCiudad: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioCiudad())
		    // }
		},
		editarCiudad: (datosFormulario) => {
			dispatch(editarCiudad(datosFormulario))
		},


		// Para ser llamado dentro de componentWillMount()
		listarDepartamentosFuncion: () => {
			dispatch(listarDepartamentos())
		}
	}
}

const form = reduxForm({
	form: 'FormularioCiudad',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
