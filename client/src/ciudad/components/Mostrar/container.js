import { connect } from 'react-redux'

import {
	cerrarModalMostrarCiudad
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.ciudad.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarCiudad: () => {
			dispatch(cerrarModalMostrarCiudad())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


