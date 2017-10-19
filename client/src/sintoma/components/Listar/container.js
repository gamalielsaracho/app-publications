import { connect } from 'react-redux'

import {
	listarSintomas,
	eliminarSintoma,
	mostrarSintoma,

	abrirFormularioCrearSintoma,
	abrirFormularioEditarSintoma
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.sintoma.eliminar,
		listar: state.sintoma.listar,
		sintomas: state.sintoma.listar.sintomas
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarSintomas: () => {
			dispatch(listarSintomas())
		},
		eliminarSintoma: (idSintoma) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarSintoma(idSintoma))
		    }
		},
		mostrarSintoma: (idSintoma) => {
			dispatch(mostrarSintoma(idSintoma))
		},
		abrirFormularioCrearSintoma: () => {
			dispatch(abrirFormularioCrearSintoma())
		},
		abrirFormularioEditarSintoma: (idSintoma) => {
			dispatch(abrirFormularioEditarSintoma(idSintoma))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)