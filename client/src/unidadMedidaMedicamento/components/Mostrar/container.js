import { connect } from 'react-redux'

import {
	cerrarModalMostrarUnidadMedicamento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.unidadMedicamento.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarUnidadMedicamento: () => {
			dispatch(cerrarModalMostrarUnidadMedicamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


