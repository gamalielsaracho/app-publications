import { connect } from 'react-redux'

import {
	mostrarMedicamento,
	abrirFormularioEditarMedicamento,
	eliminarMedicamento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.medicamento.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioEditarMedicamento: (idMedicamento) => {
			dispatch(abrirFormularioEditarMedicamento(idMedicamento))
		},
		eliminarMedicamento: (idMedicamento) => {
			dispatch(eliminarMedicamento(idMedicamento))
		},
		mostrarMedicamento: (idMedicamento) => {
			dispatch(mostrarMedicamento(idMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


