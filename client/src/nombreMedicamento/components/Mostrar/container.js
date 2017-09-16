import { connect } from 'react-redux'

import {
	cerrarModalMostrarNombreMedicamento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.nombreMedicamento.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		cerrarModalMostrarNombreMedicamento: () => {
			dispatch(cerrarModalMostrarNombreMedicamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


