import { connect } from 'react-redux'

import {
	mostrarMedicamento,
	abrirFormularioEditarMedicamento,
	eliminarMedicamento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.medicamento.eliminar,
		mostrar: state.medicamento.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioEditarMedicamento: (idMedicamento) => {
			dispatch(abrirFormularioEditarMedicamento(idMedicamento))
		},
		eliminarMedicamento: (idMedicamento) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamento(idMedicamento))
		    }
		},
		mostrarMedicamento: (idMedicamento) => {
			dispatch(mostrarMedicamento(idMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


