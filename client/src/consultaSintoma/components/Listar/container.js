import { connect } from 'react-redux'

import {
	listarConsultaSintomas,
	eliminarConsultaSintoma,
	abrirFormularioCrearConsultaSintoma,
	abrirFormularioEditarConsultaSintoma
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		crear: state.consultaSintoma.crear,
		listar: state.consultaSintoma.listar,
		sintomasConsulta: state.consultaSintoma.listar.sintomasConsulta,

		// Obtenemos el estado de la consulta para poder tener el id del
		// personal que creó la consulta.
		mostrarConsulta: state.consulta.mostrar,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params,

		// Obtenemos el estado del formulario, para ver si esta abierto
		// y hacer render del mismo. 
		formulario: state.consultaSintoma.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarConsultaSintomas: (idConsulta) => {
			dispatch(listarConsultaSintomas(idConsulta))
		},
		eliminarConsultaSintoma: (idConsultaSintoma) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarConsultaSintoma(idConsultaSintoma))
		    }
		},
		abrirFormularioCrearConsultaSintoma: () => {
			dispatch(abrirFormularioCrearConsultaSintoma())
		},
		abrirFormularioEditarConsultaSintoma: (idConsultaSintoma) => {
			dispatch(abrirFormularioEditarConsultaSintoma(idConsultaSintoma))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)