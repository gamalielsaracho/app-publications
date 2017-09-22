import { connect } from 'react-redux'

import {
	cerrarModalMostrarNivel
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.nivel.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarNivel: () => {
			dispatch(cerrarModalMostrarNivel())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


