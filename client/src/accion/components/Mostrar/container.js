import { connect } from 'react-redux'

import {
	cerrarModalMostrarAccion
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.accion.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarAccion: () => {
			dispatch(cerrarModalMostrarAccion())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


