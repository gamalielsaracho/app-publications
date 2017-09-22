import { connect } from 'react-redux'

import {
	cerrarModalMostrarTipoExamen
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.tipoExamen.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarTipoExamen: () => {
			dispatch(cerrarModalMostrarTipoExamen())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


