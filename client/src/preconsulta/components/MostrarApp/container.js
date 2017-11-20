import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// Obtenemos todos los parametros de la url.
		urls: ownProps.params,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


