import { connect } from 'react-redux'

import {
	cerrarModalMostrarDiagnostico
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.diagnostico.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarDiagnostico: () => {
			dispatch(cerrarModalMostrarDiagnostico())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


