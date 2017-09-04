import { connect } from 'react-redux'

import {
	cerrarModalMostrarParametroPreConsulta
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.parametroPreConsulta.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarParametroPreConsulta: () => {
			dispatch(cerrarModalMostrarParametroPreConsulta())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


