import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		idTipoAnalisis: ownProps.params.idTipoAnalisis,

		// guardamos todos los parametros de la url en el objeto urls.
		urlsParams: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


