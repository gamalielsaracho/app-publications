import { connect } from 'react-redux'

import {
	abrirFormularioCrearUnidadParametroPre
} from '../../actions'

import FieldSelectUnidadesParametroPre from './FieldSelectUnidadesParametroPre'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearUnidadParametroPre: () => {
			dispatch(abrirFormularioCrearUnidadParametroPre())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectUnidadesParametroPre)