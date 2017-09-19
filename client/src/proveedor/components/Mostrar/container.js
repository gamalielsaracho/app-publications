import { connect } from 'react-redux'

import {
	cerrarModalMostrarProveedor
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.proveedor.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarProveedor: () => {
			dispatch(cerrarModalMostrarProveedor())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


