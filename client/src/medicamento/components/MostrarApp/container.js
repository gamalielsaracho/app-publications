import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		idMedicamento: ownProps.params.idMedicamento,
		
		// Para hacer render del formulario solamente cuando esté abierto.
		formulario: state.medicamento.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


