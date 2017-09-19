import { connect } from 'react-redux'

import {
	listarMedicamentos,
	eliminarMedicamento,
	mostrarMedicamento,

	abrirFormularioCrearMedicamento,
	abrirFormularioEditarMedicamento
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.medicamento.crear,
		listar: state.medicamento.listar,
		medicamentos: state.medicamento.listar.medicamentos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarMedicamentos: () => {
			dispatch(listarMedicamentos())
		},
		eliminarMedicamento: (idMedicamento) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamento(idMedicamento))
		    }
		},
		mostrarMedicamento: (idMedicamento) => {
			dispatch(mostrarMedicamento(idMedicamento))
		},
		abrirFormularioCrearMedicamento: () => {
			dispatch(abrirFormularioCrearMedicamento())
		},
		abrirFormularioEditarMedicamento: (idMedicamento) => {
			dispatch(abrirFormularioEditarMedicamento(idMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)