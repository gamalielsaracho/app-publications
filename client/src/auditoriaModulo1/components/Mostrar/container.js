import { connect } from 'react-redux'

import {
	cerrarModalMostrarFarmaceutica
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.farmaceutica.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarFarmaceutica: () => {
			dispatch(cerrarModalMostrarFarmaceutica())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


