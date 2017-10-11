import { connect } from 'react-redux'

import {
	abrirFormularioCrearSintoma
} from '../../actions'

import FieldSelectSintomas from './FieldSelectSintomas'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearSintoma: () => {
			dispatch(abrirFormularioCrearSintoma())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectSintomas)