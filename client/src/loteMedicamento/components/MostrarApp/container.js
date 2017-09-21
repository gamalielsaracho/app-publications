import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		idLoteMedicamento: ownProps.params.idLoteMedicamento,
		
		// // Para hacer render del formulario solamente cuando esté abierto.
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


