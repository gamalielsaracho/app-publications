import { connect } from 'react-redux'

import {
	listarAlergias,
	eliminarAlergia,
	mostrarAlergia,

	abrirFormularioCrearAlergia,
	abrirFormularioEditarAlergia
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.alergia.crear,
		listar: state.alergia.listar,
		alergias: state.alergia.listar.alergias
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAlergias: () => {
			dispatch(listarAlergias())
		},
		eliminarAlergia: (idAlergia) => {
			dispatch(eliminarAlergia(idAlergia))
		},
		mostrarAlergia: (idAlergia) => {
			dispatch(mostrarAlergia(idAlergia))
		},
		abrirFormularioCrearAlergia: () => {
			dispatch(abrirFormularioCrearAlergia())
		},
		abrirFormularioEditarAlergia: (idAlergia) => {
			dispatch(abrirFormularioEditarAlergia(idAlergia))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)