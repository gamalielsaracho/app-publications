import { connect } from 'react-redux'

import {
	abrirFormularioCrearMedicamento
} from '../../actions'

import FieldSelectMedicamentos from './FieldSelectMedicamentos'

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearMedicamento: () => {
			dispatch(abrirFormularioCrearMedicamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectMedicamentos)