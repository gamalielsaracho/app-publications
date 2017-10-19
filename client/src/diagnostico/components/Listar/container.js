import { connect } from 'react-redux'

import {
	listarDiagnosticos,
	eliminarDiagnostico,
	mostrarDiagnostico,

	abrirFormularioCrearDiagnostico,
	abrirFormularioEditarDiagnostico
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.diagnostico.eliminar,
		listar: state.diagnostico.listar,
		diagnosticos: state.diagnostico.listar.diagnosticos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarDiagnosticos: () => {
			dispatch(listarDiagnosticos())
		},
		eliminarDiagnostico: (idDiagnostico) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarDiagnostico(idDiagnostico))
		    }
		},
		mostrarDiagnostico: (idDiagnostico) => {
			dispatch(mostrarDiagnostico(idDiagnostico))
		},
		abrirFormularioCrearDiagnostico: () => {
			dispatch(abrirFormularioCrearDiagnostico())
		},
		abrirFormularioEditarDiagnostico: (idDiagnostico) => {
			dispatch(abrirFormularioEditarDiagnostico(idDiagnostico))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)