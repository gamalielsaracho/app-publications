import { connect } from 'react-redux'

import {
	listarAnalisisTipos,
	eliminarAnalisisTipo,
	mostrarAnalisisTipo,

	abrirFormularioCrearAnalisisTipo
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		eliminar: state.analisisTipo.eliminar,
		crear: state.analisisTipo.crear,
		listar: state.analisisTipo.listar,
		analisisTipos: state.analisisTipo.listar.analisisTipos,

		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisTipos: (idAnalisis) => {
			dispatch(listarAnalisisTipos(idAnalisis))
		},
		eliminarAnalisisTipo: (idAnalisisTipo) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarAnalisisTipo(idAnalisisTipo))
		    }
		},
		mostrarAnalisisTipo: (idAnalisisTipo) => {
			dispatch(mostrarAnalisisTipo(idAnalisisTipo))
		},
		abrirFormularioCrearAnalisisTipo: () => {
			dispatch(abrirFormularioCrearAnalisisTipo())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)