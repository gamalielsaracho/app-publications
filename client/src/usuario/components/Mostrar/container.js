import { connect } from 'react-redux'

import {
	mostrarPersonal
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state, ownProps) {
	return {
		mostrar: state.personal.mostrar,

		// guardamos todos los parametros de la url.
		urls: ownProps.params
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarPersonal: (idPersonal) => {
			dispatch(mostrarPersonal(idPersonal))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


