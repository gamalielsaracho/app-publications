import { connect } from 'react-redux'

import {
	listarConsultaDiagnosticos,
	eliminarConsultaDiagnostico,
	abrirFormularioEditarConsultaDiagnostico
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		idConsulta: ownProps.idConsulta,

		crear: state.diagnosticoConsulta.crear,
		listar: state.diagnosticoConsulta.listar,
		diagnosticosConsulta: state.diagnosticoConsulta.listar.diagnosticosConsulta,
	
		// Para obtener el id del personal que creó la consulta.
		mostrar: state.consulta.mostrar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarConsultaDiagnosticos: (idConsulta) => {
			dispatch(listarConsultaDiagnosticos(idConsulta))
		},
		eliminarConsultaDiagnostico: (idDiagnosticoConsulta) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarConsultaDiagnostico(idDiagnosticoConsulta))
		    }
		},
		abrirFormularioEditarConsultaDiagnostico: (idDiagnosticoConsulta) => {
			dispatch(abrirFormularioEditarConsultaDiagnostico(idDiagnosticoConsulta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)