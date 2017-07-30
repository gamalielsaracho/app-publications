import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	editarRol,

	mostrarEditarRol,
	cerrarModalEditarRol
} from '../../actions'

import Editar from './Editar'

const validate = (values) => {
	const errors = {}

	if(!values.nombre) {
		errors.nombre = 'Tienes que introducir un nombre.'
	}else if (values.nombre.length < 5) {
   		errors.nombre = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		mostrarEditar: state.rol.mostrarEditar,
		initialValues: state.rol.mostrarEditar.rol,
		editar: state.rol.editar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		editarRol: (datosFormulario) => {
			dispatch(editarRol(datosFormulario))
		},
		mostrarEditarRol: (idRol) => {
			dispatch(mostrarEditarRol(idRol))
		},
		cerrarModalEditarRol: () => {
			dispatch(cerrarModalEditarRol())
		}
	}
}

const form = reduxForm({
	form: 'Editar',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Editar))
