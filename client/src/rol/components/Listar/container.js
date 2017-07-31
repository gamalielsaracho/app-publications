import { connect } from 'react-redux'

import {
	listarRoles,
	eliminarRole,
	mostrarRol,

	abrirFormularioCrearRol,
	abrirFormularioEditarRol
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.rol.crear,
		listar: state.rol.listar,
		roles: state.rol.listar.roles
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarRoles: () => {
			dispatch(listarRoles())
		},
		eliminarRole: (idRol) => {
			dispatch(eliminarRole(idRol))
		},
		mostrarRol: (idRol) => {
			dispatch(mostrarRol(idRol))
		},
		abrirFormularioCrearRol: () => {
			dispatch(abrirFormularioCrearRol())
		},
		abrirFormularioEditarRol: (idRol) => {
			dispatch(abrirFormularioEditarRol(idRol))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)