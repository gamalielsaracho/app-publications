import { connect } from 'react-redux'

import {
	listarMedicamentosTratamientosByIdTratamiento,
	eliminarMedicamentoTratamiento,

	abrirFormularioCrearMedicamentoTratamiento,
	abrirFormularioEditarMedicamentoTratamiento
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.medicamentoTratamiento.eliminar,
		listar: state.medicamentoTratamiento.listar,
		medicamentosTratamiento: state.medicamentoTratamiento.listar.medicamentosTratamiento,
	
		// Para hacer render del formulario únicamente si está abierto.
		formulario: state.medicamentoTratamiento.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarMedicamentosTratamientosByIdTratamiento: (idTratamiento) => {
			dispatch(listarMedicamentosTratamientosByIdTratamiento(idTratamiento))
		},
		eliminarMedicamentoTratamiento: (idMedicamentoTratamiento) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarMedicamentoTratamiento(idMedicamentoTratamiento))
		    }
		},
		abrirFormularioCrearMedicamentoTratamiento: () => {
			dispatch(abrirFormularioCrearMedicamentoTratamiento())
		},
		abrirFormularioEditarMedicamentoTratamiento: (idMedicamentoTratamiento) => {
			dispatch(abrirFormularioEditarMedicamentoTratamiento(idMedicamentoTratamiento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)