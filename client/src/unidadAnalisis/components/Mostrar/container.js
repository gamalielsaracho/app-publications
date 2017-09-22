import { connect } from 'react-redux'

import {
	cerrarModalMostrarUnidadAnalisis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.unidadAnalisis.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarUnidadAnalisis: () => {
			dispatch(cerrarModalMostrarUnidadAnalisis())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


