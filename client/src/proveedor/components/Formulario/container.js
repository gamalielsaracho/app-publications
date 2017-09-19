import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearProveedor,
	editarProveedor,
	cerrarFormularioProveedor
} from '../../actions'

import Formulario from './Formulario'

// nombre
// telefono
// direccion
const validate = (values) => {
	const errors = {}

	if(!values.nombre) {
		errors.nombre = 'Tienes que introducir un nombre.'
	}else if (values.nombre.trim().length < 5) {
   			errors.nombre = 'Tiene que ser por lo menos 5 caracteres.'
	}

	if(!values.telefono) {
		errors.telefono = 'Tienes que introducir un telefono.'
	}else if (values.telefono.trim().length < 4) {
   			errors.telefono = 'Tiene que ser por lo menos 4 caracteres.'
	}

	if(!values.direccion) {
		errors.direccion = 'Tienes que introducir una dirección.'
	}else if (values.direccion.trim().length < 4) {
   			errors.direccion = 'Tiene que ser por lo menos 4 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.proveedor.formulario,
		initialValues: state.proveedor.formulario.proveedor,
		enableReinitialize: state.proveedor.formulario.iniciarValores,
		editarContenido: state.proveedor.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.proveedor.crear,
		editar: state.proveedor.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearProveedor: (datosFormulario) => {
			dispatch(crearProveedor(datosFormulario))
		},
		cerrarFormularioProveedor: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioProveedor())
		    // }
		},
		editarProveedor: (datosFormulario) => {
			dispatch(editarProveedor(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioProveedor',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
