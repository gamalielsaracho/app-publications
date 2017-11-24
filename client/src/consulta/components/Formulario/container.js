import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearConsulta,
	editarConsulta,
	cerrarFormularioConsulta
} from '../../actions'

// Select Options.
import {
	listarNiveles
} from '../../../nivel/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	
	if(!values.fechaProximaConsulta) {
		errors.fechaProximaConsulta = 'Tienes que introducir una fecha.'
	}

	if (!values.id_nivel) {
   		errors.id_nivel = 'Tienes que introducir un nivel.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.consulta.formulario,
		initialValues: state.consulta.formulario.consulta,
		enableReinitialize: state.consulta.formulario.iniciarValores,
		editarContenido: state.consulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.consulta.crear,
		editar: state.consulta.editar,

		// Obtenemos los datos de la pre-consulta para sacar id_paciente
		// y pasarlo al formProps
		preConsulta: state.preConsulta.mostrar.preConsulta,

		// Para mostrar dentro del select option.
    	listarNiveles: state.nivel.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearConsulta: (datosFormulario) => {
			dispatch(crearConsulta(datosFormulario))
		},
		cerrarFormularioConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioConsulta())
		    // }
		},
		editarConsulta: (datosFormulario) => {
			dispatch(editarConsulta(datosFormulario))
		},

		// Select Options.
		listarNivelesFuncion: () => {
			dispatch(listarNiveles())
		}
	}
}

const form = reduxForm({
	form: 'FormularioConsulta',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
