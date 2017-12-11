import { connect } from 'react-redux'

import {
	mostrarMedicamentoEntregado
} from '../../../medicamentoEntregado/actions'

import {
	listarMedicamentosAgregados,
	eliminarMedicamentoAgregado,
	abrirFormularioCrearMedicamentoAgregado,
	abrirFormularioEditarMedicamentoAgregado,
	mostrarMedicamentoAgregado
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		crear: state.medicamentoAgregado.crear,
		listar: state.medicamentoAgregado.listar,
		medicamentosAgregados: state.medicamentoAgregado.listar.medicamentosAgregados,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params,

		// Obtenemos el estado del formulario, para ver si esta abierto
		// y hacer render del mismo. 
		formulario: state.medicamentoAgregado.formulario,

		// Obtener el estado de impresion de un comprobante.
		mostrar: state.medicamentoEntregado.mostrar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarMedicamentosAgregados: (idMedicamentoEntregado) => {
			dispatch(listarMedicamentosAgregados(idMedicamentoEntregado))
		},
		eliminarMedicamentoAgregado: (idMedicamentoXentregado) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamentoAgregado(idMedicamentoXentregado))
		    }
		},
		abrirFormularioCrearMedicamentoAgregado: () => {
			dispatch(abrirFormularioCrearMedicamentoAgregado())
		},
		abrirFormularioEditarMedicamentoAgregado: (idMedicamentoXentregado) => {
			dispatch(abrirFormularioEditarMedicamentoAgregado(idMedicamentoXentregado))
		},
		mostrarMedicamentoAgregado: (idMedicamentoXentregado) => {
			dispatch(mostrarMedicamentoAgregado(idMedicamentoXentregado))
		},


		// Para obtener el estado del comprobante de medicamentos entregados.
		mostrarMedicamentoEntregado: (idMedicamentoEntregado) => {
			dispatch(mostrarMedicamentoEntregado(idMedicamentoEntregado))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)