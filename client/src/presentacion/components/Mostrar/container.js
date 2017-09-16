import { connect } from 'react-redux'

import {
	cerrarModalMostrarPresentacion
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.presentacion.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarPresentacion: () => {
			dispatch(cerrarModalMostrarPresentacion())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


