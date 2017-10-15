import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
	crearMedicamentoEntregado,
	editarMedicamentoEntregado,
	cerrarFormularioMedicamentoEntregado
} from '../../actions'


import {
	listarPacientes
} from '../../../paciente/actions'


import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.id_paciente) {
		errors.id_paciente = 'Tienes que seleccionar un paciente.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.medicamentoEntregado.formulario,
		initialValues: state.medicamentoEntregado.formulario.medicamentoEntregado,
		enableReinitialize: state.medicamentoEntregado.formulario.iniciarValores,
		editarContenido: state.medicamentoEntregado.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.medicamentoEntregado.crear,
		editar: state.medicamentoEntregado.editar,


		// Obtenemos los valores de los inputs para pasarle
		// el objeto valoresFiltro.
		valoresFiltro: {
			nroDocumento: selector(state, 'nroDocumento') || '',
			id_tipoDocumento: selector(state, 'id_tipoDocumento') || '',
			nombres: selector(state, 'nombres') || '',
			apellidos: selector(state, 'apellidos') || ''
    	},


    	// Obtener La lista de pacientes para mostrarlo dentro 
    	// del form-inline.
		listarPacientes: state.paciente.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMedicamentoEntregado: (datosFormulario) => {
			dispatch(crearMedicamentoEntregado(datosFormulario))
		},
		cerrarFormularioMedicamentoEntregado: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioMedicamentoEntregado())
		    // }
		},
		editarMedicamentoEntregado: (datosFormulario) => {
			dispatch(editarMedicamentoEntregado(datosFormulario))
		},


		// Función para llamarlo dentro de componentWillMount. 
		listarPacientesFuncion: () => {
			dispatch(listarPacientes())
		}
	}
}

const form = reduxForm({
	form: 'FormularioMedicamentoEntregado',
	validate
})

const selector = formValueSelector('FormularioMedicamentoEntregado')

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
