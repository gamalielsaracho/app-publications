import { connect } from 'react-redux'

import {
	cerrarModalMostrarRol
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.rol.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarRol: () => {
			dispatch(cerrarModalMostrarRol())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


