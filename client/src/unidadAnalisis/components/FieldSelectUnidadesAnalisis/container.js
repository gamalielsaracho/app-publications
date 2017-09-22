import { connect } from 'react-redux'

import {
	abrirFormularioCrearUnidadAnalisis
} from '../../actions'

import FieldSelectUnidadesAnalisis from './FieldSelectUnidadesAnalisis'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearUnidadAnalisis: () => {
			dispatch(abrirFormularioCrearUnidadAnalisis())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectUnidadesAnalisis)