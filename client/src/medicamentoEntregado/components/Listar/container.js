import { connect } from 'react-redux'

import {
	eliminarMedicamentoEntregado,

	abrirFormularioCrearMedicamentoEntregado,
	abrirFormularioEditarMedicamentoEntregado
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.medicamentoEntregado.crear,
		listar: state.medicamentoEntregado.listar,
		medicamentosEntregados: state.medicamentoEntregado.listar.medicamentosEntregados,
	
		// Para hacer render del formuario únicamente si está abierto.
		formulario: state.medicamentoEntregado.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		eliminarMedicamentoEntregado: (idMedicamentoEntregado) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamentoEntregado(idMedicamentoEntregado))
		    }
		},
		abrirFormularioCrearMedicamentoEntregado: () => {
			dispatch(abrirFormularioCrearMedicamentoEntregado())
		},
		abrirFormularioEditarMedicamentoEntregado: (idMedicamentoEntregado) => {
			dispatch(abrirFormularioEditarMedicamentoEntregado(idMedicamentoEntregado))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)