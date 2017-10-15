import { connect } from 'react-redux'

import {
	mostrarMedicamentoEntregado,
	abrirFormularioEditarMedicamentoEntregado,
	eliminarMedicamentoEntregado
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.medicamentoEntregado.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarMedicamentoEntregado: (idMedicamentoEntregado) => {
			dispatch(mostrarMedicamentoEntregado(idMedicamentoEntregado))
		},
		eliminarMedicamentoEntregado: (idMedicamentoEntregado) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamentoEntregado(idMedicamentoEntregado))
		    }
		},
		abrirFormularioEditarMedicamentoEntregado: (idMedicamentoEntregado) => {
			dispatch(abrirFormularioEditarMedicamentoEntregado(idMedicamentoEntregado))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


