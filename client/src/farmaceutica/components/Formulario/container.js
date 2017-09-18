import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearFarmaceutica,
	editarFarmaceutica,
	cerrarFormularioFarmaceutica
} from '../../actions'

import Formulario from './Formulario'

// nombre
// direccion
// telefono
const validate = (values) => {
	const errors = {}

	if(!values.nombre) {
		errors.nombre = 'Tienes que introducir un nombre.'
	}else if (values.nombre.trim().length < 5) {
   			errors.nombre = 'Tiene que ser por lo menos 5 caracteres.'
	}

	if(!values.direccion) {
		errors.direccion = 'Tienes que introducir una descripción.'
	}else if (values.direccion.trim().length < 1) {
   			errors.direccion = 'Tienes que introducir una descripción.'
	}

	if(!values.telefono) {
		errors.telefono = 'Tienes que introducir un telefono.'
	}else if (values.telefono.trim().length < 1) {
   			errors.telefono = 'Tienes que introducir una telefono.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.farmaceutica.formulario,
		initialValues: state.farmaceutica.formulario.farmaceutica,
		enableReinitialize: state.farmaceutica.formulario.iniciarValores,
		editarContenido: state.farmaceutica.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.farmaceutica.crear,
		editar: state.farmaceutica.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearFarmaceutica: (datosFormulario) => {
			dispatch(crearFarmaceutica(datosFormulario))
		},
		cerrarFormularioFarmaceutica: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioFarmaceutica())
		    // }
		},
		editarFarmaceutica: (datosFormulario) => {
			dispatch(editarFarmaceutica(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioFarmaceutica',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
