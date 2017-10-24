import { connect } from 'react-redux'

import {
	abrirFormularioCrearPreConsulta
} from '../../actions'

import FieldSelectPreConsultas from './FieldSelectPreConsultas'

function mapStateToProps(state) {
	return {
		mostrarCita: state.cita.mostrar
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