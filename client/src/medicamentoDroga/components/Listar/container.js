import { connect } from 'react-redux'

import {
	listarMedicamentoDrogas,
	eliminarMedicamentoDroga,
	abrirFormularioCrearMedicamentoDroga,
	abrirFormularioEditarMedicamentoDroga
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		crear: state.medicamentoDroga.crear,
		listar: state.medicamentoDroga.listar,
		medicamentoDrogas: state.medicamentoDroga.listar.medicamentoDrogas,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params,

		// Obtenemos el estado del formulario, para ver si esta abierto
		// y hacer render del mismo. 
		formulario: state.medicamentoDroga.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarMedicamentoDrogas: (idMedicamento) => {
			dispatch(listarMedicamentoDrogas(idMedicamento))
		},
		eliminarMedicamentoDroga: (idMedicamentoDroga) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamentoDroga(idMedicamentoDroga))
		    }
		},
		abrirFormularioCrearMedicamentoDroga: () => {
			dispatch(abrirFormularioCrearMedicamentoDroga())
		},
		abrirFormularioEditarMedicamentoDroga: (idMedicamentoDroga) => {
			dispatch(abrirFormularioEditarMedicamentoDroga(idMedicamentoDroga))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)