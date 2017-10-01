import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearAnalisisSolicitado,
	editarAnalisisSolicitado,
	cerrarFormularioAnalisisSolicitado
} from '../../actions'

import Formulario from './Formulario'

// descripcion
// id_unidadAnalisis
// id_tipoExamen
const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.trim().length < 1) {
   			errors.descripcion = 'Tienes que introducir una descripción.'
	}

	// if(!values.id_unidadAnalisis) {
	// 	errors.id_unidadAnalisis = 'Unidad de medida obligatorio.'
	// }

	if(!values.id_tipoExamen) {
		errors.id_tipoExamen = 'Tipo de examen obligatorio.'
	}
	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.analisisSolicitado.formulario,
		initialValues: state.analisisSolicitado.formulario.analisisSolicitado,
		enableReinitialize: state.analisisSolicitado.formulario.iniciarValores,
		editarContenido: state.analisisSolicitado.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.analisisSolicitado.crear,
		editar: state.analisisSolicitado.editar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearAnalisisSolicitado: (datosFormulario) => {
			dispatch(crearAnalisisSolicitado(datosFormulario))
		},
		cerrarFormularioAnalisisSolicitado: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioAnalisisSolicitado())
		    // }
		},
		editarAnalisisSolicitado: (datosFormulario) => {
			dispatch(editarAnalisisSolicitado(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioAnalisisSolicitado',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
