import { connect } from 'react-redux'

import {
	abrirFormularioCrearNombreMedicamento
} from '../../actions'

import FieldSelectNombresMedicamentos from './FieldSelectNombresMedicamentos'

function mapStateToProps(state) {
	return {
		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearNombreMedicamento: () => {
			dispatch(abrirFormularioCrearNombreMedicamento())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectNombresMedicamentos)