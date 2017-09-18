import { connect } from 'react-redux'

import {
	listarFarmaceuticas,
	eliminarFarmaceutica,
	mostrarFarmaceutica,

	abrirFormularioCrearFarmaceutica,
	abrirFormularioEditarFarmaceutica
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.farmaceutica.crear,
		listar: state.farmaceutica.listar,
		farmaceuticas: state.farmaceutica.listar.farmaceuticas
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarFarmaceuticas: () => {
			dispatch(listarFarmaceuticas())
		},
		eliminarFarmaceutica: (idFarmaceutica) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarFarmaceutica(idFarmaceutica))
		    }
		},
		mostrarFarmaceutica: (idFarmaceutica) => {
			dispatch(mostrarFarmaceutica(idFarmaceutica))
		},
		abrirFormularioCrearFarmaceutica: () => {
			dispatch(abrirFormularioCrearFarmaceutica())
		},
		abrirFormularioEditarFarmaceutica: (idFarmaceutica) => {
			dispatch(abrirFormularioEditarFarmaceutica(idFarmaceutica))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)