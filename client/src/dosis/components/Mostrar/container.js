import { connect } from 'react-redux'

import {
	cerrarModalMostrarDosis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.dosis.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarDosis: () => {
			dispatch(cerrarModalMostrarDosis())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


