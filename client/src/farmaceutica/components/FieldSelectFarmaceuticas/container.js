import { connect } from 'react-redux'

import {
	abrirFormularioCrearFarmaceutica
} from '../../actions'

import FieldSelectFarmaceuticas from './FieldSelectFarmaceuticas'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearFarmaceutica: () => {
			dispatch(abrirFormularioCrearFarmaceutica())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectFarmaceuticas)