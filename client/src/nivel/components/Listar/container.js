import { connect } from 'react-redux'

import {
	listarNiveles,
	eliminarNivel,
	mostrarNivel,

	abrirFormularioCrearNivel,
	abrirFormularioEditarNivel
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.nivel.crear,
		listar: state.nivel.listar,
		niveles: state.nivel.listar.niveles
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarNiveles: () => {
			dispatch(listarNiveles())
		},
		eliminarNivel: (idNivel) => {
			var r = confirm("Está seguro que desea eliminar el rol?");
		    if (r == true) {
				dispatch(eliminarNivel(idNivel))
		    }
		},
		mostrarNivel: (idNivel) => {
			dispatch(mostrarNivel(idNivel))
		},
		abrirFormularioCrearNivel: () => {
			dispatch(abrirFormularioCrearNivel())
		},
		abrirFormularioEditarNivel: (idNivel) => {
			dispatch(abrirFormularioEditarNivel(idNivel))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)