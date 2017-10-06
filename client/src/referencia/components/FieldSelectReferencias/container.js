import { connect } from 'react-redux'

// import {
// 	abrirFormularioCrearTipoConsumo
// } from '../../actions'

import FieldSelectReferencias from './FieldSelectReferencias'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// abrirFormularioCrearTipoConsumo: () => {
		// 	dispatch(abrirFormularioCrearTipoConsumo())
		// }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectReferencias)