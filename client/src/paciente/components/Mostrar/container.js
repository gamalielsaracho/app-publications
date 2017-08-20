import { connect } from 'react-redux'

import {
	mostrarPaciente
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state, ownProps) {
	return {
		mostrar: state.paciente.mostrar,
		nroDocumento: ownProps.nroDocumento
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarPaciente: (nroDocumento, idTipoDocumento) => {
			dispatch(mostrarPaciente(nroDocumento, idTipoDocumento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


