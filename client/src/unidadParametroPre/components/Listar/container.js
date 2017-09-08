import { connect } from 'react-redux'

import {
	listarUnidadesParametroPre,
	eliminarUnidadParametroPre,
	mostrarUnidadParametroPre,

	abrirFormularioCrearUnidadParametroPre,
	abrirFormularioEditarUnidadParametroPre
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.unidadParametroPre.crear,
		listar: state.unidadParametroPre.listar,
		unidadesParametroPre: state.unidadParametroPre.listar.unidadesParametroPre
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarUnidadesParametroPre: () => {
			dispatch(listarUnidadesParametroPre())
		},
		eliminarUnidadParametroPre: (idUnidadParametroPre) => {
			var r = confirm("Está seguro que desea eliminar?");
		    
		    if (r == true) {
				dispatch(eliminarUnidadParametroPre(idUnidadParametroPre))
		    }
		},
		mostrarUnidadParametroPre: (idUnidadParametroPre) => {
			dispatch(mostrarUnidadParametroPre(idUnidadParametroPre))
		},
		abrirFormularioCrearUnidadParametroPre: () => {
			dispatch(abrirFormularioCrearUnidadParametroPre())
		},
		abrirFormularioEditarUnidadParametroPre: (idUnidadParametroPre) => {
			dispatch(abrirFormularioEditarUnidadParametroPre(idUnidadParametroPre))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)