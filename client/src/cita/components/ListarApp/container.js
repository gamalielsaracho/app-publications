import { connect } from 'react-redux'

import ListarApp from './ListarApp'

// import {
// } from '../../..//actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// Obtenemos todos los parametros de la url.
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarApp)


