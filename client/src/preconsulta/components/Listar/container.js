import { connect } from 'react-redux'

import {
	abrirFormularioCrearPreConsulta,
	abrirFormularioEditarPreConsulta,

	eliminarPreConsulta
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	// console.log(ownProps.params)
	return {
		crear: state.preConsulta.crear,
		listar: state.preConsulta.listar,
		preConsultas: state.preConsulta.listar.preConsultas,
		

		// Para hacer render del formulario únicamente si está abierto.
		formulario: state.preConsulta.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearPreConsulta: () => {
			dispatch(abrirFormularioCrearPreConsulta())
		},
		abrirFormularioEditarPreConsulta: (idPreConsulta) => {
			dispatch(abrirFormularioEditarPreConsulta(idPreConsulta))
		},
		eliminarPreConsulta: (idPreConsulta) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarPreConsulta(idPreConsulta))
		    }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)