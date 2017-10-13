import { connect } from 'react-redux'

import {
	listarConsultaDiagnosticos,
	eliminarConsultaDiagnostico,
	abrirFormularioCrearConsultaDiagnostico,
	abrirFormularioEditarConsultaDiagnostico
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		// Para obtener los parametros de la url en el cual el usuario está
		// parado.
		urls: ownProps.params,

		crear: state.consultaDiagnostico.crear,
		listar: state.consultaDiagnostico.listar,
		consultaDiagnosticos: state.consultaDiagnostico.listar.consultaDiagnosticos,
	
		// Para obtener el id del personal que creó la consulta.
		mostrarConsulta: state.consulta.mostrar
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
		},
		abrirFormularioCrearConsultaDiagnostico: () => {
			dispatch(abrirFormularioCrearConsultaDiagnostico())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)