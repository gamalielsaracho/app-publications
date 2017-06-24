import { connect } from 'react-redux'

import {
	listarRoles
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.rol.crear,
		listar: state.rol.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarRoles: () => {
			dispatch(listarRoles())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)