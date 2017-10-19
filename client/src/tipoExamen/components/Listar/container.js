import { connect } from 'react-redux'

import {
	listarTiposExamenes,
	eliminarTipoExamen,
	mostrarTipoExamen,

	abrirFormularioCrearTipoExamen,
	abrirFormularioEditarTipoExamen
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.tipoExamen.eliminar,
		listar: state.tipoExamen.listar,
		tiposExamenes: state.tipoExamen.listar.tiposExamenes
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarTiposExamenes: () => {
			dispatch(listarTiposExamenes())
		},
		eliminarTipoExamen: (idTipoExamen) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarTipoExamen(idTipoExamen))
		    }
		},
		mostrarTipoExamen: (idTipoExamen) => {
			dispatch(mostrarTipoExamen(idTipoExamen))
		},
		abrirFormularioCrearTipoExamen: () => {
			dispatch(abrirFormularioCrearTipoExamen())
		},
		abrirFormularioEditarTipoExamen: (idTipoExamen) => {
			dispatch(abrirFormularioEditarTipoExamen(idTipoExamen))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)