import { connect } from 'react-redux'

import {
	listarNombresMedicamentos,
	eliminarNombreMedicamento,
	mostrarNombreMedicamento,

	abrirFormularioCrearNombreMedicamento,
	abrirFormularioEditarNombreMedicamento
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.nombreMedicamento.crear,
		listar: state.nombreMedicamento.listar,
		nombresMedicamentos: state.nombreMedicamento.listar.nombresMedicamentos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarNombresMedicamentos: () => {
			dispatch(listarNombresMedicamentos())
		},
		eliminarNombreMedicamento: (idNombreMedicamento) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarNombreMedicamento(idNombreMedicamento))
		    }
		},
		mostrarNombreMedicamento: (idNombreMedicamento) => {
			dispatch(mostrarNombreMedicamento(idNombreMedicamento))
		},
		abrirFormularioCrearNombreMedicamento: () => {
			dispatch(abrirFormularioCrearNombreMedicamento())
		},
		abrirFormularioEditarNombreMedicamento: (idNombreMedicamento) => {
			dispatch(abrirFormularioEditarNombreMedicamento(idNombreMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)