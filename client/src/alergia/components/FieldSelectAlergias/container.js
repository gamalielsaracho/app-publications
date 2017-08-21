import { connect } from 'react-redux'

import {
	listarAlergias,
	abrirFormularioCrearAlergia
} from '../../actions'

import FieldSelectAlergias from './FieldSelectAlergias'

function mapStateToProps(state) {
	return {

	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearAlergia: () => {
			dispatch(abrirFormularioCrearAlergia())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectAlergias)