import { connect } from 'react-redux'

import Menu from './Menu'

import {
	salirUsuario
} from '../../../usuario/actions'


function mapStateToProps(state) {
	return {
		usuarioEstado: state.usuario.usuarioEstado
	}
}

function mapDispatchToProps(dispatch) {
	return {
		salirUsuario: () => {
			dispatch(salirUsuario())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)