import { connect } from 'react-redux'

import {
	abrirFormularioCrearDosis
} from '../../actions'

import FieldSelectDosis from './FieldSelectDosis'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearDosis: () => {
			dispatch(abrirFormularioCrearDosis())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectDosis)