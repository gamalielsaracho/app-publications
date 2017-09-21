import { connect } from 'react-redux'

import {
	listarLotesMedicamentos,
	eliminarLoteMedicamento,
	mostrarLoteMedicamento,

	abrirFormularioCrearLoteMedicamento,
	abrirFormularioEditarLoteMedicamento
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.loteMedicamento.crear,
		listar: state.loteMedicamento.listar,
		lotesMedicamentos: state.loteMedicamento.listar.lotesMedicamentos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarLotesMedicamentos: () => {
			dispatch(listarLotesMedicamentos())
		},
		eliminarLoteMedicamento: (idLoteMedicamento) => {
			var r = confirm("Está seguro que desea eliminar el lote ?");
		    if (r == true) {
				dispatch(eliminarLoteMedicamento(idLoteMedicamento))
		    }
		},
		mostrarLoteMedicamento: (idLoteMedicamento) => {
			dispatch(mostrarLoteMedicamento(idLoteMedicamento))
		},
		abrirFormularioCrearLoteMedicamento: () => {
			dispatch(abrirFormularioCrearLoteMedicamento())
		},
		abrirFormularioEditarLoteMedicamento: (idLoteMedicamento) => {
			dispatch(abrirFormularioEditarLoteMedicamento(idLoteMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)