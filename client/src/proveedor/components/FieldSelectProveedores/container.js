import { connect } from 'react-redux'

import {
	abrirFormularioCrearProveedor
} from '../../actions'

import FieldSelectProveedores from './FieldSelectProveedores'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearProveedor: () => {
			dispatch(abrirFormularioCrearProveedor())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectProveedores)