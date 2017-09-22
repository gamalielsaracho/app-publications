import { connect } from 'react-redux'

import {
	abrirFormularioCrearTipoExamen
} from '../../actions'

import FieldSelectTiposExamenes from './FieldSelectTiposExamenes'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearTipoExamen: () => {
			dispatch(abrirFormularioCrearTipoExamen())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectTiposExamenes)