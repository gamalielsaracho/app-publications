import { connect } from 'react-redux'

import MostrarApp from './MostrarApp'

// import {
// } from '../../../consulta/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params,
		
		// Para hacer render del formulario solamente cuando esté abierto.
		formulario: state.medicamento.formulario,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname
	}
}

function mapDispatchToProps(dispatch) {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarApp)


