import { connect } from 'react-redux'

import {
	cerrarModalMostrarTipoConsumo
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.tipoConsumo.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarTipoConsumo: () => {
			dispatch(cerrarModalMostrarTipoConsumo())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


