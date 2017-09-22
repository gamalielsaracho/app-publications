import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearParametroAnalisis,
	editarParametroAnalisis,
	cerrarFormularioParametroAnalisis
} from '../../actions'

import {
	listarUnidadesAnalisis
} from '../../../unidadAnalisis/actions'

import {
	listarTiposExamenes
} from '../../../tipoExamen/actions'

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

	if(!values.id_unidadAnalisis) {
		errors.id_unidadAnalisis = 'Unidad de medida obligatorio.'
	}

	if(!values.id_tipoExamen) {
		errors.id_tipoExamen = 'Tipo de examen obligatorio.'
	}
	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.parametroAnalisis.formulario,
		initialValues: state.parametroAnalisis.formulario.parametroAnalisis,
		enableReinitialize: state.parametroAnalisis.formulario.iniciarValores,
		editarContenido: state.parametroAnalisis.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.parametroAnalisis.crear,
		editar: state.parametroAnalisis.editar,

		// Para listar los datos en select option.
		listarUnidadesAnalisis: state.unidadAnalisis.listar,
		listarTiposExamenes: state.tipoExamen.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearParametroAnalisis: (datosFormulario) => {
			dispatch(crearParametroAnalisis(datosFormulario))
		},
		cerrarFormularioParametroAnalisis: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioParametroAnalisis())
		    // }
		},
		editarParametroAnalisis: (datosFormulario) => {
			dispatch(editarParametroAnalisis(datosFormulario))
		},


		// Para listar los datos en select option.
		listarUnidadesAnalisisFuncion: () => {
			dispatch(listarUnidadesAnalisis())
		},
		listarTiposExamenesFuncion: () => {
			dispatch(listarTiposExamenes())
		}
	}
}

const form = reduxForm({
	form: 'FormularioParametroAnalisis',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
