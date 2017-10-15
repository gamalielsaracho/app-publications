import { connect } from 'react-redux'

import {
	cerrarModalMostrarDroga
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.droga.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarDroga: () => {
			dispatch(cerrarModalMostrarDroga())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


