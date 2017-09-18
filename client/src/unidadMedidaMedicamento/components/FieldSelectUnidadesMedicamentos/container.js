import { connect } from 'react-redux'

import {
	abrirFormularioCrearUnidadMedicamento
} from '../../actions'

import FieldSelectUnidadesMedicamentos from './FieldSelectUnidadesMedicamentos'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearUnidadMedicamento: () => {
			dispatch(abrirFormularioCrearUnidadMedicamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectUnidadesMedicamentos)