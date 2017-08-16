import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPaciente,
	editarPaciente,
	cerrarFormularioPaciente
} from '../../actions'

import {
	listarAreas,
} from '../../../area/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.paciente.formulario,
		initialValues: state.paciente.formulario.paciente,
		enableReinitialize: state.paciente.formulario.iniciarValores,
		editarContenido: state.paciente.formulario.iniciarValores,

    	listaAreas: state.area.listar,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPaciente: (datosFormulario) => {
			dispatch(crearPaciente(datosFormulario))
		},
		cerrarFormularioPaciente: () => {
			dispatch(cerrarFormularioPaciente())
		},
		editarPaciente: (datosFormulario) => {
			dispatch(editarPaciente(datosFormulario))
		},

		listarAreas: () => {
			dispatch(listarAreas())
		}
	}
}

const form = reduxForm({
	form: 'FormularioPaciente',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
