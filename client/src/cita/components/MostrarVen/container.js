import { connect } from 'react-redux'

import {
	cerrarModalMostrarCita
} from '../../actions'

import MostrarVen from './MostrarVen'

function mapStateToProps(state) {
	return {
		mostrar: state.cita.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarCita: () => {
			dispatch(cerrarModalMostrarCita())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarVen)


