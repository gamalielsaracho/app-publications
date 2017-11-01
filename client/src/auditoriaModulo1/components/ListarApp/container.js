import { connect } from 'react-redux'

import ListarApp from './ListarApp'

// import {
// } from '../../..//actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		urls: ownProps.params,
		
		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarApp)


