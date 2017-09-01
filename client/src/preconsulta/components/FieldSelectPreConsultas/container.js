import { connect } from 'react-redux'

import {
	abrirFormularioCrearPreConsulta
} from '../../actions'

import FieldSelectPreConsultas from './FieldSelectPreConsultas'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearPreConsulta: () => {
			dispatch(abrirFormularioCrearPreConsulta())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectPreConsultas)