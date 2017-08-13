import { connect } from 'react-redux'

import {
	cerrarModalMostrarAlergia
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.alergia.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarAlergia: () => {
			dispatch(cerrarModalMostrarAlergia())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


