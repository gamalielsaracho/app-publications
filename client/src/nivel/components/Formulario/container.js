import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearNivel,
	editarNivel,
	cerrarFormularioNivel
} from '../../actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 5) {
   			errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
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
