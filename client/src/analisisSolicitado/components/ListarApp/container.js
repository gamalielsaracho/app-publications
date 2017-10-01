import { connect } from 'react-redux'

import ListarApp from './ListarApp'

// import {
// } from '../../..//actions'

function mapStateToProps(state, ownProps) {
	// console.log('ownProps ------------>')
	// console.log(ownProps)
	return {
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarApp)


