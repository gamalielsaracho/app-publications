import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

function mapStateToProps(state, ownProps) {
	return {
		idPaciente: ownProps.params.idPaciente
		
		// nroDocumento: ownProps.params.nroDocumento,
		// idTipoDocumento: ownProps.params.idTipoDocumento
	}
}


function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


