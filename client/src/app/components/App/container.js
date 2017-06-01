import { connect } from 'react-redux'

import App from './App'

import {
	verificarTokenUsuario,
	salirUsuario
} from '../../../usuario/actions'


function mapStateToProps(state) {
	return {
		usuarioEstado: state.usuario.usuarioEstado
	}
}

function mapDispatchToProps(dispatch) {
	return {
		verificarTokenUsuario: (token) => {
			dispatch(verificarTokenUsuario(token))
		},
		salirUsuario: () => {
			dispatch(salirUsuario())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)