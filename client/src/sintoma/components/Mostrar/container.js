import { connect } from 'react-redux'

import {
	cerrarModalMostrarSintoma
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.sintoma.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarSintoma: () => {
			dispatch(cerrarModalMostrarSintoma())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


