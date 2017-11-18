import { connect } from 'react-redux'

import {
	abrirFormularioCrearArea
} from '../../actions'

import FieldSelectAreas from './FieldSelectAreas'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearArea: () => {
			dispatch(abrirFormularioCrearArea())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectAreas)