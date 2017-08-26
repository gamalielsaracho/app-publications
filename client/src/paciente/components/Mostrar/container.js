import { connect } from 'react-redux'

import {
	mostrarPaciente
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.paciente.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarPaciente: (idPaciente) => {
			dispatch(mostrarPaciente(idPaciente))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


