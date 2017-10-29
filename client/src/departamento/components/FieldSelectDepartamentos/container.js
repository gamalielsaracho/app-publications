import { connect } from 'react-redux'

import {
	abrirFormularioCrearDepartamento
} from '../../actions'

import FieldSelectDepartamentos from './FieldSelectDepartamentos'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearDepartamento: () => {
			dispatch(abrirFormularioCrearDepartamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectDepartamentos)