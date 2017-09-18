import { connect } from 'react-redux'

import {
	listarUnidadesMedicamentos,
	eliminarUnidadMedicamento,
	mostrarUnidadMedicamento,

	abrirFormularioCrearUnidadMedicamento,
	abrirFormularioEditarUnidadMedicamento
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.unidadMedicamento.crear,
		listar: state.unidadMedicamento.listar,
		unidadesMedicamentos: state.unidadMedicamento.listar.unidadesMedicamentos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarUnidadesMedicamentos: () => {
			dispatch(listarUnidadesMedicamentos())
		},
		eliminarUnidadMedicamento: (idUnidadMedicamento) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarUnidadMedicamento(idUnidadMedicamento))
		    }
		},
		mostrarUnidadMedicamento: (idUnidadMedicamento) => {
			dispatch(mostrarUnidadMedicamento(idUnidadMedicamento))
		},
		abrirFormularioCrearUnidadMedicamento: () => {
			dispatch(abrirFormularioCrearUnidadMedicamento())
		},
		abrirFormularioEditarUnidadMedicamento: (idUnidadMedicamento) => {
			dispatch(abrirFormularioEditarUnidadMedicamento(idUnidadMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)