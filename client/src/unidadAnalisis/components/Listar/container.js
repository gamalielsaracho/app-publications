import { connect } from 'react-redux'

import {
	listarUnidadesAnalisis,
	eliminarUnidadAnalisis,
	mostrarUnidadAnalisis,

	abrirFormularioCrearUnidadAnalisis,
	abrirFormularioEditarUnidadAnalisis
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.unidadAnalisis.crear,
		listar: state.unidadAnalisis.listar,
		unidadesAnalisis: state.unidadAnalisis.listar.unidadesAnalisis
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarUnidadesAnalisis: () => {
			dispatch(listarUnidadesAnalisis())
		},
		eliminarUnidadAnalisis: (idUnidadAnalisis) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarUnidadAnalisis(idUnidadAnalisis))
		    }
		},
		mostrarUnidadAnalisis: (idUnidadAnalisis) => {
			dispatch(mostrarUnidadAnalisis(idUnidadAnalisis))
		},
		abrirFormularioCrearUnidadAnalisis: () => {
			dispatch(abrirFormularioCrearUnidadAnalisis())
		},
		abrirFormularioEditarUnidadAnalisis: (idUnidadAnalisis) => {
			dispatch(abrirFormularioEditarUnidadAnalisis(idUnidadAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)