import { connect } from 'react-redux'

import {
	abrirFormularioCrearCiudad
} from '../../actions'

import FieldSelectCiudades from './FieldSelectCiudades'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearCiudad: () => {
			dispatch(abrirFormularioCrearCiudad())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectCiudades)