import { connect } from 'react-redux'

import {
	abrirFormularioCrearDiagnostico
} from '../../actions'

import FieldSelectDiagnosticos from './FieldSelectDiagnosticos'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearDiagnostico: () => {
			dispatch(abrirFormularioCrearDiagnostico())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectDiagnosticos)