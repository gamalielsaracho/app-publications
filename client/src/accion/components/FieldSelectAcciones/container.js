import { connect } from 'react-redux'

import {
	abrirFormularioCrearAccion
} from '../../actions'

import FieldSelectAcciones from './FieldSelectAcciones'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearAccion: () => {
			dispatch(abrirFormularioCrearAccion())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectAcciones)