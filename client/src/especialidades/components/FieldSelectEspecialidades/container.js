import { connect } from 'react-redux'

import {
	abrirFormularioCrearEspecialidad
} from '../../actions'

import FieldSelectEspecialidades from './FieldSelectEspecialidades'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearEspecialidad: () => {
			dispatch(abrirFormularioCrearEspecialidad())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectEspecialidades)