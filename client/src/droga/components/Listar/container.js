import { connect } from 'react-redux'

import {
	listarDrogas,
	eliminarDroga,
	mostrarDroga,

	abrirFormularioCrearDroga,
	abrirFormularioEditarDroga
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.droga.eliminar,
		listar: state.droga.listar,
		drogas: state.droga.listar.drogas
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarDrogas: () => {
			dispatch(listarDrogas())
		},
		eliminarDroga: (idDroga) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarDroga(idDroga))
		    }
		},
		mostrarDroga: (idDroga) => {
			dispatch(mostrarDroga(idDroga))
		},
		abrirFormularioCrearDroga: () => {
			dispatch(abrirFormularioCrearDroga())
		},
		abrirFormularioEditarDroga: (idDroga) => {
			dispatch(abrirFormularioEditarDroga(idDroga))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)