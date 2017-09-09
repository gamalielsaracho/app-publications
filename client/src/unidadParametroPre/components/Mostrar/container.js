import { connect } from 'react-redux'

import {
	cerrarModalMostrarUnidadParametroPre
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.unidadParametroPre.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarUnidadParametroPre: () => {
			dispatch(cerrarModalMostrarUnidadParametroPre())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


