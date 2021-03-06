import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	listarPreConsultasFechaDia,

	cerrarModalListarPreConsultasFechaDia
} from '../../actions'

import {
	editarCitaIdPreConsultaField
} from '../../../cita/actions'


import AnadirPreConsulta from './AnadirPreConsulta'

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


		modalAgregarPreConsulta: state.preConsulta.modalAgregarPreConsulta,

    	// Para filtrar la lista de pre-consultas y mostrar solamente 1
    	// que sería la preconsulta que se hizo el paciente y se podría
    	// utilizar para muchas citas creadas en el Día.
    	listarPreConsultasFechaDia: state.preConsulta.listarPreConsultasFechaDia,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		listarPreConsultasFechaDiaFuncion: (fechaCita, idPaciente) => {
			dispatch(listarPreConsultasFechaDia(fechaCita, idPaciente))
		},

		cerrarModalListarPreConsultasFechaDia: () => {
			dispatch(cerrarModalListarPreConsultasFechaDia())
		},
		
		editarCitaIdPreConsultaField: (datosFormulario) => {
			dispatch(editarCitaIdPreConsultaField(datosFormulario))
		}
	}
}

const form = reduxForm({
	form: 'FormularioRol',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(AnadirPreConsulta))
