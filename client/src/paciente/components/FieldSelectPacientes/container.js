import { connect } from 'react-redux'

import {
	abrirFormularioCrearPaciente
} from '../../actions'

import FieldSelectPacientes from './FieldSelectPacientes'

function mapStateToProps(state) {
	return {
		// Para mostrar el formulario únicamente si está abierto.
		formulario: state.paciente.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearPaciente: () => {
			dispatch(abrirFormularioCrearPaciente())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectPacientes)