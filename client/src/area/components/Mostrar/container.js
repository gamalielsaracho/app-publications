import { connect } from 'react-redux'

import {
	cerrarModalMostrarArea
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.area.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarArea: () => {
			dispatch(cerrarModalMostrarArea())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


