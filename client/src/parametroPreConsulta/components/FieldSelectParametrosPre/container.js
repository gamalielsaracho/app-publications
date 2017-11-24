import { connect } from 'react-redux'

import {
	abrirFormularioCrearParametroPreConsulta
} from '../../actions'

import FieldSelectParametrosPre from './FieldSelectParametrosPre'

function mapStateToProps(state) {
	return {

		// Obtenemos el estado del formulario de parametros de preconsulta.
		formulario: state.parametroPreConsulta.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearParametroPreConsulta: () => {
			dispatch(abrirFormularioCrearParametroPreConsulta())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectParametrosPre)