import { connect } from 'react-redux'

import {
	cerrarModalMostrarMedicamentoAgregado
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.medicamentoAgregado.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarMedicamentoAgregado: () => {
			dispatch(cerrarModalMostrarMedicamentoAgregado())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


