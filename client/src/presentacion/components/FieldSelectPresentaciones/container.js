import { connect } from 'react-redux'

import {
	abrirFormularioCrearPresentacion
} from '../../actions'

import FieldSelectPresentaciones from './FieldSelectPresentaciones'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearPresentacion: () => {
			dispatch(abrirFormularioCrearPresentacion())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectPresentaciones)