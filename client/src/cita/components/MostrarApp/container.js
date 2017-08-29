import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

function mapStateToProps(state, ownProps) {
	return {
		idCita: ownProps.params.idCita
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


