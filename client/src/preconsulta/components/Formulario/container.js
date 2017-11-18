import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'


import {
	crearPreConsulta,
	editarPreConsulta,
	cerrarFormularioPreConsulta,

	listarPreConsultas
} from '../../actions'

// Select Options.
import {
	listarNiveles
} from '../../../nivel/actions'

import {
	listarPacientes
} from '../../../paciente/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.descripcion) {
		errors.descripcion = 'Tienes que introducir una descripción.'
	}else if (values.descripcion.length < 5) {
		values.descripcion.toLowerCase()
   		errors.descripcion = 'Tiene que ser por lo menos 5 characteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.preConsulta.formulario,
		initialValues: state.preConsulta.formulario.preConsulta,
		enableReinitialize: state.preConsulta.formulario.iniciarValores,
		editarContenido: state.preConsulta.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.preConsulta.crear,
		editar: state.preConsulta.editar,


		// Obtenemos los valores de los inputs para pasarle
		// el objeto valoresFiltro.
		valoresFiltro: {
			nroDocumento: selector(state, 'nroDocumento') || '',
			id_tipoDocumento: selector(state, 'id_tipoDocumento') || '',
			nombres: selector(state, 'nombres') || '',
			apellidos: selector(state, 'apellidos') || ''
    	},

		// Para mostrar dentro del select option.
    	listarNiveles: state.nivel.listar,

    	// Pacientes.
		listarPacientes: state.paciente.listar
    }
}


function mapDispatchToProps(dispatch) {
	return {
		crearPreConsulta: (datosFormulario) => {
			dispatch(crearPreConsulta(datosFormulario))
		},
		cerrarFormularioPreConsulta: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioPreConsulta())
		    // }
		},
		editarPreConsulta: (datosFormulario) => {
			dispatch(editarPreConsulta(datosFormulario))
		},

		// Select Options.
		listarNivelesFuncion: () => {
			dispatch(listarNiveles())
		},
		listarPacientesFuncion: () => {
			dispatch(listarPacientes())
		}
	}
}


const form = reduxForm({
	form: 'FormularioPreConsulta',
	validate
})

const selector = formValueSelector('FormularioPreConsulta')

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
