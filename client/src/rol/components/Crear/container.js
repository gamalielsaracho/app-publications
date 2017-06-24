import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearRol,
	abrirFormularioRol,
	cerrarFormularioRol
} from '../../actions'

import Crear from './Crear'

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
		mostrar: state.rol.formulario.mostrar,
		crear: state.rol.crear
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearRol: (datosFormulario) => {
			dispatch(crearRol(datosFormulario))
		},
		abrirFormularioRol: () => {
			dispatch(abrirFormularioRol())
		},
		cerrarFormularioRol: () => {
			dispatch(cerrarFormularioRol())
		}
	}
}

const form = reduxForm({
	form: 'Crear',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Crear))
