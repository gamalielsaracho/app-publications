import { connect } from 'react-redux'

import {
	abrirFormularioCrearDroga
} from '../../actions'

import FieldSelectDrogas from './FieldSelectDrogas'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearDroga: () => {
			dispatch(abrirFormularioCrearDroga())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectDrogas)