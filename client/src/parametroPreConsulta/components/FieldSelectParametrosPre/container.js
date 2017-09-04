import { connect } from 'react-redux'

import {
	abrirFormularioCrearParametroPreConsulta
} from '../../actions'

import FieldSelectParametrosPre from './FieldSelectParametrosPre'

function mapStateToProps(state) {
	return {
		// Esto es la lista de parametros con sus valores que 
		// se obtiene de la taba intermedia de preconsultas y
		// parametrosPreconsulta.
		listarPreConsultaParametros: state.preConsultaParametro.listar
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