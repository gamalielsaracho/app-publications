import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {
	crearPacienteAlergia,
	editarPacienteAlergia,
	cerrarFormularioPacienteAlergia
} from '../../actions'

import {
	listarAlergias
} from '../../../alergia/actions'

import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	if(!values.id_alergia) {
		errors.id_alergia = 'Tienes que introducir una alergia.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.alergiaPaciente.formulario,
		initialValues: state.alergiaPaciente.formulario.alergia,
		enableReinitialize: state.alergiaPaciente.formulario.iniciarValores,
		editarContenido: state.alergiaPaciente.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.alergiaPaciente.crear,
		editar: state.alergiaPaciente.editar,

		// Lista de las Alergias para pasarle al componente FieldSelectAlergias
		// como propiedad.
		listaAlergias: state.alergia.listar // map.
		// alergias: state.alergia.listar.alergias // shouldComponentUpdate.
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearPacienteAlergia: (datosFormulario) => {
			dispatch(crearPacienteAlergia(datosFormulario))
		},
		cerrarFormularioPacienteAlergia: () => {
		    var r = confirm("Está seguro que desea cancelar?");
		    if (r == true) {
				dispatch(cerrarFormularioPacienteAlergia())
		    }
		},
		editarPacienteAlergia: (datosFormulario) => {
			dispatch(editarPacienteAlergia(datosFormulario))
		},

		// Llamar dentro de componentWillMount, para listar las alergias.
		listarAlergias: () => {
			dispatch(listarAlergias())
		}
	}
}

const form = reduxForm({
	form: 'FormularioAlergiaPaciente',
	validate
})

export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
