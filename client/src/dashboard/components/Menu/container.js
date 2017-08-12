import { connect } from 'react-redux'

import Menu from './Menu'

function mapStateToProps(state) {
	return {
		usuarioEstado: state.personal.usuarioEstado
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)




