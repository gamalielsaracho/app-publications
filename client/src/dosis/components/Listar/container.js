import { connect } from 'react-redux'

import {
	listarDosis,
	eliminarDosis,
	mostrarDosis,

	abrirFormularioCrearDosis,
	abrirFormularioEditarDosis
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.dosis.crear,
		listar: state.dosis.listar,
		listaDosis: state.dosis.listar.listaDosis
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarDosis: () => {
			dispatch(listarDosis())
		},
		eliminarDosis: (idDosis) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarDosis(idDosis))
		    }
		},
		mostrarDosis: (idDosis) => {
			dispatch(mostrarDosis(idDosis))
		},
		abrirFormularioCrearDosis: () => {
			dispatch(abrirFormularioCrearDosis())
		},
		abrirFormularioEditarDosis: (idDosis) => {
			dispatch(abrirFormularioEditarDosis(idDosis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)