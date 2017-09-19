import { connect } from 'react-redux'

import {
	listarProveedores,
	eliminarProveedor,
	mostrarProveedor,

	abrirFormularioCrearProveedor,
	abrirFormularioEditarProveedor
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.proveedor.crear,
		listar: state.proveedor.listar,
		proveedores: state.proveedor.listar.proveedores
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarProveedores: () => {
			dispatch(listarProveedores())
		},
		eliminarProveedor: (idProveedor) => {
			var r = confirm("Está seguro que desea eliminar el rol?");
		    if (r == true) {
				dispatch(eliminarProveedor(idProveedor))
		    }
		},
		mostrarProveedor: (idProveedor) => {
			dispatch(mostrarProveedor(idProveedor))
		},
		abrirFormularioCrearProveedor: () => {
			dispatch(abrirFormularioCrearProveedor())
		},
		abrirFormularioEditarProveedor: (idProveedor) => {
			dispatch(abrirFormularioEditarProveedor(idProveedor))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)