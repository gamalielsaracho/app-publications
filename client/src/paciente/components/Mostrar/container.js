import { connect } from 'react-redux'

import {
	cerrarModalMostrarPaciente
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.paciente.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarPaciente: () => {
			dispatch(cerrarModalMostrarPaciente())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


