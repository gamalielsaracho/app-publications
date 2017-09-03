import { connect } from 'react-redux'

import {
	abrirFormularioCrearNivel
} from '../../actions'

import FieldSelectNiveles from './FieldSelectNiveles'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearNivel: () => {
			dispatch(abrirFormularioCrearNivel())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectNiveles)