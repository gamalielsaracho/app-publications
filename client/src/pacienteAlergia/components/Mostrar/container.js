import { connect } from 'react-redux'

import {
	cerrarModalMostrarPacienteAlergia
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.alergiaPaciente.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarPacienteAlergia: () => {
			dispatch(cerrarModalMostrarPacienteAlergia())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


