import { connect } from 'react-redux'

import MostrarRellenandoApp from './MostrarRellenandoApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// para pasarle a MostrarRellenando al ser llamado.
		idConsulta: ownProps.params.idConsulta,

		// guardamos todos los parametros de la url en el objeto urls.
		urlsParams: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarRellenandoApp)


