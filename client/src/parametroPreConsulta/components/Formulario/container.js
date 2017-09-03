import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearParametroPreConsulta,
	editarParametroPreConsulta,
	cerrarFormularioParametroPreConsulta
} from '../../actions'

import Formulario from './Formulario'

// descripcion
// unidad
// valorNormal
// valorAlto
// valorBajo

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 3) {
   			errors.descripcion = 'Tiene que ser por lo menos 3 characteres.'
	}

	if(!values.unidad) {
		errors.unidad = 'Debe contener un valor.'
	} else if(!values.unidad.trim().length) {
		errors.unidad = 'Debe contener un valor.'
	}

	if(!values.valorNormal) {
		errors.valorNormal = 'Debe contener un valor.'
	} else if(!values.valorNormal.trim().length) {
		errors.valorNormal = 'Debe contener un valor.'
	}

	if(!values.valorAlto) {
		errors.valorAlto = 'Debe contener un valor.'
	} else if(!values.valorAlto.trim().length) {
		errors.valorAlto = 'Debe contener un valor.'
	}

	if(!values.valorBajo) {
		errors.valorBajo = 'Debe contener un valor.'
	} else if(!values.valorBajo.trim().length) {
		errors.valorBajo = 'Debe contener un valor.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.parametroPreConsulta.formulario,
		initialValues: state.parametroPreConsulta.formulario.parametroPreConsulta,
		enableReinitialize: state.parametroPreConsulta.formulario.iniciarValores,
		editarContenido: state.parametroPreConsulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.parametroPreConsulta.crear,
		editar: state.parametroPreConsulta.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearParametroPreConsulta: (datosFormulario) => {
			dispatch(crearParametroPreConsulta(datosFormulario))
		},
		cerrarFormularioParametroPreConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioParametroPreConsulta())
		    // }
		},
		editarParametroPreConsulta: (datosFormulario) => {
			dispatch(editarParametroPreConsulta(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioParametroPreConsulta',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
