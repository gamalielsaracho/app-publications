import { connect } from 'react-redux'

import Menu from './Menu'

import {
	salirPersonal
} from '../../../usuario/actions'


function mapStateToProps(state) {
	return {
		usuarioEstado: state.personal.usuarioEstado
	}
}

function mapDispatchToProps(dispatch) {
	return {
		salirPersonal: () => {
			dispatch(salirPersonal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)