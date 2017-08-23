import { connect } from 'react-redux'

import {
	listarDepartamentos,
	eliminarDepartamento,
	mostrarDepartamento,

	abrirFormularioCrearDepartamento,
	abrirFormularioEditarDepartamento
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.departamento.crear,
		listar: state.departamento.listar,
		departamentos: state.departamento.listar.departamentos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarDepartamentos: () => {
			dispatch(listarDepartamentos())
		},
		eliminarDepartamento: (idDepartamento) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarDepartamento(idDepartamento))
		    }
		},
		mostrarDepartamento: (idDepartamento) => {
			dispatch(mostrarDepartamento(idDepartamento))
		},
		abrirFormularioCrearDepartamento: () => {
			dispatch(abrirFormularioCrearDepartamento())
		},
		abrirFormularioEditarDepartamento: (idDepartamento) => {
			dispatch(abrirFormularioEditarDepartamento(idDepartamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)