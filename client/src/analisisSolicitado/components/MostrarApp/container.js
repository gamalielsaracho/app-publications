import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	return {
		// idAnalisisSolicitado: ownProps.params.idAnalisisSolicitado,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


